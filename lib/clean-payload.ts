const FORBIDDEN_KEYS = [
  "itemId",
  "itemCreatedWhen",
  "itemModifiedWhen",
  "itemGuid",
  "proposalFiles",
  "file",
];

export const cleanPayload = (data: any): any => {
  if (Array.isArray(data)) {
    if (data.length === 0) return undefined;
    const cleanedArray = data
      .map((item) => cleanPayload(item))
      .filter((item) => item !== undefined && item !== null);
    return cleanedArray.length > 0 ? cleanedArray : undefined;
  }

  if (data !== null && typeof data === "object") {
    const cleanedObj: any = {};
    Object.keys(data).forEach((key) => {
      if (FORBIDDEN_KEYS.includes(key)) return;

      const value = cleanPayload(data[key]);
      if (value !== undefined && value !== null) {
        cleanedObj[key] = value;
      }
    });

    if (Object.keys(cleanedObj).length === 0) return undefined;
    return cleanedObj;
  }
  if (data === null || data === "") return undefined;

  return data;
};
