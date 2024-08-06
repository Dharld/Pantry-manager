"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ButtonIcon } from "./ButtonIcon";
import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/products", label: "Products" },
    { href: "/analytics", label: "Analytics" },
  ];

  return (
    <header className="text-primary border-b-[0.25px] border-b-secondary px-6 pt-2 pb-1 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold text-accent">
        Pantrify
      </Link>
      <nav>
        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`px-2 py-2 border-b-2 ${
                  pathname === item.href
                    ? "border-accent-primary"
                    : "border-transparent"
                }`}
              >
                <span
                  className={`text-sm hover:text-accent transition-colors ${
                    pathname === item.href ? "text-accent font-semibold" : ""
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex justify-between items-center">
        <div className="flex">
          <ButtonIcon styles="w-8 h-8 p-2 bg-onSecondary group">
            <Settings />
          </ButtonIcon>
          <ButtonIcon styles="ml-2 w-8 h-8 p-2 bg-onSecondary group">
            <Bell />
          </ButtonIcon>
          <Avatar className="w-8 h-8 ml-3">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-accent-primary">CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
