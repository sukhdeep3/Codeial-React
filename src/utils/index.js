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
    return console.error('Can not get value from LS');
  }
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Can not stoe is LS');
  }
  localStorage.removeItem(key);
};

export const getFormBody = (params) => {
  let formBody = [];

  //   console.log('property', params);

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + '=' + encodedValue);
  }
  return formBody.join('&');
};
