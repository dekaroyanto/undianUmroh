"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

import { useFormik } from "formik";
import * as Yup from "yup";

import ImageNext from "next/image";
import Icon from "/src/assets/icons/logo-1.png";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toastFailed, toastPending } from "@/components/ToastAlert";
import { motion } from "framer-motion";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("username must be required"),
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Password must be required"),
    }),
    onSubmit: async (e) => {
      // alert(JSON.stringify(values, null, 2));

      try {
        setLoading(true);
        const response = await API.post("user/login", JSON.stringify(e), {
          headers: { "Content-Type": "application/json" },
        });
        console.log("success", response);

        toastPending({
          textPending: "Waiting..",
          textSuccess: "Success Login",
        });
        setTimeout(() => {
          router.push("dashboard");
        }, 1000);
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          toastFailed({ title: "Username / Password Salah" });
          setLoading(false);
        }, 1000);
      }
    },
  });

  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  const notifySuccess = () => {
    toast.promise(resolveAfter3Sec, {
      pending: "Waiting..",
      success: "Success Login",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen px-10 py-20 md:px-20 lg:px-40 bg-gradient-to-r from-white to-slate-200"
    >
      {/* <ToastContainer position="top-center" /> */}
      <div className="flex h-full overflow-hidden bg-primary rounded-3xl shadow-box-lg">
        <div className="relative flex-1 basis-[50%] bg-white flex justify-center px-5 md:px-10 lg:px-20">
          <ImageNext
            src={Icon}
            alt="icon"
            className="absolute -rotate-90 -right-10 scale-125 top-10"
            width={150}
          />
          <div className="w-full">
            <h1 className="w-full text-3xl font-bold text-center text-slate-400">
              Register
            </h1>
            <hr className="border-solid border-2 border-primary w-[15%] my-4 mx-auto" />
            <form onSubmit={formik.handleSubmit}>
              <Input
                label="Username"
                className=""
                variant="underlined"
                name="username"
                placeholder="Enter your username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-sm text-primary font-semibold">
                  {formik.errors.username}
                </div>
              ) : null}

              <Input
                type="password"
                label="Password"
                className="mt-3"
                variant="underlined"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-sm font-semibold text-primary">
                  {formik.errors.password}
                </div>
              ) : null}

              <Button
                color="primary"
                radius="sm"
                className="w-full mt-4 font-semibold hover:bg-secondary"
                type="submit"
                isLoading={loading ? true : false}
              >
                Register
              </Button>
              <p className="mt-5 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <span
                  className="font-semibold leading-6 text-black-500 hover:text-red-500 cursor-pointer"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
