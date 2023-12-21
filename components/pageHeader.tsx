import React, { useRef, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/router";

interface userLogin {
  id: string;
  pw: string;
}

type Props = {};
const PageHeader = (props: Props) => {
  const { asPath, pathname } = useRouter();
  const idRef = useRef<HTMLInputElement>();
  const pwRef = useRef<HTMLInputElement>();
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
      name: "프로그램"
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
    </ul>
  );

  const loginHandler = () => {
    const [_id, _pw] = [idRef.current.value, pwRef.current.value];
    console.log("_id, _pw", _id, _pw);
  };

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)]">
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
              <Menu
                dismiss={{
                  itemPress: false
                }}
              >
                <MenuHandler>
                  <Button>관리자</Button>
                </MenuHandler>
                <MenuList>
                  <Input
                    inputRef={idRef}
                    crossOrigin={{}}
                    label="ID"
                    containerProps={{
                      className: "mb-4"
                    }}
                  />
                  <Input
                    inputRef={pwRef}
                    crossOrigin={{}}
                    label="PW"
                    type="password"
                    containerProps={{
                      className: "mb-4"
                    }}
                  />
                  <Button
                    onClick={() => {
                      loginHandler();
                    }}
                  >
                    로그인
                  </Button>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default PageHeader;
