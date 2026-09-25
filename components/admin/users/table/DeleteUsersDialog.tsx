import { useTransition } from "react";
import { UserRoundX } from "lucide-react";
import { toast } from "sonner";
import { ActionResponse, deleteTicketState } from "@/app/actions/actions";
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
import { errorStyle, successStyle } from "@/lib/toaster-styles";
import { Spinner } from "@/components/ui/spinner";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export const DeleteUsersDialog = ({
  userId,
}: {
  userId: number | undefined;
}) => {
  const [pending, startTransition] = useTransition();

  const handlerDelete = () => {
    const stringUserId = userId?.toString();

    // startTransition(async () => {
    //   const response = await deleteTicketState(
    //     initialState,
    //     stringEventId,
    //     stringTicketId
    //   );
    //   if (response.success) {
    //     toast.success(response.message, { style: successStyle });
    //     setOpen(false);
    //   } else {
    //     toast.error(response.message, { style: errorStyle });
    //   }
    // });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="cursor-pointer">
        <UserRoundX size={15} color="red" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Proses ini tidak bisa dibatalkan. Proses ini akan menghapus data
            pengguna dari sistem.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handlerDelete} className="bg-red-500">
            {pending && <Spinner />}Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
