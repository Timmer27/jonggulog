import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginButton from "./loginButton";

const PageHeader = () => {
  const { asPath, pathname } = useRouter();
  const session = useSession();
  const [openNav, setOpenNav] = useState<boolean>(false);
  // const idRef = useRef<HTMLInputElement>();
  // const pwRef = useRef<HTMLInputElement>();
  const navItems = [
    {
      href: "/",
      color: "blue-gray",
      className: "p-1 text-[15px]",
      name: "HOME"
    },
    {
      href: "/daily",
      color: "blue-gray",
      className: "p-1 text-[15px]",
      name: "일상"
    },
    {
      href: "/programs",
      color: "blue-gray",
      className: "p-1 text-[15px]",
      name: "프로그램"
    },
    {
      href: "/about",
      color: "blue-gray",
      className: "p-1 text-[15px]",
      name: "ABOUT"
    },
    {
      href: "/contact",
      color: "blue-gray",
      className: "p-1 text-[15px]",
      name: "CONTACT"
    }
  ];
  const navList = (
    <ul className="mt-2 mb-4 flex gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4 px-4">
      {navItems.map((val, idx) => {
        const classNames = `${val.className} ${
          "/" + asPath.split("/")[1] === val.href
            ? "font-bold font-[#27738f]"
            : "font-normal"
        }`;
        return (
          <Link href={val.href} color={val.href} className={classNames}>
            {val.name}
          </Link>
        );
      })}
      {session.status === "authenticated" &&
        session.data.user.email === "whdghtpgml@gmail.com" && (
          <Link href="/admin" color="blue-gray" className={"p-1 text-[15px]"}>
            글쓰기
          </Link>
        )}
    </ul>
  );

  useEffect(() => {
    window.innerWidth < 550 && setOpenNav(true);
  }, []);

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
      {/* overflow-scroll */}
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none border-b-[#e3e3e3cf]">
        <div className="flex items-center justify-between text-blue-gray-900 px-4">
          <Link href="/" className="w-28">
            {/* <p>종구공방</p> */}
            <img src="/web_logo1.png" alt="tmp" />
          </Link>
          <div className="flex items-center lg:gap-4 md:gap-4 sm:gap-0">
            {/* navList */}
            {
              !openNav && (
                <div className="mr-2 hidden lg:block md:block w-fit">
                  {navList}
                </div>
              )
              // <MobileNav className="mb-52">
              //   {navList}
              //   <div className="flex items-center gap-x-1">
              //     <Button fullWidth variant="text" size="sm" className="">
              //       <span>Log In</span>
              //     </Button>
              //     <Button fullWidth variant="gradient" size="sm" className="">
              //       <span>Sign in</span>
              //     </Button>
              //   </div>
              // </MobileNav>
            }

            <div className="flex items-center gap-x-1">
              <LoginButton />
            </div>
            {openNav && (
              <Button variant="text">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <div className="lg:flex"></div>
              </Button>
            )}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default PageHeader;
