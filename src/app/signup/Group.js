import { useState, useEffect } from "react";

import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { Formik, Form, FieldArray } from "formik";
import axios from "axios";

import * as Yup from "yup";

import Image from "next/image";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

import { SetColorStatus } from "@/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  cust_nik: "",
  cust_name: "",
  cust_gender: "",
  cust_birth_place: "",
  cust_birth_date: "",
  cust_hp: "",
  password: "",
  cust_email: "",
  cust_group_name: "",
  cust_position: "L",
  items: [
    {
      member_phone: "",
      member_name: "",
    },
  ],
};

export default function Family({
  isOpen,
  onOpenChange,
  size,
  onClose,
  onSuccess,
}) {
  const [options, setOptions] = useState([]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://10.40.6.135:1501/umroh/user/register",
        values
      );

      resetForm();
      toast.success("Gift Card Success Created");
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
            cust_nik: Yup.string().min(3, "NIK must be at least 3 characters"),
          })}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <Form>
              <div className="col-span-12 mb-3">
                <Input
                  size="sm"
                  label="Group Name"
                  variant="bordered"
                  name="cust_group_name"
                  placeholder="Enter your email"
                  onChange={props.handleChange}
                  value={props.values.cust_group_name}
                />
                {props.touched.cust_group_name &&
                props.errors.cust_group_name ? (
                  <div className="text-sm text-primary font-semibold">
                    {props.errors.cust_group_name}
                  </div>
                ) : null}
              </div>
              <div className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Input
                    label="NIK"
                    size="sm"
                    variant="bordered"
                    name="cust_nik"
                    placeholder="Enter your email"
                    onChange={props.handleChange}
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
                    size="sm"
                    label="Full Name"
                    variant="bordered"
                    name="cust_name"
                    placeholder="Enter your group name"
                    onChange={props.handleChange}
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
                    size="sm"
                    label="Gender"
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

                <div className="col-span-6">
                  <Input
                    size="sm"
                    label="Birth Place"
                    variant="bordered"
                    name="cust_birth_place"
                    placeholder="Enter your email"
                    onChange={props.handleChange}
                    value={props.values.cust_birth_place}
                  />
                  {props.touched.cust_birth_place &&
                  props.errors.cust_birth_place ? (
                    <div className="text-sm text-primary font-semibold">
                      {props.errors.cust_birth_place}
                    </div>
                  ) : null}
                </div>

                <div className="col-span-6">
                  <Input
                    size="sm"
                    type="date"
                    label="Birth Date"
                    variant="bordered"
                    name="cust_birth_date"
                    placeholder="Enter your email"
                    onChange={props.handleChange}
                    value={props.values.cust_birth_date}
                  />
                  {props.touched.cust_birth_date &&
                  props.errors.cust_birth_date ? (
                    <div className="text-sm text-primary font-semibold">
                      {props.errors.cust_birth_date}
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
                    onChange={props.handleChange}
                    value={props.values.cust_hp}
                  />
                  {props.touched.cust_hp && props.errors.cust_hp ? (
                    <div className="text-sm text-primary font-semibold">
                      {props.errors.cust_hp}
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
                    onChange={props.handleChange}
                    value={props.values.cust_email}
                  />
                  {props.touched.cust_email && props.errors.cust_email ? (
                    <div className="text-sm text-primary font-semibold">
                      {props.errors.cust_email}
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
                    onChange={props.handleChange}
                    value={props.values.password}
                  />
                  {props.touched.password && props.errors.password ? (
                    <div className="text-sm text-primary font-semibold">
                      {props.errors.password}
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
                    onChange={props.handleChange}
                    value={props.values.cust_position}
                  />
                  {props.touched.cust_position && props.errors.cust_position ? (
                    <div className="text-sm text-primary font-semibold">
                      {props.errors.cust_position}
                    </div>
                  ) : null}
                </div>
              </div>

              <FieldArray name="items">
                {({ insert, remove, push }) => (
                  <>
                    <div className="grid grid-cols-12 mt-3">
                      <div className="grid grid-cols-8 gap-3 col-span-11 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                        <p className="col-span-4 capitalize font-medium">
                          Member Name
                        </p>
                        <p className="col-span-4 capitalize font-medium">
                          Member Phone
                        </p>
                      </div>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() =>
                          push({
                            member_name: "",
                            member_phone: "",
                          })
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="max-h-64 overflow-auto">
                      {props.values.items.length > 0 &&
                        props.values.items.map((item, index) => (
                          <div key={index} className="grid grid-cols-12 mb-2">
                            <div className="grid grid-cols-8 gap-2 col-span-11">
                              <Input
                                isRequired
                                size="sm"
                                label="Member Name"
                                variant="bordered"
                                className="col-span-4"
                                name={`items.${index}.member_name`}
                                onChange={props.handleChange}
                                value={item.member_name}
                              />

                              <Input
                                className="col-span-4"
                                type="number"
                                size="sm"
                                label="Member Phone"
                                name={`items.${index}.member_phone`}
                                variant="bordered"
                                isRequired
                                onChange={props.handleChange}
                                value={item.member_phone}
                              />
                            </div>

                            <div className="flex justify-center items-center">
                              <button
                                type="button"
                                onClick={() => {
                                  remove(index);
                                }}
                              >
                                <Image
                                  className="cursor-pointer"
                                  src={DeleteIcon}
                                  alt="icon"
                                />
                              </button>
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
      </>
    </div>
  );
}
