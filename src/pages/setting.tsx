/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationLayout } from "@/components/layout/navigationLayout";
import { getUser, updateUser } from "@/api/users";
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
import { z } from "zod";
import { BiLoaderAlt } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageForm } from "@/components/fragments/imageForm";
import { ChangePasswordForm } from "./changePasswordForm";
import { NavLink, useParams } from "react-router-dom";

const formSchema = z.object({
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
});

interface User {
  email: string;
  fullname: string;
  username: string;
  picture: string;
}

export const Setting = () => {
  const [user, setUser] = useState<User>({
    email: "",
    fullname: "",
    username: "",
    picture: "",
  });
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setting } = useParams();

  useEffect(() => {
    document.title = "Register";
    window.scrollTo(0, 0);
    setSubmit(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    getUserProfile();
    setLoading(false);
  }, [loading]);

  const getUserProfile = async () => {
    try {
      const response = (await getUser()).data;
      setUser(response.data.user);
    } catch (error: any) {
      console.error("Failed to fetch user", error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullname: "",
      username: "",
    },
    values: {
      email: user?.email,
      fullname: user?.fullname,
      username: user?.username,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmit(true);
    try {
      await updateUser(values);
      showSuccessMessage("Profile updated successfully");
    } catch (error: any) {
      showErrorsMessage(error.response.data.message);
    }
    setSubmit(false);
  }

  return (
    <NavigationLayout>
      <div className="flex flex-col w-full items-center pt-4 mb-32">
        <div className="w-[70%] mb-7">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="flex flex-row mt-3 w-[70%]">
          <div className="w-72">
            <div className="flex flex-col gap-2">
              <NavLink
                to="/setting/edit-profile"
                className={({ isActive }) =>
                  isActive
                    ? "hover:text-muted-foreground font-medium"
                    : "text-muted-foreground"
                }
              >
                Edit profile
              </NavLink>
              <NavLink
                to="/setting/edit-password"
                className={({ isActive }) =>
                  isActive
                    ? "hover:text-muted-foreground font-medium"
                    : "text-muted-foreground"
                }
              >
                Password
              </NavLink>
            </div>
          </div>
          {setting === "edit-profile" && (
            <div className="w-full">
              <h2 className="text-2xl font-semibold mb-3">Edit Profile</h2>
              <div className="flex flex-col shadow-custom border-border/40 border rounded-md p-8 w-full">
                <div className="flex flex-row items-center gap-6 mb-5">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.picture} alt="image" />
                    <AvatarFallback className="text-2xl font-semibold">
                      {user.fullname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <ImageForm setLoading={setLoading} />
                </div>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 w-full"
                  >
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
          )}
          {setting === "edit-password" && (
            <div className="w-full">
              <ChangePasswordForm />
            </div>
          )}
        </div>
      </div>
    </NavigationLayout>
  );
};
