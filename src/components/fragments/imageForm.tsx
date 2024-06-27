/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { updateImageProfile } from "@/api/users";
import { useState } from "react";
import { showErrorsMessage, showSuccessMessage } from "@/utils/sweetAlert";
import { BiLoaderAlt } from "react-icons/bi";

const FormSchema = z.object({
  image: z.instanceof(File, {
    message: "Please select an image.",
  }),
});

export function ImageForm({
  setLoading,
}: {
  setLoading: (loading: boolean) => void;
}) {
  const [submit, setSubmit] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setSubmit(true);
    const formdata = new FormData();
    formdata.append("image", data.image);
    try {
      await updateImageProfile(formdata);
      showSuccessMessage("Barang yang anda temukan berhasil ditambahkan");
    } catch (error) {
      showErrorsMessage("Something went wrong, please try again later");
    }
    setSubmit(false);
    setLoading(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-2">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  className="pt-2"
                  accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
                  type="file"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          disabled={submit}
          type="submit"
          variant="outline"
          className="h-7"
        >
          {!submit ? (
            "ubah"
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
  );
}
