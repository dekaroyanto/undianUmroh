"use client";
import { useState } from "react";
import NextImage from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faGear, faHouse } from "@fortawesome/free-solid-svg-icons";

import IconHeader from "/src/assets/icons/logo-1.png";
import Link from "next/link";

import MessageIcon from "../../assets/icons/massage-icon.svg";
import HomeIcon from "../../assets/icons/home-icon.svg";
import GearIcon from "../../assets/icons/gear-icon.svg";

export default function Header() {
  const [user, setUser] = useState({
    id_name: "ID_CINDRAWATI",
    lokasi_toko: "1007 - HEAD OFFICE",
    lokasi_inv: "INVT01 - HEAD OFFICE",
  });

  return (
    <div className="container mx-auto bg-white">
      {/* Header */}
      <div className="p-2 flex justify-between">
        <div className="flex items-center">
          <NextImage
            src={IconHeader}
            alt="Background Image"
            quality={100}
            width={64}
            className="border-r-1 pr-4"
          />

          <h3 className="px-4 mr-4 text-gray-500">{user.id_name}</h3>
          <div>
            <p className="text-gray-500 text-xs">
              Store Location : {user.lokasi_toko}
            </p>
            <p className="text-gray-500 text-xs">
              Inventory Location : {user.lokasi_inv}
            </p>
          </div>
        </div>
        <div className="flex">
          <Link href="/dashboard" className="mx-1 py-3 px-2 self-center">
            <NextImage src={HomeIcon} alt="icon-message" />
          </Link>
          <button className="relative mx-1 py-3 px-2 self-center">
            <span className="absolute top-0 right-0 text-[#adadad]">
              &#9662;
            </span>
            <NextImage src={MessageIcon} alt="icon-message" />
          </button>
          {/* Logout */}
          <button className="relative mx-1 py-3 px-2 self-center group">
            <span className="absolute top-0 right-0 text-[#adadad]">
              &#9662;
            </span>
            <NextImage src={GearIcon} alt="icon-message" />
            <ul className="shadow-box absolute bg-white right-0 z-30 top-full hidden group-hover:block">
              <li className="w-max p-3 cursor-default">
                <a href="" className=" hover:text-primary cursor-pointer">
                  Reset Password
                </a>
              </li>
              <hr />
              <li className="w-max p-3 cursor-default">
                <Link
                  href="/login"
                  className=" hover:text-primary cursor-pointer"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
}
