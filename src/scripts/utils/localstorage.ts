const USEFUL_BASE64 = 'useful-base64';

export const getItems = (): string[] => {
  const items = localStorage.getItem(USEFUL_BASE64);
  return items ? items.split('///') : [];
};

export const setItems = (obj: string[]): void => {
  localStorage.setItem(USEFUL_BASE64, obj.join('///'));
};

export const clearItems = (): void => {
  localStorage.removeItem(USEFUL_BASE64);
};
