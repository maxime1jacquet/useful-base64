export const getElementID = (id: string): HTMLElement | any => {
  return document.getElementById(id);
};

export const setTextAreaValue = (id: string, value: string): void => {
  getElementID(id).value = value;
};
export const getTextAreaValue = (id: string): string => {
  return getElementID(id).value;
};
