import React, { useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@material-tailwind/react";

export default function LoginButton() {
  const { data: session } = useSession();
  const [isAuthInfoVisible, setAuthInfoVisible] = useState<boolean>(false);
  const toggleAuthInfo = () => {
    setAuthInfoVisible(!isAuthInfoVisible);
  };
  return session ? (
    <div className="relative">
      <img
        src={session.user.image}
        alt="profile"
        className="rounded-full cursor-pointer"
        width={40}
        onClick={toggleAuthInfo}
      />
      <div
        className={`${
          isAuthInfoVisible ? "block" : "hidden"
        } absolute top-10 left-[-12rem] bg-white`}
      >
        <div className="px-3 py-2 shadow-lg rounded-lg border border-gray-200 w-56">
          <div className="text-md font-bold">{session.user.name}</div>
          <div className="text-[#adadad] text-sm">{session.user.email}</div>
          <div
            onClick={() => signOut()}
            className="bg-white text-lg font-semibold mt-3 text-black cursor-pointer hover:bg-[#e2e2e2] text-center transition-all delay-10 rounded-md h-12 items-center flex justify-center"
          >
            Sign Out
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Button className="p-2 bg-blue-gray-900 " onClick={() => signIn()}>LOGIN</Button>
  );
}
