/* eslint-disable @typescript-eslint/no-explicit-any */
import { BiLoaderAlt } from "react-icons/bi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { showErrorsMessage, showSuccessMessage } from "@/utils/sweetAlert";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getQuestion } from "@/api/question";
import { useNavigate, useParams } from "react-router-dom";
import { postValidation } from "@/api/validation";
import { NavigationLayout } from "@/components/layout/navigationLayout";

export const ClaimForm = () => {
  const [questions, setQuestions] = useState<Array<string>>([]);
  const [answer, SetAnswer] = useState<Array<string>>([]);
  const [submit, setSubmit] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSubmit(false);
    const getQuestionApi = async () => {
      try {
        const response = (await getQuestion(postId)).data;
        setQuestions(response.data.questions);
      } catch (e) {
        console.log(e);
      }
    };
    getQuestionApi();
  }, [postId]);

  const handleAnswerChange = (
    event: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newAnswer = [...answer];
    newAnswer[index] = event.target.value;
    SetAnswer(newAnswer);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmit(true);

    const data = {
      answer: answer,
      postId,
    };

    try {
      await postValidation(data);
      setSubmit(false);
      showSuccessMessage("Berhasil menambahkan register");
    } catch (error: any) {
      setSubmit(false);
      showErrorsMessage(error.response.data.message);
    }
    navigate("/dashboard");
  };

  return (
    <NavigationLayout>
      <div className="text-center mb-5 mt-10">
        <h2 className="text-lg font-bold">
          Informasi Pertanyaan Barang Ditemukan
        </h2>
        <p className="text-sm font-medium text-muted-foreground">
          Isi pertanyaan deskriptif mengenai barang yang ditemukan agar dapat
          divalidasi oleh penemu.
        </p>
      </div>
      <div className="flex gap-5 w-[55%] border border-border/40 justify-center items-center shadow-custom mx-auto px-10 py-8 mb-28">
        <form onSubmit={onSubmit} className="w-[95%]">
          {questions?.map((question, index) => (
            <div key={index} className="flex flex-col gap-2 mb-4">
              <Label htmlFor={`message${index}`} className="text-sm">
                {question}?
              </Label>
              <Textarea
                id={`message${index}`}
                className="border-border border shadow-custom rounded-md py-2 px-3 h-20 w-full text-sm"
                placeholder={"Masukan jawaban anda"}
                onChange={(e) => handleAnswerChange(e, index)}
              />
            </div>
          ))}
          <Button
            disabled={submit}
            type="submit"
            className="flex mx-auto mt-9 px-8"
          >
            {!submit ? (
              "Submit"
            ) : (
              <div className="flex items-center align-middle">
                <div className="animate-spin text-xl mr-2">
                  <BiLoaderAlt />
                </div>
                processing...
              </div>
            )}
          </Button>
        </form>
      </div>
    </NavigationLayout>
  );
};
