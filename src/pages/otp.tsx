/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { verifyOtp } from "@/api/otps";
import { showErrorsMessage, showSuccessMessage } from "@/utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import laptop from "../assets/Laptop.png";
import { BiLoaderAlt } from "react-icons/bi";
import { useState } from "react";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const Otp = () => {
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmit(true);
    try {
      await verifyOtp(data.otp);
      showSuccessMessage("OTP verified successfully");
      setInterval(() => navigate("/login"), 3000);
    } catch (error: any) {
      showErrorsMessage(error.response.data.message);
    }
    setSubmit(false);
  }

  return (
    <div className="min-h-screen flex flex-row justify-center items-center gap-14">
      <img src={laptop} alt="laptop" className="w-96 hidden md:flex" />
      <div className="flex shadow-custom border-border/40 border rounded-md p-8 w-[26rem]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <h3 className="text-3xl font-semibold mb-4">OTP</h3>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
          </form>
        </Form>
      </div>
    </div>
  );
};
