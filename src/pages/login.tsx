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
import { useAuth } from "@/hooks/useAuth";
import { showErrorsMessage } from "@/utils/sweetAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import laptop from "../assets/Laptop.png";
import { BiLoaderAlt } from "react-icons/bi";

const formSchema = z.object({
  phone: z.string().min(10, {
    message: "Name must be at least 10 characters.",
  }),
  password: z.string().min(3, {
    message: "Rekening must be at least 3 characters.",
  }),
});

const Login = () => {
  const [submit, setSubmit] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setSubmit(false);
    document.title = "Login";
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmit(true);
    const auth = await login(values);
    if (!auth) {
      console.log(auth);
      showErrorsMessage(
        "Nomor telfon atau password yang anda masukan salah",
        true
      ).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      navigate("/");
    }
    setSubmit(false);
  }

  return (
    <div className="my-36 flex flex-row justify-center items-center gap-14">
      <img src={laptop} alt="laptop" className="w-96 hidden md:flex" />
      <div className="flex shadow-custom border-border/40 border rounded-md p-8 w-[26rem]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-full"
          >
            <h3 className="text-3xl font-semibold mb-4">Masuk</h3>
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
                  <div className="flex flex-row justify-between">
                    <FormDescription>Masukan kata sandi</FormDescription>
                    <Link
                      to="/lupa-password"
                      className="text-xs text-muted-foreground"
                    >
                      Lupa kata sandi?
                    </Link>
                  </div>
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
            <p className="text-xs text-center text-muted-foreground">
              Belum punya akun?{" "}
              <Link to="/register" className="text-primary">
                Daftar
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
