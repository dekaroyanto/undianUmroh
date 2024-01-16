import { useFormikContext } from "formik";
import React from "react";

const ResetButton = () => {
  const { resetForm } = useFormikContext();
  const { activeTab } = useFormikContext();

  useEffect(() => {
    resetForm();
  }, [activeTab]);

  return null;
};

export default ResetButton;
