"use client";
import { Bell, LogOut, Menu, Settings, X } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { MyCart } from "./my-cart";
import { SearchInput } from "./search-input";

const NAV_PADDING = "px-4 sm:px-10 lg:px-20 xl:px-35";

export const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    setIsLoggedIn(!!userToken);
    setIsLoading(false);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    closeMenu();
  };

  if (isLoading) {
    return (
      <div className="fixed bg-white w-full shadow-sm z-50">
        <div className={`flex w-full items-center py-3 ${NAV_PADDING}`}>
          <Link href="/courses" className="font-mono font-bold">
            Codespartans
          </Link>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="fixed bg-white w-full shadow-sm z-50">
        <div
          className={`flex w-full items-center justify-between py-3 ${NAV_PADDING}`}
        >
          {/* Logo + desktop search */}
          <div className="flex items-center gap-4 flex-1 min-w-0 mr-4">
            <Link href="/courses" className="font-mono font-bold flex-shrink-0">
              Codespartans
            </Link>
            <div className="hidden md:block flex-1 max-w-sm">
              <SearchInput />
            </div>
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-4">
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

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-1 text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-t bg-white py-4 space-y-4 shadow-md ${NAV_PADDING}`}
          >
            <SearchInput />
            <div className="flex flex-col gap-2 pt-2">
              <Button
                variant="outline"
                className="rounded-none w-full"
                onClick={() => {
                  router.push("/login");
                  closeMenu();
                }}
              >
                Log In
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 rounded-none w-full"
                onClick={() => {
                  router.push("/");
                  closeMenu();
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bg-white w-full shadow-sm z-50">
      <div
        className={`flex w-full items-center justify-between py-3 ${NAV_PADDING}`}
      >
        {/* Logo + desktop search */}
        <div className="flex items-center gap-4 flex-1 min-w-0 mr-4">
          <Link href="/courses" className="font-mono font-bold flex-shrink-0">
            Codespartans
          </Link>
          <div className="hidden md:block flex-1 max-w-sm">
            <SearchInput />
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/plans-pricing"
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            Plans &amp; Pricing
          </Link>
          <Link
            href="/my-learning"
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            My Learning
          </Link>
          <MyCart />
          <button
            className="text-gray-700 hover:text-gray-900 transition-colors relative mt-2"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>
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

        {/* Mobile: persistent icons + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <MyCart />
          <button
            className="text-gray-700 hover:text-gray-900 transition-colors relative mt-1"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </button>
          <button
            type="button"
            className="p-1 text-gray-700 hover:text-gray-900"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t bg-white py-4 shadow-md ${NAV_PADDING}`}
        >
          <div className="mb-4">
            <SearchInput />
          </div>
          <nav className="flex flex-col divide-y divide-gray-100">
            <Link
              href="/plans-pricing"
              className="py-3 text-gray-700 hover:text-gray-900 font-medium"
              onClick={closeMenu}
            >
              Plans &amp; Pricing
            </Link>
            <Link
              href="/my-learning"
              className="py-3 text-gray-700 hover:text-gray-900 font-medium"
              onClick={closeMenu}
            >
              My Learning
            </Link>
            <Link
              href="/profile"
              className="py-3 text-gray-700 hover:text-gray-900 font-medium"
              onClick={closeMenu}
            >
              Profile
            </Link>
            <Link
              href="/settings"
              className="py-3 flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
              onClick={closeMenu}
            >
              <Settings size={16} />
              Settings
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="py-3 text-left flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <LogOut size={16} />
              Log Out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};
