import { UploadedFileRecord } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { FieldErrors } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toStr = (val: any) =>
  val === null || val === undefined ? "" : val;

export const mapIdentity = (d: any) => {
  if (!d) return {};
  return {
    ...d,
    type: toStr(d.type),
    no: toStr(d.no),
    issuedBy: toStr(d.issuedBy),
    issuedProvince: toStr(d.issuedProvince),
  };
};

export const mapAddress = (a: any) => {
  if (!a) return {};
  return {
    ...a,
    province: toStr(a.province),
    no: toStr(a.no),
    moo: toStr(a.moo),
    village: toStr(a.village),
    road: toStr(a.road),
    district: toStr(a.district),
    subDistrict: toStr(a.subDistrict),
    postalCode: toStr(a.postalCode),
    // Extended fields
    tel: toStr(a.tel),
    fax: toStr(a.fax),
    email: toStr(a.email),
    webSite: toStr(a.webSite),
  };
};

export const mapPerson = (p: any) => {
  if (!p) return {};
  return {
    ...p,
    prefix: toStr(p.prefix),
    firstname: toStr(p.firstname),
    lastname: toStr(p.lastname),
    position: toStr(p.position),
    tel: toStr(p.tel),
    fax: toStr(p.fax),
    email: toStr(p.email),
    nationality: toStr(p.nationality),
    identityDocument: mapIdentity(p.identityDocument),
    address: mapAddress(p.address),
  };
};

export function getFormError(
  errors: FieldErrors,
  name: string,
  prefix?: string,
): string | undefined {
  if (!errors) return undefined;

  const fullPath = prefix ? `${prefix}.${name}` : name;

  const errorObj = fullPath.split(".").reduce((obj, key) => {
    return (obj as any)?.[key];
  }, errors);

  return (errorObj as any)?.message as string | undefined;
}

export const viewFile = (file: UploadedFileRecord) => {
  if (!file.itemId) return;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  const downloadUrl = `${apiUrl}/files/${file.itemId}/download`;
  window.open(downloadUrl, "_blank");
};
