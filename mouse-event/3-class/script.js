function throttlefunc(func, delay) {
  let prevVal = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - prevVal > delay) {
      prevVal = now;
      return func(...args);
    }
  };
}
const h1 = document.querySelector("h1");
const rect = document.getElementById("rect");
rect.addEventListener(
  "mousemove",
  throttlefunc((e) => {
    const rectBoundLocation = rect.getBoundingClientRect();
    const pointXAxis = e.clientX - rectBoundLocation.x;
    const pointYAxis = e.clientY - rectBoundLocation.y;

    const div = document.createElement("div");
    div.setAttribute("class", "squ");
    div.style.top = pointYAxis + "px";
    div.style.left = pointXAxis + "px";

    document.body.appendChild(div);
    const img = document.createElement("img");
    img.setAttribute("src", "./images.jpeg");
    div.appendChild(img);

    gsap.to(img, {
      y: 0,
      duration: 0.5,
      ease: "expo.out",
      yoyo:true
    });

    gsap.to(img, {
      y: 100,
      delay: 0.4,
      duration: 0.6,
      ease:"expo.out",
      yoyo: true,
    });

    setTimeout(() => {
      div.remove();
    }, 600);
  }, 150),
);
