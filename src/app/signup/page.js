"use client";

import React, { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";

const BASE_URL = "10.40.6.135:1501/umroh";
const ENDPOINT = "user/register";

import Personal from "./Personal";
import Family from "./Family";
import Group from "./Group";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toastFailed, toastPending } from "@/components/ToastAlert";
import { motion, AnimatePresence } from "framer-motion";
import "./signup.css";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Personal");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen px-10 py-20 md:px-20 lg:px-40 bg-gradient-to-r from-white to-slate-200"
    >
      {/* <ToastContainer position="top-center" /> */}
      <div className="flex h-full overflow-hidden bg-primary rounded-3xl shadow-box-lg">
        <div className="relative flex-1 basis-[50%] bg-white flex justify-center px-5 md:px-10 lg:px-20 overflow-scroll">
          <div className="w-full">
            <h1 className="w-full text-3xl font-bold text-center text-slate-400 mt-10">
              Register
            </h1>

            <div className="flex justify-between mt-7 mb-5">
              <Button
                variant={activeTab === "Personal" ? "flat" : "light"}
                className={`tab ${
                  activeTab === "Personal" ? "active-tab" : ""
                } rounded`}
                onClick={() => {
                  setActiveTab("Personal");
                }}
                fullWidth
              >
                Personal
                {activeTab === "Personal" && <div className="underline"></div>}
              </Button>

              <Button
                variant={activeTab === "Family" ? "flat" : "light"}
                className={`tab ${
                  activeTab === "Family" ? "active-tab" : ""
                } rounded`}
                onClick={() => {
                  setActiveTab("Family");
                }}
                fullWidth
              >
                Family
                {activeTab === "Family" && <div className="underline"></div>}
              </Button>

              <Button
                variant={activeTab === "Group" ? "flat" : "light"}
                className={`tab ${
                  activeTab === "Group" ? "active-tab" : ""
                } rounded mb-3`}
                onClick={() => {
                  setActiveTab("Group");
                }}
                fullWidth
              >
                Group
                {activeTab === "Group" && <div className="underline"></div>}
              </Button>
            </div>
            {activeTab === "Personal" && <Personal />}
            {activeTab === "Family" && <Family />}
            {activeTab === "Group" && <Group />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
