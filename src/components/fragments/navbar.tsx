/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HiMenuAlt2 } from "react-icons/hi";
import logo from "../../assets/LogoBar.png";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  token: string;
  user: any;
  handlerLogout: () => void;
}

export const Navbar = ({ token, user, handlerLogout }: Props) => {
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <img src={logo} className="w-40" />
          <span className="sr-only">Acme Inc</span>
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
            <HiMenuAlt2 className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            {token && (
              <Link to="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
            )}
            <Link to="/buat-postingan" className="hover:text-foreground">
              Buat postingan
            </Link>
            <Link
              to="/daftar-barang-ditemukan"
              className="hover:text-foreground"
            >
              Postingan Terbaru
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-6">
        <div className="ml-auto flex-1 sm:flex-initial" />
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-foreground font-semibold text-sm transition-colors hover:text-foreground hidden md:flex"
              : "text-muted-foreground text-sm transition-colors hover:text-foreground hidden md:flex"
          }
        >
          Home
        </NavLink>
        {token && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-foreground font-semibold text-sm transition-colors hover:text-foreground hidden md:flex"
                : "text-muted-foreground text-sm transition-colors hover:text-foreground hidden md:flex"
            }
          >
            Dashboard
          </NavLink>
        )}
        <NavLink
          to="/buat-postingan"
          className={({ isActive }) =>
            isActive
              ? "text-foreground font-semibold text-sm transition-colors hover:text-foreground hidden md:flex"
              : "text-muted-foreground text-sm transition-colors hover:text-foreground hidden md:flex"
          }
        >
          Buat Postingan
        </NavLink>
        <NavLink
          to="/daftar-barang-ditemukan"
          className={({ isActive }) =>
            isActive
              ? "text-foreground font-semibold text-sm transition-colors hover:text-foreground hidden md:flex"
              : "text-muted-foreground text-sm transition-colors hover:text-foreground hidden md:flex"
          }
        >
          Postingan Terbaru
        </NavLink>
        <Separator
          orientation="vertical"
          className="h-6 bg-primary md:flex hidden"
        />
        {token ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex cursor-pointer items-center gap-2 hover:bg-accent p-2 rounded-md">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <Avatar>
                      <AvatarImage src={user.picture} />
                      <AvatarFallback className="font-semibold text-xl">
                        {user.fullname.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                  <p className="text-sm font-semibold">{user.username}</p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/setting/edit-profile">
                  <DropdownMenuItem>Setting</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                {token ? (
                  <DropdownMenuItem onClick={handlerLogout}>
                    Logout
                  </DropdownMenuItem>
                ) : (
                  <Link to="/login">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link
            to="/login"
            className="text-muted-foreground text-sm transition-colors hover:text-foreground hidden md:flex"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
