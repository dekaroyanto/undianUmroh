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
import { Formik, Form, FieldArray, useFormik } from "formik";

import { toastSuccess } from "@/components/ToastAlert";
import { toastFailed, toastPending } from "@/components/ToastAlert";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

export default function Personal() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      items: [
        {
          cust_nik: "",
          cust_name: "",
          member_phone: "",
          member_name: "",
        },
      ],
    },
    validationSchema: Yup.object({
      items: Yup.array().of(
        Yup.object().shape({
          cust_nik: Yup.string().required("NIK must be required"),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `http://${BASE_URL}${ENDPOINT}`,
          { items: values.items },
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
            {formik.values.items.map((item, index) => (
              <div key={index} className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Input
                    label="NIK"
                    size="sm"
                    variant="bordered"
                    name={`items.${index}.cust_nik`}
                    placeholder="Enter your NIK"
                    onChange={formik.handleChange}
                    value={item.cust_nik}
                  />
                  {formik.touched.items &&
                    formik.touched.items[index] &&
                    formik.errors.items &&
                    formik.errors.items[index] &&
                    formik.errors.items[index].cust_nik && (
                      <div className="text-sm text-primary font-semibold">
                        {formik.errors.items[index].cust_nik}
                      </div>
                    )}
                </div>

                <div className="col-span-6">
                  <Input
                    label="Full Name"
                    size="sm"
                    variant="bordered"
                    name={`items.${index}.cust_name`}
                    placeholder="Enter your NIK"
                    onChange={formik.handleChange}
                    value={item.cust_name}
                  />
                  {formik.touched.items &&
                    formik.touched.items[index] &&
                    formik.errors.items &&
                    formik.errors.items[index] &&
                    formik.errors.items[index].cust_name && (
                      <div className="text-sm text-primary font-semibold">
                        {formik.errors.items[index].cust_name}
                      </div>
                    )}
                </div>
              </div>
            ))}

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
