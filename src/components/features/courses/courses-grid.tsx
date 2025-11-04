"use client";
import { ReactNode } from "react";

interface CoursesGridProps {
  children: ReactNode;
}

export default function CoursesGrid({ children }: CoursesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  );
}
