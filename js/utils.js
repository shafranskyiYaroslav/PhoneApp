const utils = {
  debounce,
};

export default utils;

export function debounce(f, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      f.call(this, ...args);
    }, delay);
  };
}