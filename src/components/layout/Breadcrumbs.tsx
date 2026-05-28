"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

function titleCase(str: string) {
  return str
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
}

export default function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname() || "/";

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Home", href: "/" },
    ...segments.map((seg, idx) => ({
      label: titleCase(decodeURIComponent(seg)),
      href: "/" + segments.slice(0, idx + 1).join("/"),
    })),
  ];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className="flex items-center gap-1 text-xs sm:text-sm text-slate-600 max-w-full overflow-x-auto whitespace-nowrap px-1"
        role="list"
      >
        {crumbs.map((c, idx) => {
          const isLast = idx === crumbs.length - 1;
          return (
            <li key={c.href} className="inline-flex items-center">
              {!isLast ? (
                <>
                  <Link
                    href={c.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors truncate block max-w-[8rem] sm:max-w-[12rem]"
                  >
                    {c.label}
                  </Link>
                  <ChevronRight className="mx-2 h-3 w-3 text-slate-400" />
                </>
              ) : (
                <span
                  aria-current="page"
                  className="font-medium text-slate-800"
                >
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
