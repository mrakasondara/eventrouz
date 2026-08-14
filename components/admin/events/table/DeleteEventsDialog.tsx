import { useTransition } from "react";
import { toast } from "sonner";
import { ActionResponse, deleteEventState } from "@/app/actions/actions";
import { successStyle, errorStyle } from "@/lib/toaster-styles";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const DeleteEventsDialog = ({
  id,
  open,
  setOpen,
}: {
  id: number | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [pending, startTransition] = useTransition();

  const handlerDelete = () => {
    const stringId = id?.toString();
    startTransition(async () => {
      const response = await deleteEventState(initialState, stringId);
      if (response.success) {
        toast.success(response.message, { style: successStyle });
        setOpen(false);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="group/dropdown-menu-item relative flex items-center gap-2.5 rounded-none px-3 py-2 text-xs font-medium tracking-wider uppercase outline-hidden select-none hover:bg-gray w-full cursor-pointer">
        Hapus
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Proses ini tidak bisa dibatalkan. Proses ini akan menghapus data
            dari sistem.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlerDelete} className="bg-red-500 ">
            {pending && <Spinner />}Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
