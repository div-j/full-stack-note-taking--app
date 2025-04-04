import { Bell, Mail, PenIcon } from "lucide-react";
import React from "react";

export default function Header() {
  return (
    <div className="flex justify-between items-center h-16    mt-4">
      <div className="flex justify-start gap-x-2 items-center pl-6 h-16 text-gray-600 bg-white w-[80%] rounded-lg text-xs hover:text-black">
        <PenIcon size={15} />
        <p>Write your Note</p>
      </div>
      <section className="flex bg-white gap-x-6 items-center w-[15%] h-16 justify-center rounded-lg">
        <div className="relative" >
          <Mail size={20} />
          <span className="bg-black text-white rounded-full text-xs  w-5 text-center h-4 absolute -top-4 left-5">2</span>
        </div>
        <div className="relative" >
          <Bell size={20} />
          <span className="bg-black text-white rounded-full text-xs  w-5 text-center h-4 absolute -top-4 left-5">2</span>
        </div>
      </section>
    </div>
  );
}
