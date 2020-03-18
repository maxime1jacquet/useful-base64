export const encode = (obj: any): string => {
  // return btoa(JSON.stringify(obj));
  try {
    btoa(JSON.stringify(obj));
  } catch (e) {
    return '';
  }
};

export const decode = (obj: string): any => {
  try {
    return JSON.parse(atob(obj));
  } catch (e) {
    return null;
  }
};
