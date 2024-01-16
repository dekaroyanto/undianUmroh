import React from "react";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";

export default function searchForm({ schema }) {
  return (
    <div className="flex w-full h-min bg-[#e0e0e0] rounded-xl py-5 px-14 mb-6">
      {/* <div className="md:flex gap-6 items-end mb-2"> */}
      <h1 className="self-start pt-1 text-right font-medium min-w-max mr-4">
        SEARCH BY:{" "}
      </h1>

      <div className="w-full grid grid-cols-8 gap-4 gap-y-4">
        {schema?.map((e, i) => {
          if (e.component == "text" || e.component == "date") {
            return (
              <div key={i} className={`col-span-${e.colSpan}`}>
                <Input
                  // label={e.label}
                  aria-label={e.label}
                  placeholder={e.label}
                  type={e.component}
                  labelPlacement="outside"
                  isClearable={e.isClear ? true : false}
                  size="sm"
                  name={e.field}
                  // value={searchForm}
                  // onValueChange={setSearchForm}
                />
              </div>
            );
          }

          if (e.component == "select") {
            return (
              <div key={i} className={`col-span-${e.colSpan}`}>
                <Select
                  // label={e.label}
                  aria-label={e.label}
                  placeholder={e.label}
                  labelPlacement="outside"
                  size="sm"
                  name={e.field}
                  classNames={{
                    label: ["min-w-[5rem]"],
                    innerWrapper: "max-w-max",
                    listboxWrapper: "",
                  }}
                  // onSelectionChange={setRequest}
                  // selectedKeys={request}
                >
                  {e?.data?.map((e) => (
                    <SelectItem key={e.value} value={e.value}>
                      {e.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            );
          }

          if (e.component == "button") {
            return (
              <>
                <Button
                  color="primary"
                  className="col-auto self-end hover:bg-secondary font-semibold"
                  size="sm"
                >
                  Search
                </Button>

                <Button
                  className="col-auto self-end outline outline-1 outline-[#aaa] font-semibold"
                  size="sm"
                  // onClick={clearInput}
                >
                  Reset
                </Button>
              </>
            );
          }
        })}
      </div>
    </div>
  );
}
