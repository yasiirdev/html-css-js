const throttle = (f,d) => {   // f donates function & d donates delay
    let prve = 0;
    return (...args) => {
        let now = new Date().getTime();
        if (now - prve > d) {
            now = prve;
            return f(...args);
        }
    }
}


throttle(() => {
  console.log("yes its working");
},200)