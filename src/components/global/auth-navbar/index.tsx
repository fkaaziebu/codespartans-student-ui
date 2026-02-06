"use client";
import Link from "next/link";

export const AuthNavbar = () => {
  return (
    <div className="fixed bg-white flex w-full shadow-sm z-50">
      <div className="flex w-full items-center justify-between px-2 py-3 sm:mx-10 lg:mx-0 xl:mx-35">
        <div className="flex items-center gap-4 w-[50%]">
          <Link href={"#"} className="font-mono font-bold">
            Codespartans
          </Link>
        </div>
      </div>
    </div>
  );
};
