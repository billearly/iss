export const debounce = (func, wait) => {
  let timeout;

  return function() {
    const delayedFunction = () => {
      return func.apply(this, arguments);
    };

    clearTimeout(timeout);

    timeout = setTimeout(delayedFunction, wait);
  }
};