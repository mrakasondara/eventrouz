"use client";
import { useState } from "react";
import { getAccessToken } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from "@/components/ui/select";
import { EventsAPI } from "@/lib/services/api/events-api";
import { toast } from "sonner";
import { errorStyle, successStyle } from "@/lib/toaster-styles";
import { Spinner } from "../ui/spinner";

interface PersonalEditProps {
  data: UserProfile;
  fetchProfile: () => Promise<void>;
}

interface UserProfile {
  gender?: string;
  address?: string;
  phone_number?: string;
}

export const PersonalEditDialog = ({
  data,
  fetchProfile,
}: PersonalEditProps) => {
  const [address, setAddress] = useState(data?.address ?? "");
  const [phoneNumber, setPhoneNumber] = useState(data?.phone_number ?? "");
  const [gender, setGender] = useState(data?.gender ?? "");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleGenderChange = (value: string | null) => {
    setGender(value || "");
  };

  const handleOpen = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const editPersonalInformation = async (
    e: React.SubmitEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const genderValue = gender == "Perempuan" ? "female" : "male";

    const data = { address, phone_number: phoneNumber, gender: genderValue };
    const token = await getAccessToken();
    try {
      setLoading(true);
      const response = await EventsAPI.editPersonalInformation({
        token: token ?? "",
        data,
      });
      if (response.success) {
        toast.success(response.message, { style: successStyle });
        await fetchProfile();
        setOpen(false);
      } else {
        toast.error(response.message, { style: errorStyle });
      }
    } catch (error) {
      toast.error("something error", { style: errorStyle });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger
        render={
          <Button
            variant="brutalism"
            size="md"
            className="font-bold bg-red-600 text-white border-black"
          />
        }
      >
        Ubah
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px] shadow-[8px_8px_0px_0px_#323232] hover:shadow-[4px_4px_0px_0px_#323232] transition-all ease-in-out border-2 font-grotesk">
        <DialogHeader className="w-full p-1">
          <DialogTitle>Ubah informasi personal</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-3"
          onSubmit={editPersonalInformation}
        >
          <div className="grid flex-1 gap-1">
            <label htmlFor="alamat">Alamat</label>
            <Input
              className="border-2 focus:border-black focus-visible:border-b-black border-black bg-white p-2 shadow-[3px_3px_0px_0px_#323232]"
              id="alamat"
              placeholder="Isi alamat anda"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="grid flex-1 gap-1">
            <label htmlFor="phone-number">Nomor Handphone</label>
            <InputGroup>
              <InputGroupInput
                placeholder="8xxxxxx"
                type="number"
                value={phoneNumber}
                minLength={9}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <InputGroupAddon>+62</InputGroupAddon>
            </InputGroup>
          </div>
          <div className="grid flex-1 gap-1">
            <label htmlFor="gender">Jenis Kelamin</label>
            <Select
              onValueChange={handleGenderChange}
              name="gender"
              id="gender"
              required
              defaultValue={gender == "female" ? "Perempuan" : "Laki-Laki"}
            >
              <SelectTrigger className="w-full px-2">
                <SelectValue placeholder="Jenis Kelamin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Laki-Laki">Laki - Laki</SelectItem>
                  <SelectItem value="Perempuan">Perempuan</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="brutalism"
            size="md"
            className="self-end mt-2 font-bold bg-red-600 text-white border-black"
            type="submit"
          >
            {loading && <Spinner />}
            Ubah
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
