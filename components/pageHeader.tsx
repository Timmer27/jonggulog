import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton
} from "@material-tailwind/react";
import Link from "next/link";

type Props = {};
const PageHeader = (props: Props) => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [selectedIdx, setSelectedIdx] = useState<Number>(0);

  const navItems = [
    {
      href: "/",
      color: "blue-gray",
      className: "p-1 text-lg",
      name: "HOME"
    },
    {
      href: "/daily",
      color: "blue-gray",
      className: "p-1 text-lg",
      name: "일상"
    },
    {
      href: "/programs",
      color: "blue-gray",
      className: "p-1 text-lg",
      name: "프로그램 공유"
    },
    {
      href: "/about",
      color: "blue-gray",
      className: "p-1 text-lg",
      name: "ABOUT"
    },
    {
      href: "/contact",
      color: "blue-gray",
      className: "p-1 text-lg",
      name: "CONTACT"
    }
  ];
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-4 px-4">
      {navItems.map((val, idx) => {
        const classNames = `${val.className} ${
          idx === selectedIdx ? "font-bold font-[#27738f]" : "font-normal"
        }`
        console.log(classNames)
        return (
          <Link
            href={val.href}
            color={val.href}
            className={classNames}
            onClick={() => {
              setSelectedIdx(idx)
            }}
          >
            {val.name}
          </Link>
        );
      })}
    </ul>
  );

  return (
    <div className="mt-3 -m-6 max-h-[768px] w-[calc(100%+48px)]">
      {/* overflow-scroll */}
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 shadow-none border-b-[#e3e3e3cf]">
        <div className="flex items-center justify-between text-blue-gray-900 px-4">
          <Link href="/" className="w-28">
            {/* <p>종구공방</p> */}
            <img src="/test.png" alt="tmp" />
          </Link>
          <div className="flex items-center gap-4">
            {/* navList */}
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button
                variant="text"
                size="lg"
                className="hidden lg:inline-block"
              >
                <span>Log In</span>
              </Button>
              <Button
                variant="gradient"
                size="lg"
                className="hidden lg:inline-block"
              >
                <span>Sign in</span>
              </Button>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1 px-4">
            <Button fullWidth variant="text" size="lg" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="lg" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default PageHeader;
