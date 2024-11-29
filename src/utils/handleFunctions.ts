export const isKeyOfInterface = <T extends object>(
  key: string,
  obj: T,
): key is Extract<keyof T, string> => {
  return key in obj;
};
