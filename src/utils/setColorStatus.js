import { Chip } from "@nextui-org/react";

export default function setColorStatus(e) {
  // e = status data
  let color = "";

  if (
    e == "APPROVED" ||
    e == "ACTIVE" ||
    e == "VERIFIED" ||
    e == "FULL" ||
    e == "TRANSFERRED OUT"
  ) {
    color = "bg-[#007A61]";
  } else if (
    e == "SUBMITTED" ||
    e == "FOR_APPROVAL" ||
    e == "CREATED" ||
    e == "FOR APPROVAL" ||
    e == "FIRST APPROVAL" ||
    e == "FOR_APPROVAL" ||
    e == "SECOND APPROVAL" ||
    e == "PARTIAL" ||
    e == "RECEIVING" ||
    e == "CHANGE ALLOCATION" ||
    e == "FOR ALLOCATION" ||
    e == "FOR BURNING" ||
    e == "TRANSFER-IN" ||
    e == "FOR TRANSFER OUT"
  ) {
    color = "bg-[#F78022]";
  } else if (
    e == "DRAFT" ||
    e == "INCOMPLETE" ||
    e == "MISSING" ||
    e == "SOLD"
  ) {
    color = "bg-[#5B7282]";
  } else if (
    e == "REJECTED" ||
    e == "DEACTIVATED" ||
    e == "BURNED" ||
    e == "DISABLED" ||
    e == "INACTIVE"
  ) {
    color = "bg-[#CF1E30]";
  } else if (
    e == "BARCODING" ||
    e == "GENERATED" ||
    e == "IN TRANSIT" ||
    e == "RECEIVED" ||
    e == "ALLOCATED" ||
    e == "FOUND"
  ) {
    color = "bg-[#1D4ED8]";
  }

  return (
    <Chip
      className="capitalize"
      size="sm"
      variant="light"
      classNames={{
        base: color,
        content: "text-white font-medium text-xs w-max",
      }}
    >
      {e}
    </Chip>
  );
}
