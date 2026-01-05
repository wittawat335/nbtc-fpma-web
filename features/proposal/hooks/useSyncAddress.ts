import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export const useSyncAddress = () => {
  const { setValue, control } = useFormContext();

  const sameContactAddress = useWatch({
    control,
    name: "contactAddress.isCheck",
  });
  
  const projectAddress = useWatch({ control, name: "projectAddress" });

  useEffect(() => {
    if (sameContactAddress && projectAddress) {
      const fields = [
        "no",
        "moo",
        "village",
        "road",
        "subDistrict",
        "district",
        "province",
        "postalCode",
        "tel",
        "fax",
        "email",
        "webSite",
      ] as const;

      fields.forEach((field) => {
        setValue(`contactAddress.${field}`, projectAddress[field] || "");
      });
    }
  }, [sameContactAddress, projectAddress, setValue]);

  return { sameContactAddress };
};