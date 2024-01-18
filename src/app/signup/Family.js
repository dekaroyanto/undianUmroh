import { useState, useEffect } from "react";

import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Formik, Form, FieldArray } from "formik";
import axios from "axios";

import * as Yup from "yup";

import Image from "next/image";
import DeleteIcon from "@/assets/icons/trash-icon.svg";

import { SetColorStatus } from "@/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  group_name: "",
  items: [
    {
      member_phone: "",
      member_name: "",
      cust_email: "",
    },
  ],
};

export default function Family() {
  const router = useRouter();
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
                  name="group_name"
                  placeholder="Enter your group name"
                  onChange={props.handleChange}
                  value={props.values.group_name}
                />
                {props.touched.group_name && props.errors.group_name ? (
                  <div className="text-sm text-primary font-semibold">
                    {props.errors.group_name}
                  </div>
                ) : null}
              </div>

              <FieldArray name="items">
                {({ insert, remove, push }) => (
                  <>
                    <div className="grid grid-cols-12 mt-3">
                      <div className="grid grid-cols-8 gap-3 col-span-12 rounded-md bg-primary py-2 px-4 text-white font-semibold">
                        <p className="col-span-4 capitalize font-medium">
                          Member Name
                        </p>
                      </div>
                    </div>

                    <div className="max-h-64 overflow-auto">
                      {props.values.items.length > 0 &&
                        props.values.items.map((item, index) => (
                          <div
                            key={index}
                            className="border grid grid-cols-12 mb-2 p-2"
                          >
                            <div className="grid grid-cols-12 gap-2 col-span-12">
                              <Input
                                isRequired
                                size="sm"
                                label="Member Name"
                                variant="bordered"
                                className="col-span-6"
                                name={`items.${index}.member_name`}
                                onChange={props.handleChange}
                                value={item.member_name}
                              />

                              {index === 0 ? (
                                <Input
                                  className="col-span-6"
                                  type="number"
                                  size="sm"
                                  label="Member Phone"
                                  name={`items.${index}.member_phone`}
                                  variant="bordered"
                                  isRequired
                                  onChange={props.handleChange}
                                  value={item.member_phone}
                                />
                              ) : (
                                <div className="col-span-6 invisible">
                                  <Input
                                    type="number"
                                    size="sm"
                                    name={`items.${index}.member_phone`}
                                    value={item.member_phone}
                                    onChange={props.handleChange}
                                  />
                                </div>
                              )}
                            </div>

                            <div className="flex justify-start items-center col-span-12 mt-2">
                              <Button
                                type="button"
                                color="primary"
                                className="secondary"
                                onClick={() =>
                                  push({
                                    member_name: "",
                                    member_phone: "",
                                  })
                                }
                              >
                                Add Member
                              </Button>

                              <div className="pl-2">
                                <Button
                                  color="primary"
                                  type="button"
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  Remove Member
                                </Button>
                              </div>
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
