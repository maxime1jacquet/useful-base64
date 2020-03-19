export const serialize = (obj: string): string => {
  try {
    return btoa(obj);
  } catch (e) {
    return '';
  }
};

export const deserialize = (obj: string): any => {
  try {
    return atob(obj);
  } catch (e) {
    return null;
  }
};
