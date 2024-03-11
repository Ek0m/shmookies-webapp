"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { navLink } from "@/data";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link"

function Header() {
  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <nav className="p-5 shadow-sm flex gap-6 justify-between ">
      <div className="flex items-center gap-12 ">
        <Link href={'/'}><Image src="/logo.svg" alt="logo" width={200} height={100} /></Link>
        
        <ul className="md:flex items-center gap-6 hidden mt-4 ">
          {navLink.map((links, index) => (
            <li className="hover:scale-105 hover:text-primary" key={index}>
              {links.text}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center">
        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={data?.user.image}
                alt="image"
                width={40}
                height={40}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href={'/mybooking'}>My Bookings</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()} className="text-red-500">Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("descope")} className="">
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Header;
