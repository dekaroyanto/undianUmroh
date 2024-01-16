"use client";

import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";

import { useFormik, Formik, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

import ImageNext from "next/image";
import Icon from "/src/assets/icons/logo-1.png";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { toastFailed, toastPending } from "@/components/ToastAlert";
import { motion, AnimatePresence } from "framer-motion";
import "./signup.css";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Personal");

  const initialValues = {
    // id: getGenerateId(),
    nik: "",
    full_name: "",
    face_value: "",
    // card_fee: 0,
    // max_amount: 0,
    // effective_months: 0,
    // unit_cost: 0,
    business_unit: [
      {
        value: "",
      },
    ],
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Kirim data ke API
      const response = await axios.post(`${BASE_URL}${ENDPOINT}`, values);

      resetForm();
      toast.success("Account Success Created");
      console.log("Data berhasil dikirim:", response.data);
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      toast.error("Gagal menambahkan data.");
    } finally {
      setSubmitting(false);
    }
  };

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
          <div className="w-full">
            <h1 className="w-full text-3xl font-bold text-center text-slate-400 mt-5">
              Register
            </h1>

            <div className="flex justify-between mt-4">
              <Button
                variant={activeTab === "Personal" ? "flat" : "light"}
                className={`tab ${
                  activeTab === "Personal" ? "active-tab" : ""
                } rounded`}
                onClick={() => {
                  setActiveTab("Personal");
                  props.resetForm();
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
                  // props.resetForm();
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
                } rounded`}
                onClick={() => {
                  setActiveTab("Group");
                  // props.resetForm();
                }}
                fullWidth
              >
                Group
                {activeTab === "Group" && <div className="underline"></div>}
              </Button>
            </div>
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  nik: Yup.number().required("NIK code must be required"),
                  full_name: Yup.string().required(
                    "Full name must be required"
                  ),
                  face_value: Yup.string().nullable(),
                  card_fee: Yup.number()
                    .nullable()
                    .moreThan(-1, "card fee must be less than 0"),
                  max_amount: Yup.number()
                    .nullable()
                    .moreThan(-1, "max amount must be less than 0"),
                  effective_months: Yup.number()
                    .nullable()
                    .moreThan(-1, "effective month must be less than 0"),
                  unit_cost: Yup.number().required(
                    "unit cost must be required"
                  ),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  handleSubmit(values, { setSubmitting, resetForm });
                }}
              >
                {(props) => (
                  <form className="mt-5">
                    {activeTab === "Personal" && (
                      <div className="w-full grid grid-cols-12 gap-4">
                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            type="number"
                            label="Product Code"
                            name="nik"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.nik}
                          />
                          {props.touched.nik && props.errors.nik ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.nik}
                            </div>
                          ) : null}
                        </div>

                        <div className="col-span-6">
                          <Input
                            isRequired
                            size="sm"
                            label="Full Name"
                            name="full_name"
                            variant="bordered"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.full_name}
                          />
                          {props.touched.full_name && props.errors.full_name ? (
                            <div className="text-sm text-primary font-semibold">
                              {props.errors.full_name}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                    {activeTab === "Family" && <></>}

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
                )}
              </Formik>
            </>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
