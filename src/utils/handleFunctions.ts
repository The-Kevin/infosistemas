export const isKeyOfInterface = <T extends object>(
  key: string,
  obj: T,
): key is Extract<keyof T, string> => {
  return key in obj;
};

export function removeRepeatingKeys(obj1, obj2) {
  const handle = {};

  for (const key in obj1) {
    if (obj2.hasOwnProperty(key)) {
      handle[key] = obj1[key];
    }
  }

  return handle;
}
