import { useState, useEffect } from "react";

import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Formik, Form, FieldArray } from "formik";
import { motion } from "framer-motion";
import axios from "axios";

import * as Yup from "yup";

import Image from "next/image";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

import { SetColorStatus } from "@/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { genderList } from "./optionList";

const initialValues = {
  items: [
    {
      cust_nik: "",
      cust_name: "",
      cust_gender: "",
      cust_birth_place: "",
      cust_birth_date: "",
      cust_hp: "",
      password: "",
      cust_email: "",
      cust_position: "L",
    },
  ],
};

export default function Personal() {
  const genderOption = [
    { value: "L", label: "Laki-laki" },
    { value: "P", label: "Perempuan" },
  ];

  const router = useRouter();
  const [options, setOptions] = useState([]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://10.40.6.142:1501/umroh/user/register",
        values
      );

      resetForm();
      toast.success("Account Success Created");
      router.push("/signup");
      console.log("Data berhasil dikirim:", response.data);
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
              cust_nik: Yup.string().min(
                3,
                "NIK must be at least 3 characters"
              ),
            })}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <FieldArray name="items">
                  {({ insert, remove, push }) => (
                    <>
                      <div>
                        {props.values.items.length > 0 &&
                          props.values.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-12">
                              <div className="grid grid-cols-12 gap-2 col-span-12">
                                <div className="col-span-12 md:col-span-6">
                                  <Input
                                    isRequired
                                    size="sm"
                                    label="Full Name"
                                    variant="bordered"
                                    name={`items.${index}.cust_name`}
                                    onChange={props.handleChange}
                                    value={item.cust_name}
                                  />
                                </div>

                                <div className="col-span-12 md:col-span-6">
                                  <Input
                                    isRequired
                                    type="number"
                                    size="sm"
                                    label="NIK"
                                    variant="bordered"
                                    name={`items.${index}.cust_nik`}
                                    onChange={props.handleChange}
                                    value={item.cust_nik}
                                  />
                                </div>

                                <div className="col-span-12 md:col-span-6 ">
                                  <Select
                                    isRequired
                                    size="sm"
                                    label="Gender"
                                    variant="bordered"
                                    name={`items.${index}.cust_gender`}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                  >
                                    {genderOption.map((gender) => (
                                      <SelectItem
                                        key={gender.value}
                                        value={gender.value}
                                      >
                                        {gender.label}
                                      </SelectItem>
                                    ))}
                                  </Select>
                                </div>

                                <div className="col-span-12 md:col-span-6 ">
                                  <Input
                                    isRequired
                                    size="sm"
                                    label="Birth Place"
                                    variant="bordered"
                                    name={`items.${index}.cust_birth_place`}
                                    onChange={props.handleChange}
                                    value={item.cust_birth_place}
                                  />
                                </div>

                                <div className="col-span-12 md:col-span-6 ">
                                  <Input
                                    isRequired
                                    type="date"
                                    size="sm"
                                    label="Birth Date"
                                    variant="bordered"
                                    placeholder="Enter your birth date"
                                    name={`items.${index}.cust_birth_date`}
                                    onChange={props.handleChange}
                                    value={item.cust_birth_date}
                                  />
                                </div>

                                <div className="col-span-12 md:col-span-6 ">
                                  <Input
                                    isRequired
                                    type="number"
                                    size="sm"
                                    label="Phone Number"
                                    variant="bordered"
                                    name={`items.${index}.cust_hp`}
                                    onChange={props.handleChange}
                                    value={item.cust_hp}
                                  />
                                </div>

                                <div className="col-span-12 md:col-span-6 ">
                                  <Input
                                    isRequired
                                    type="email"
                                    size="sm"
                                    label="Email"
                                    variant="bordered"
                                    name={`items.${index}.cust_email`}
                                    onChange={props.handleChange}
                                    value={item.cust_email}
                                  />
                                </div>

                                <div className="col-span-12 md:col-span-6 ">
                                  <Input
                                    isRequired
                                    type="password"
                                    size="sm"
                                    label="Password"
                                    variant="bordered"
                                    name={`items.${index}.password`}
                                    onChange={props.handleChange}
                                    value={item.password}
                                  />
                                </div>

                                {/* <div className="col-span-12 md:col-span-6 invisible ">
                                  <Input
                                    isRequired
                                    size="sm"
                                    label="Position"
                                    variant="bordered"
                                    name={`items.${index}.cust_position`}
                                    onChange={props.handleChange}
                                    value={item.cust_position}
                                  />
                                </div> */}
                              </div>
                            </div>
                          ))}
                      </div>
                    </>
                  )}
                </FieldArray>

                <Button
                  color="primary"
                  radius="sm"
                  className="w-full mt-4 font-semibold hover:bg-secondary"
                  onPress={() => {
                    props.handleSubmit();
                  }}
                >
                  Register
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
              </Form>
            )}
          </Formik>
        </motion.div>
      </>
    </div>
  );
}
