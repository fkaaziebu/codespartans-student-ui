"use client";
import { Bell, BookOpen, LogOut, Settings, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MyCart } from "./my-cart";
import { SearchInput } from "./search-input";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user token exists in sessionStorage
    const userToken = sessionStorage.getItem("token");
    setIsLoggedIn(!!userToken);
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="fixed bg-white flex w-full shadow-sm z-50">
        <div className="flex w-full items-center justify-between px-2 py-3 sm:mx-10 lg:mx-0 xl:mx-35">
          <div className="flex items-center gap-4 w-full">
            <Link href={"/courses"} className="font-mono font-bold">
              Codespartans
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="fixed bg-white flex w-full shadow-sm z-50">
        <div className="flex w-full items-center justify-between px-2 py-3 sm:mx-10 lg:mx-0 xl:mx-35">
          <div className="flex items-center gap-4 w-[50%]">
            <Link href={"/courses"} className="font-mono font-bold">
              Codespartans
            </Link>
            <SearchInput />
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="rounded-none"
              onClick={() => router.push("/login")}
            >
              Log In
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 rounded-none"
              onClick={() => router.push("/")}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bg-white flex w-full shadow-sm z-50">
      <div className="flex w-full items-center justify-between px-2 py-3 sm:mx-10 lg:mx-0 xl:mx-35">
        <div className="flex items-center gap-4 w-[50%]">
          <Link href={"/courses"} className="font-mono font-bold">
            Codespartans
          </Link>
          <SearchInput />
        </div>
        <div className="flex items-center gap-6">
          {/* Plans & Pricing */}
          <Link
            href={"/plans-pricing"}
            className="text-gray-700 hover:text-gray-900 transition-colors"
            title="Plans & Pricing"
          >
            Plans & Pricing
          </Link>
          {/* My Learning */}
          <Link
            href={"/my-learning"}
            className="text-gray-700 hover:text-gray-900 transition-colors"
            title="My Learning"
          >
            My Learning
          </Link>

          {/* My Cart */}
          <MyCart />
          {/* Notification */}
          <button
            className="text-gray-700 hover:text-gray-900 transition-colors relative mt-2"
            title="Notifications"
          >
            <Bell size={20} />
            {/* Notification badge */}
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors text-gray-700"
                title="Profile"
              >
                <span className="text-sm font-semibold">U</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-none">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
                      U
                    </div>
                    <div>
                      <p className="font-medium text-sm">User Name</p>
                      <p className="text-xs text-gray-500">user@example.com</p>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  href="/settings"
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer flex items-center gap-2 text-red-600"
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
