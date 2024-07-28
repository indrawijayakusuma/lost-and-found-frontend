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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";
import { z } from "zod";
import {
  showErrorsMessage,
  showSuccessMessageWithButton,
} from "@/utils/sweetAlert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { getPostUpdateById, updatePost } from "@/api/posts";

interface FormDataInterface {
  item_name: string;
  tipe_barang: string;
  color: string;
  secondary_color: string;
  date: Date;
  location_id: string;
  post_id: string;
  question_id: string;
  label_location: string;
  location: string;
  address: string;
  additional_info: string;
  user_id: string;
  image: File | null;
  question: string[];
  found_item_id: string;
}

const formSchema = z.object({
  itemName: z.string().min(3, {
    message: "Nama item setidaknya mengandung 3 karakter",
  }),
  tipeBarang: z.string().min(3, {
    message: "Tipe barang mengandung 3 karakter",
  }),
  color: z.string().min(3, {
    message: "Warna mengandung 3 karakter",
  }),
  secondaryColor: z.string().min(3, {
    message: "Warna sekunder mengandung 3 karakter",
  }),
  date: z.date({
    required_error: "Tanggal harus diisi",
  }),
  labelLocation: z.string().min(3, {
    message: "label lokasi harus diisi",
  }),
  location: z.string().min(3, {
    message: "Lokasi harus diisi",
  }),
  address: z.string().min(3, {
    message: "Alamat harus diisi",
  }),
  additionalInfo: z.string().min(3, {
    message: "Informasi tambahan harus diisi",
  }),
  image: z.instanceof(File, {
    message: "Please select an image.",
  }),
  question1: z.string().min(3, {
    message: "pertanyaan harus diisi",
  }),
  question2: z.string().min(3, {
    message: "Pertanyaan harus diisi",
  }),
  question3: z.string().min(3, {
    message: "Pertanyaan harus diisi",
  }),
});

