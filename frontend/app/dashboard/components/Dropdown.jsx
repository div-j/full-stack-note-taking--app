import { useAuth } from "@/app/_context/authContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, CircleUserRound, User, UserRoundPen } from "lucide-react";
import React from "react";

export default function Dropdown() {
  const { LogoutUser } = useAuth(); // Ensure the correct function name is used

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="border-1"><ChevronDown size={20} /></DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white space-y-3 rounded-md w-32 mr-20 mt-2 shadow-lg py-4">
          <DropdownMenuItem className="hover:border hover:bg-slate-100 flex items-center py-1 cursor-pointer px-4 gap-2 text-xs">
            <CircleUserRound size={18} /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:border hover:bg-slate-100 flex items-center cursor-pointer py-1 text-xs px-4 gap-2">
            <UserRoundPen size={18} /> Edit Profile
          </DropdownMenuItem>
          <hr className="bg-black text-black" />
          <DropdownMenuItem className="hover:border hover:bg-slate-100 flex items-center text-xs py-1 cursor-pointer px-4 gap-2" onClick={LogoutUser}>
            <User size={18} /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
