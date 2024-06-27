/* eslint-disable @typescript-eslint/no-explicit-any */
import { createUser } from "@/api/users";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import laptop from "../assets/Laptop.png";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const formSchema = z.object({
  phone: z.string().min(10, {
    message: "Name must be at least 10 characters.",
  }),
  email: z
    .string()
    .min(3, {
      message: "email must be at least 3 characters.",
    })
    .email("This is not a valid email."),
  fullname: z.string().min(3, {
    message: "fullname must be at least 3 characters.",
  }),
  username: z.string().min(3, {
    message: "username must be at least 3 characters.",
  }),
  password: z.string().min(3, {
    message: "Rekening must be at least 3 characters.",
  }),
  passwordValidation: z.string().min(3, {
    message: "Rekening must be at least 3 characters.",
  }),
});

export const Register = () => {
  // const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
    window.scrollTo(0, 0);
    // setSubmite(false);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      email: "",
      fullname: "",
      username: "",
      password: "",
      passwordValidation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // setSubmit(true);
    const data = {
      phone: values.phone,
      email: values.email,
      fullname: values.fullname,
      username: values.username,
      password: values.password,
    };
    if (values.password === values.passwordValidation) {
      try {
        await createUser(data);
        navigate("/otp");
      } catch (error: any) {
        showErrorsMessage(error.response.data.message);
      }
    } else {
      showErrorsMessage("Password tidak sama");
    }
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
            <h3 className="text-3xl font-semibold mb-4 flex flex-row items-center">
              <Link to="/login">
                <MdOutlineKeyboardArrowLeft className="h-10 w-10" />
              </Link>
              Daftar
            </h3>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Telepon</FormLabel>
                  <FormControl>
                    <Input placeholder="08xxxxxxxxx" {...field} />
                  </FormControl>
                  <FormDescription>
                    Maukan nomer telpon diawali "08"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="nama@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: ali" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              <Button type="submit" className="flex mx-auto px-9">
                Buat Akun
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
