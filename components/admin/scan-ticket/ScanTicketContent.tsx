"use client";
import { useState } from "react";
import { ManualEntry } from "./ManualEntry";
import { TicketScanner } from "./scanner/TicketScanner";

export interface checkinResult {
  success?: boolean;
  data?: checkinData;
  message?: string;
}

interface checkinData {
  id?: number;
  quantity?: number;
  ticket_code?: string;
  ticket_category?: string;
  user_name?: string;
  user_email?: string;
  event_statistic?: {
    total_checkedin?: number;
    remaining?: number;
  };
}

export const ScanTicketContent = () => {
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isResultShow, setIsResultShow] = useState<boolean>(false);
  const [result, setResult] = useState<checkinResult>({});

  const manualEntryProps = {
    setIsCameraActive,
    setIsResultShow,
    setResult,
    result,
  };

  const ticketScannerProps = {
    isCameraActive,
    isResultShow,
    ...manualEntryProps,
  };

  return (
    <div className="flex flex-col justify-center md:flex-row w-full lg:w-3/4 mx-auto pb-10 min-h-screen mt-20 gap-5">
      <TicketScanner {...ticketScannerProps} />
      <ManualEntry {...manualEntryProps} />
    </div>
  );
};
