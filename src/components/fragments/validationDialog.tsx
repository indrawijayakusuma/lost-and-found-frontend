import {
  getValidationQuestionAnswer,
  postAccValidation,
  postRejValidation,
} from "@/api/validation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { showSuccessMessage } from "@/utils/sweetAlert";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  validationId: string;
  setLoading: (loading: boolean) => void;
}

interface ObjValid {
  question: string;
  answer: string;
}

interface Ivalidation {
  answerQuestion: Array<ObjValid>;
  validation_id: string;
}

export const ValidationDialog: React.FC<Props> = ({
  children,
  validationId,
  setLoading,
}) => {
  const [validation, setValidation] = useState<Ivalidation | null>(null);
  useEffect(() => {
    const getvalidation = async () => {
      try {
        const response = (await getValidationQuestionAnswer(validationId)).data;
        setValidation(response.data);
      } catch {
        console.log("can`t fatch");
      }
    };
    getvalidation();
  }, [validationId]);

  const validateHandler = async (status: string, id: string | undefined) => {
    try {
      if (status === "Ditolak") {
        await postRejValidation(id);
        showSuccessMessage("Validasi berhasil Ditolak");
      } else {
        await postAccValidation(id);
        showSuccessMessage("Validasi berhasil Divalidasi");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{children}</Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] min-w-[60%] justify-center items-center gap-4 px-24 grid grid-cols-1">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-center">
            Informasi Pertanyaan Barang Ditemukan
          </DialogTitle>
          <DialogDescription className="text-center">
            Isi pertanyaan deskriptif mengenai barang yang ditemukan agar dapat
            divalidasi oleh penemu
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-80 w-full px-3">
          {validation?.answerQuestion?.map((valid, index) => (
            <div key={index} className="grid w-full gap-3 mt-5">
              <Label htmlFor="message" className="text-sm font-semibold">
                {valid.question}?
              </Label>
              <textarea
                id="message"
                className="border-border border shadow-custom rounded-lg  py-2 px-3 h-20 w-full text-sm"
                value={valid.answer}
                disabled
              />
            </div>
          ))}
        </ScrollArea>
        <DialogFooter>
          <div className="flex-row gap-4 flex items-center justify-center">
            <DialogClose asChild>
              <Button
                onClick={() =>
                  validateHandler("Ditolak", validation?.validation_id)
                }
                variant={"outline"}
                className="w-28"
              >
                Tolak
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                onClick={() =>
                  validateHandler("Tervalidasi", validation?.validation_id)
                }
                className="w-28"
              >
                Terima
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
