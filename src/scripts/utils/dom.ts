export const getElementID = (id: string): HTMLElement => {
  return document.getElementById(id);
};

export const setTextAreaValue = (id: string, value: string): void => {
  const el: any = getElementID(id);
  el.value = value;
};

export const getTextAreaValue = (id: string): string => {
  const el: any = getElementID(id);
  return el.value;
};

export const addClassToElement = (id: string, className: string): void => {
  getElementID(id).classList.add(className);
};

export const removeClassToElement = (id: string, className: string): void => {
  getElementID(id).classList.remove(className);
};

export const innerHTMLElement = (id: string, HTML: string): void => {
  getElementID(id).innerHTML = HTML;
};
