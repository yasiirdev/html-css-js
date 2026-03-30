const debounce = (func, delay) => {
  let timeOut = undefined;
  return (...args) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
        func(...args);
    }, delay);
  };
};

debounce(() => {
    console.log("good");
},200);
