export const getElementID = (id: string): HTMLElement | any => {
  return document.getElementById(id);
};

export const setTextAreaValue = (id: string, value: string): void => {
  getElementID(id).value = value;
};

export const getTextAreaValue = (id: string): string => {
  return getElementID(id).value;
};

export const addClassToElement = (id: string, className: string): void => {
  getElementID(id).classList.add(className);
};

export const removeClassToElement = (id: string, className: string): void => {
  getElementID(id).classList.remove(className);
};

export const generateList = (id: string, HTML: string): void => {
  getElementID(id).innerHTML = HTML;
};
