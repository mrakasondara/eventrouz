import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContentComponent } from "./TabsContentComponent";

export const TicketsContent = ({ response }: { response: any }) => {
  const data = response?.data;
  return (
    <div className="flex flex-col w-full lg:w-3/4 mx-auto py-10 font-grotesk">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Tiket Saya</h1>
        <p className="text-lg">
          Kelola semua tiket acara mendatang dan riwayat acara yang telah Anda
          hadiri.
        </p>
      </div>

      <div className="mt-5">
        <Tabs defaultValue="mendatang">
          <TabsList variant="line" className="font-sans">
            <TabsTrigger value="mendatang" className="cursor-pointer">
              Akan datang
            </TabsTrigger>
            <TabsTrigger value="selesai" className="cursor-pointer">
              Selesai
            </TabsTrigger>
          </TabsList>

          <TabsContentComponent tickets={data} />
        </Tabs>
      </div>
    </div>
  );
};
