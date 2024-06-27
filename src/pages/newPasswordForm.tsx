/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showErrorsMessage, showSuccessMessage } from "@/utils/sweetAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import laptop from "../assets/Laptop.png";
import { BiLoaderAlt } from "react-icons/bi";
import { updateForgetPassword } from "@/api/users";

const formSchema = z.object({
  password: z.string().min(3, {
    message: "Rekening must be at least 3 characters.",
  }),
  passwordValidation: z.string().min(3, {
    message: "Rekening must be at least 3 characters.",
  }),
});

export const NewPasswordForm = () => {
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phone = searchParams.get("phone");
  const otp = searchParams.get("otp");

  useEffect(() => {
    document.title = "Password Baru - Lost and Found";
    window.scrollTo(0, 0);
    setSubmit(false);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordValidation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmit(true);
    try {
      await updateForgetPassword({
        password: values.password,
        phone,
        otp,
      });
      showSuccessMessage("Password changed successfully");
      navigate("/login");
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
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full"
          >
            <h3 className="text-3xl font-semibold mb-4">Password</h3>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata Sandi</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      autoComplete="on"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordValidation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ulangi Kata Sandi</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      autoComplete="on"
                      {...field}
                    />
                  </FormControl>
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
    </div>
  );
};
