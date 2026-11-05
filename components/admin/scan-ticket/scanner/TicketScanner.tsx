"use client";
import React, { useState } from "react";
import { Camera as CameraIcon, CameraOff, SwitchCamera } from "lucide-react";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { errorStyle } from "@/lib/toaster-styles";
import { Result } from "../result-scanner/Result";
import { getAccessToken } from "@/app/actions/auth";
import { Spinner } from "@/components/ui/spinner";
import { EventsAPI } from "@/lib/services/api/events-api";
import { checkinResult } from "../ScanTicketContent";

const QrScanner = dynamic(
  () => import("@yudiel/react-qr-scanner").then((mod) => mod.Scanner),
  {
    ssr: false,
    loading: () => (
      <div className="p-8 text-center font-bold">Memuat Kamera...</div>
    ),
  }
);

interface TicketScannerProps {
  isCameraActive: boolean;
  setIsCameraActive: React.Dispatch<React.SetStateAction<boolean>>;
  isResultShow: boolean;
  setIsResultShow: React.Dispatch<React.SetStateAction<boolean>>;
  result: checkinResult;
  setResult: React.Dispatch<React.SetStateAction<checkinResult>>;
}

export const TicketScanner = ({
  isCameraActive,
  setIsCameraActive,
  isResultShow,
  setIsResultShow,
  result,
  setResult,
}: TicketScannerProps) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<string | null>();
  const [facingMode, setFacingMode] = useState<"environment" | "user">(
    "environment"
  );

  const handleScan = async (text: any) => {
    if (!isVerifying) {
      setScanResult(text[0]?.rawValue);
      await checkInTicket();
    }
  };

  const handleError = (error: any) => {
    if (error?.kind === "permission-denied") {
      toast.error("Izin kamera ditolak!", { style: errorStyle });
    } else {
      toast.error(error?.message, { style: errorStyle });
    }
  };

  const handleToggleCamera = (cameraStatus: boolean) => {
    setIsCameraActive(cameraStatus);
    setIsResultShow(false);
  };

  const handleToggleFacingMode = () => {
    setFacingMode((prevMode) =>
      prevMode === "environment" ? "user" : "environment"
    );
  };

  const checkInTicket = async () => {
    const token = (await getAccessToken()) ?? "";
    const ticketCode = scanResult ?? "";

    setLoading(true);
    setIsVerifying(true);
    try {
      const response = await EventsAPI.checkinTicket({ token, ticketCode });
      setIsResultShow(true);
      setResult({
        success: response?.success,
        data: response?.data,
        message: response?.message,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsCameraActive(false);
      setIsVerifying(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 border-4 -translate-y-1 shadow-[6px_6px_0px_0px_#323232] bg-white flex flex-col gap-2 py-3 px-4 md:rotate-1 self-start min-h-30">
      <div className="flex gap-2 items-center mt-1 mb-3">
        <h2 className="text-xl flex gap-2 items-center uppercase font-extrabold font-jakarta">
          scan ticket {loading && <Spinner className="size-6!" />}
        </h2>

        <div className="flex ml-auto gap-2">
          {isCameraActive && (
            <Button
              size="icon-md"
              className="bg-blue"
              variant="brutalism"
              onClick={handleToggleFacingMode}
            >
              <SwitchCamera strokeWidth={2.5} />
            </Button>
          )}

          <Button
            size="icon-md"
            className="bg-blue"
            variant="brutalism"
            onClick={() =>
              isCameraActive
                ? handleToggleCamera(false)
                : handleToggleCamera(true)
            }
          >
            {isCameraActive ? (
              <CameraOff strokeWidth={2.5} />
            ) : (
              <CameraIcon strokeWidth={2.5} />
            )}
          </Button>
        </div>
      </div>

      {isCameraActive ? (
        <QrScanner
          onScan={(text) => handleScan(text)}
          onError={(error) => handleError(error)}
          constraints={{
            facingMode: facingMode,
          }}
        />
      ) : (
        <div
          className={`p-8 text-center font-bold ${
            isResultShow ? "hidden" : "block"
          }`}
        >
          Klik tombol diatas untuk mengaktifkan kamera
        </div>
      )}

      {isResultShow ? <Result response={result} /> : ""}
    </div>
  );
};
