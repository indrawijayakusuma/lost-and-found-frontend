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
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { BiLoaderAlt } from "react-icons/bi";
import { updatePassword } from "@/api/users";

const formSchema = z.object({
  oldPassword: z.string().min(3, {
    message: "Rekening must be at least 3 characters.",
  }),
  newPassword: z.string().min(3, {
    message: "Rekening must be at least 3 characters.",
  }),
  validationPassword: z.string().min(3, {
    message: "Rekening must be at least 3 characters.",
  }),
});

export const ChangePasswordForm = () => {
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Password Baru - Lost and Found";
    window.scrollTo(0, 0);
    // setSubmite(false);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      validationPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmit(true);
    if (values.newPassword !== values.validationPassword) {
      showErrorsMessage("Password tidak sama", true).then((result) => {
        if (result.isConfirmed) {
          navigate("/change-password");
        }
      });
      setSubmit(false);
      return;
    }
    const { oldPassword, newPassword } = values;
    try {
      await updatePassword({ oldPassword, newPassword });
      showSuccessMessage("Password changed successfully");
      form.reset();
    } catch (error) {
      console.log(error);
      showErrorsMessage("Something went wrong, please try again later");
    }
    setSubmit(false);
  }

  return (
    <div className="flex flex-row gap-14">
      <div className="flex shadow-custom border-border/40 border rounded-md p-8 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full"
          >
            <h3 className="text-3xl font-semibold mb-4">Password</h3>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata sandi lama</FormLabel>
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kata sandi</FormLabel>
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
              name="validationPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ulangi kata sandi</FormLabel>
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
