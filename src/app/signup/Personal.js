"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "10.40.6.135:1501/umroh";
const ENDPOINT = "/user/register";

import Image from "next/image";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";

import { toastSuccess } from "@/components/ToastAlert";
import { toastFailed, toastPending } from "@/components/ToastAlert";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

export default function Personal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      cust_nik: "",
      cust_name: "",
      cust_gender: "",
      cust_birth_place: "",
      cust_birth_date: "",
      cust_hp: "",
      password: "",
      cust_email: "",
      cust_group_id: "",
      cust_position: "",
    },
    validationSchema: Yup.object({
      cust_nik: Yup.string().required("NIK must be required"),
      password: Yup.string()
        .min(2, "Must be 2 characters or more")
        .required("Password must be required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://10.40.6.135:1501/umroh/user/register",
          values,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("success", response);

        toastPending({
          textPending: "Waiting...",
          textSuccess: "Success Login",
        });

        setTimeout(() => {
          router.push("/signup");
        }, 1000);
      } catch (error) {
        console.error(error);
        setTimeout(() => {
          toastFailed({ title: "Register failed" });
          setLoading(false);
        }, 1000);
      }
    },
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* <ToastContainer position="top-center" /> */}
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <Input
                  label="NIK"
                  size="sm"
                  variant="bordered"
                  name="cust_nik"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.cust_nik}
                />
                {formik.touched.cust_nik && formik.errors.cust_nik ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.cust_nik}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Input
                  size="sm"
                  label="Full Name"
                  variant="bordered"
                  name="cust_name"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.cust_name}
                />
                {formik.touched.cust_name && formik.errors.cust_name ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.cust_name}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Select
                  size="sm"
                  label="Gender"
                  name="cust_gender"
                  variant="bordered"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cust_gender}
                >
                  <SelectItem value="L">Laki-laki</SelectItem>
                  <SelectItem value="P">Perempuan</SelectItem>
                </Select>
                {formik.touched.cust_gender && formik.errors.cust_gender ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.cust_gender}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Input
                  size="sm"
                  label="Birth Place"
                  variant="bordered"
                  name="cust_birth_place"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.cust_birth_place}
                />
                {formik.touched.cust_birth_place &&
                formik.errors.cust_birth_place ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.cust_birth_place}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Input
                  size="sm"
                  type="date"
                  label="Birth Date"
                  variant="bordered"
                  name="ccust_birth_date"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.ccust_birth_date}
                />
                {formik.touched.ccust_birth_date &&
                formik.errors.ccust_birth_date ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.ccust_birth_date}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Input
                  size="sm"
                  type="number"
                  label="No HP"
                  variant="bordered"
                  name="cust_hp"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.cust_hp}
                />
                {formik.touched.cust_hp && formik.errors.cust_hp ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.cust_hp}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Input
                  size="sm"
                  type="email"
                  label="Email"
                  variant="bordered"
                  name="cust_email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.cust_email}
                />
                {formik.touched.cust_email && formik.errors.cust_email ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.cust_email}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Input
                  size="sm"
                  type="password"
                  label="Password"
                  variant="bordered"
                  name="password"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Input
                  size="sm"
                  type="number"
                  label="Group ID"
                  variant="bordered"
                  name="cust_group_id"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.cust_group_id}
                />
                {formik.touched.cust_group_id && formik.errors.cust_group_id ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.cust_group_id}
                  </div>
                ) : null}
              </div>

              <div className="col-span-6">
                <Input
                  size="sm"
                  label="Position"
                  variant="bordered"
                  name="cust_position"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.cust_position}
                />
                {formik.touched.cust_position && formik.errors.cust_position ? (
                  <div className="text-sm text-primary font-semibold">
                    {formik.errors.cust_position}
                  </div>
                ) : null}
              </div>
            </div>

            <Button
              color="primary"
              radius="sm"
              className="w-full mt-4 font-semibold hover:bg-secondary"
              type="submit"
            >
              REGISTER
            </Button>
            <p className="mt-5 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <span
                className="font-semibold leading-6 text-black-500 hover:text-red-500 cursor-pointer"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login Now!
              </span>
            </p>
          </form>
        </div>
      </motion.div>
    </>
  );
}
