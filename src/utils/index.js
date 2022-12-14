export * from './constants';

export const setItemInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error('Can not store is LS');
  }
  const valueToStorage =
    typeof value !== 'string' ? JSON.stringify(value) : value;

  localStorage.setItem(key, valueToStorage);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Can not get value in the LS');
  }
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Can not store in the LS');
  }
  localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];


  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};
