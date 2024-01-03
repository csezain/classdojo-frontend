"use client";
import React, { useState } from "react";
import { INavbarLinks, NavbarLinks } from "@/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu } from "lucide-react";
import NavDropDown from "./NavDropDown";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <header className=" bg-primary/5">
      <div className="w-full max-w-7xl mx-auto flex justify-between px-10 relative">
        {/* LOG */}
        <div className="py-5">
          <Link href={"/"}>
            <p className="text-xl font-bold text-primary">Pak Grammar School</p>
          </Link>
        </div>
        <Button
          size={"icon"}
          variant={"outline"}
          className="md:hidden self-center"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <Menu />
        </Button>
        {/* Navbar */}
        <nav
          className={`absolute md:relative top-full left-0 ${
            collapsed ? "block" : "hidden md:block"
          } bg-white md:bg-transparent w-full md:w-auto px-5`}
        >
          <ul className="flex gap-3 text-sm flex-col md:flex-row items-start h-full">
            {NavbarLinks.map(({ title, dropdown }, ind) => (
              <li
                className="md:py-5 relative w-full md:w-auto h-full group leading-6 cursor-pointer"
                key={ind}
              >
                <Button
                  asChild
                  variant={"link"}
                  className="w-full md:w-auto h-full py-2 justify-stretch border-b md:border-b-transparent w-fulls gap-2"
                >
                  {dropdown ? (
                    <span tabIndex={4}>
                      {title}
                      <ChevronDown size={16} className="ml-auto" />
                    </span>
                  ) : (
                    <Link href={`/${title.toLowerCase()}`}>{title}</Link>
                  )}
                </Button>
                {dropdown && <NavDropDown list={dropdown} />}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