export const FormEditPost = () => {
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [foundItem, setFoundItem] = useState<FormDataInterface>({
    item_name: "",
    tipe_barang: "",
    color: "",
    secondary_color: "",
    date: new Date(),
    location_id: "",
    post_id: "",
    question_id: "",
    label_location: "",
    location: "",
    address: "",
    additional_info: "",
    user_id: "",
    image: null,
    question: [],
    found_item_id: "",
  });

  useEffect(() => {
    document.title = "Edit Post";
    window.scrollTo(0, 0);
    setSubmit(false);
    const getPost = async () => {
      try {
        const response = (await getPostUpdateById(postId || "")).data;
        console.log(response.data);
        setFoundItem(response.data);
      } catch (error: any) {
        showErrorsMessage(error.response.data.message);
      }
    };
    getPost();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      tipeBarang: "",
      color: "",
      secondaryColor: "",
      date: new Date(),
      labelLocation: "",
      location: "",
      address: "",
      additionalInfo: "",
      image: undefined,
      question1: "",
      question2: "",
      question3: "",
    },
    values: {
      itemName: foundItem?.item_name,
      tipeBarang: foundItem?.tipe_barang,
      color: foundItem?.color,
      secondaryColor: foundItem?.secondary_color,
      date: foundItem?.date ? new Date(foundItem.date) : new Date(),
      labelLocation: foundItem?.label_location,
      location: foundItem?.location,
      address: foundItem?.address,
      additionalInfo: foundItem?.additional_info,
      image: new File([], ""),
      question1: foundItem?.question[0],
      question2: foundItem?.question[1],
      question3: foundItem?.question[2],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmit(true);
    const data = `["${values.question1}", "${values.question2}", "${values.question3}"]`;
    let img;
    if (values.image.size <= 0) {
      img = foundItem.image || "";
    } else {
      img = values.image;
    } 

    const formdata = new FormData();
    formdata.append("postId", foundItem.post_id);
    formdata.append("locationId", foundItem.location_id);
    formdata.append("questionId", foundItem.question_id);
    formdata.append("itemName", values.itemName);
    formdata.append("tipeBarang", values.tipeBarang);
    formdata.append("color", values.color);
    formdata.append("secondaryColor", values.secondaryColor);
    formdata.append("date", values.date.toString());
    formdata.append("labelLocation", values.labelLocation);
    formdata.append("location", values.location);
    formdata.append("address", values.address);
    formdata.append("additionalInfo", values.additionalInfo);
    formdata.append("image", img);
    formdata.append("questions", data);
    try {
      await updatePost(formdata);
      showSuccessMessageWithButton(
        "Barang yang anda temukan berhasil ditambahkan"
      ).then((result) => {
        if (result.isConfirmed) {
          navigate(-1);
        }
      });
    } catch (error) {
      showErrorsMessage("Something went wrong, please try again later");
    }
    setSubmit(false);
  };

  return (
    <div className="lg:w-[60%] w-[90%] mx-auto mt-10 mb-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="text-center">
            <h2 className="text-lg font-bold">
              Edit Informasi Data Barang Ditemukan
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              Isi data-data informasi barang yang ditemukan agar dapat diklaim
              pemilik
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 w-full border border-border/40 shadow-custom mx-auto px-10 py-8">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Nama Barang <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nama barang" required {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan nama barang yang ditemukan
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipeBarang"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Tipe Barang <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Tipe barang" required {...field} />
                  </FormControl>
                  <FormDescription>Masukkan tipe barang</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Warna <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nomer telepon" required {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan nomor telepon yang aktif
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondaryColor"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Warna Sekunder <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Warna sekunder" required {...field} />
                  </FormControl>
                  <FormDescription>Masukkan warna sekunder</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Tanggal Ditemukan <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>Tanggal penemuan barang</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="text-center">
            <h2 className="text-lg font-bold">
              Edit Informasi Lokasi Barang Ditemukan
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              Isi informasi lokasi barang yang ditemukan agar dapat divalidasi
              oleh pemilik
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 w-full border border-border/40 shadow-custom mx-auto px-10 py-8">
            <FormField
              control={form.control}
              name="labelLocation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Label Lokasi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Label lokasi" {...field} />
                  </FormControl>
                  <FormDescription>Masukkan label kehilangan</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Nama Lokasi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Lokasi" {...field} />
                  </FormControl>
                  <FormDescription>Masukkan Lokasi kehilangan</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Alamat Lokasi Penemuan{" "}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Alamat" {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan Alamat Lokasi Penemuan
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Informasi Tambahan <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Informasi tambahan" {...field} />
                  </FormControl>
                  <FormDescription>Masukkan Informasi tambahan</FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Foto Barang <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="pt-2"
                      accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
                      type="file"
                      onChange={(e) =>
                        field.onChange(
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="text-center">
            <h2 className="text-lg font-bold">
              Edit Informasi Pertanyaan barang ditemukan
            </h2>
            <p className="text-sm font-medium text-muted-foreground">
              Buatlah pertanyaan yang spesifik terkait barang yang kamu temukan
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 w-full border border-border/40 shadow-custom mx-auto px-10 py-8">
            <FormField
              control={form.control}
              name="question1"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Pertanyaan Validasi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="pertanyaan" {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan Pertanyaan Validasi
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question2"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Pertanyaan Validasi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="pertanyaan" {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan Pertanyaan Validasi
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="question3"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Pertanyaan Validasi <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="pertanyaan" {...field} />
                  </FormControl>
                  <FormDescription>
                    Masukkan Pertanyaan Validasi
                  </FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="flex items-center mt-4 ml-2">
              <input
                required
                id="link-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-[#FF6600] bg-gray-100 border-gray-300 rounded focus:ring-[#FF6600]"
              />
              <label
                htmlFor="link-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                I agree with the{" "}
                <Link
                  to="/tnc"
                  target="_blank"
                  rel="norefferrer-nooper"
                  className="text-[#FF6600]  hover:underline"
                >
                  terms and conditions
                </Link>
                .
              </label>
            </div> */}
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
  );
};
