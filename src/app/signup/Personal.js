"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "10.40.6.135:1501/umroh";
const ENDPOINT = "/user/register";

import Image from "next/image";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";

import { Formik, Form, FieldArray, useFormik, ErrorMessage } from "formik";

import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

export default function Personal() {
  const initialValues = {
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
  };

  const validationSchema = Yup.object().shape({
    cust_nik: Yup.string().required("Required"),
    cust_name: Yup.string().required("Required"),
    cust_gender: Yup.string().required("Required"),
    cust_birth_place: Yup.string().required("Required"),
    cust_birth_date: Yup.date().required("Required"),
    cust_hp: Yup.string().required("Required"),
    password: Yup.string().min(8).required("Required"),
    cust_email: Yup.string().email().required("Required"),
    cust_group_id: Yup.string().required("Required"),
    cust_position: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
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

  return (
    <div>
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            product_code: Yup.number().required(
              "product code must be required"
            ),
            product_desc: Yup.string().required(
              "product description must be required"
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
            unit_cost: Yup.number().required("unit cost must be required"),
          })}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <div className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Input
                    isRequired
                    type="number"
                    size="sm"
                    label="NIK"
                    name="cust_nik"
                    variant="bordered"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.cust_nik}
                  />
                  {props.touched.cust_nik && props.errors.cust_nik ? (
                    <div className="text-sm text-primary font-semibold">
                      {props.errors.cust_nik}
                    </div>
                  ) : null}
                </div>
                <div className="col-span-6">
                  <Input
                    isRequired
                    size="sm"
                    label="Full Name"
                    name="cust_name"
                    variant="bordered"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.cust_name}
                  />
                  {props.touched.cust_name && props.errors.cust_name ? (
                    <div className="text-sm text-primary font-semibold">
                      {props.errors.cust_name}
                    </div>
                  ) : null}
                </div>

                <div className="col-span-6">
                  <Select
                    label="Gender"
                    size="sm"
                    name="cust_gender"
                    variant="bordered"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.cust_gender}
                  >
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </Select>
                  {props.touched.cust_gender && props.errors.cust_gender ? (
                    <div className="text-sm text-primary font-semibold">
                      {props.errors.cust_gender}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="mt-4">
                <Button type="submit" disabled={props.isSubmitting}>
                  Register
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    </div>
  );
}
