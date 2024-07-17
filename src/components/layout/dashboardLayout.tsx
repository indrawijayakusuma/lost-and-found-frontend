/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type TypePost = "Ditemukan" | "Diklaim" | "Daftar-postingan";
interface Props {
  children: ReactNode;
  user: any;
  typePostHandler: (type: TypePost) => void;
  typePost: string;
}

export const DashboardLayout: React.FC<Props> = ({
  user,
  children,
  typePostHandler,
  typePost,
}) => {
  return (
    <div className="flex justify-center md:my-10 text-sm min-h-[40rem]">
      <div className="md:w-[80%] w-[90%] flex flex-col md:flex-row gap-6">
        <div className="w-1/5">
          <div className="hidden md:flex md:flex-col gap-3 shadow-custom border-border/40 border p-5 rounded-lg">
            <div className="flex flex-row space-x-2 items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.picture} />
                <AvatarFallback className="font-semibold text-3xl">
                  {user.fullname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className="text-lg font-semibold ">{user.fullname}</p>
            </div>
            <Separator className="h-[0.1rem]" />

            <div className="flex flex-col gap-2">
              <Button
                variant={"outline"}
                className={`w-full h-auto ${
                  typePost === "Ditemukan" ? "border-orangeFigma" : ""
                }`}
                onClick={() => typePostHandler("Ditemukan")}
              >
                <div>
                  <p className="text-wrap text-left text-base font-medium">
                    Barang Ditemukan
                  </p>
                  <p className="text-wrap text-left text-xs text-muted-foreground">
                    Daftar barang yang ditemukan dirimu
                  </p>
                </div>
              </Button>
              <Button
                variant={"outline"}
                className={`w-full h-auto ${
                  typePost === "Diklaim" ? "border-orangeFigma" : ""
                }`}
                onClick={() => typePostHandler("Diklaim")}
              >
                <div>
                  <p className="text-wrap text-left text-base font-medium">
                    Barang Diklaim
                  </p>
                  <p className="text-wrap text-left text-xs text-muted-foreground">
                    Daftar barang yang diklaim dirimu
                  </p>
                </div>
              </Button>
              <Button
                variant={"outline"}
                className={`w-full h-auto ${
                  typePost === "Daftar-postingan" ? "border-orangeFigma" : ""
                }`}
                onClick={() => typePostHandler("Daftar-postingan")}
              >
                <div>
                  <p className="text-wrap text-left text-base font-medium">
                    List postingan
                  </p>
                  <p className="text-wrap text-left text-xs text-muted-foreground">
                    Daftar Postingan yang anda miliki
                  </p>
                </div>
              </Button>
            </div>
          </div>
        </div>

        <div className="md:w-4/5">
          <p className="text-lg font-semibold md:text-2xl mb-4">
            Daftar Postingan
          </p>
          {children}
        </div>
      </div>
    </div>
  );
};
