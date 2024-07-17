/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showErrorsMessage } from "@/utils/sweetAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import laptop from "../assets/Laptop.png";
import { BiLoaderAlt } from "react-icons/bi";
import { postOtp } from "@/api/otps";
import { OtpForgetPassword } from "./OtpForgetPassword";

const formSchema = z.object({
  phone: z.string().min(10, {
    message: "Name must be at least 10 characters.",
  }),
});

export const ForgotPassword = () => {
  const [submit, setSubmit] = useState(false);
  const [otp, setOtp] = useState(false);

  useEffect(() => {
    document.title = "Lupa password - Lost and Found";
    window.scrollTo(0, 0);
    setSubmit(false);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmit(true);
    try {
      await postOtp(values.phone);
      setOtp(true);
    } catch (error: any) {
      showErrorsMessage(error.response.data.message);
    }
    setSubmit(false);
  }

  return (
    <div className="min-h-screen flex flex-row justify-center items-center gap-14">
      <img src={laptop} alt="laptop" className="w-96 hidden md:flex" />
      {!otp ? (
        <div className="flex shadow-custom border-border/40 border rounded-md p-8 w-[26rem]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 w-full"
            >
              <h3 className="text-3xl font-semibold mb-4">Lupa Password</h3>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor telepon terdaftar</FormLabel>
                    <FormControl>
                      <Input placeholder="08xxxxxxxx" {...field} />
                    </FormControl>
                    <FormDescription>
                      Maukan Nomor telepon terdaftar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-3">
                <Button disabled={submit} type="submit">
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
              </div>
            </form>
          </Form>
        </div>
      ) : (
        otp && <OtpForgetPassword phone={form.getValues("phone")} />
      )}
    </div>
  );
};
