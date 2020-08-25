export const serialize = (obj: string): string => {
  try {
    return window.btoa(unescape(encodeURIComponent(obj)));
    // return btoa(obj);
  } catch (e) {
    return '';
  }
};

export const deserialize = (obj: string): any => {
  try {
    return decodeURIComponent(escape(window.atob(obj)));
    // return atob(obj);
  } catch (e) {
    return null;
  }
};
