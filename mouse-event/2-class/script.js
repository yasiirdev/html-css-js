
const rect = document.getElementById("rect");

window.addEventListener("mousemove", (e) => {
    const mapVal = gsap.utils.mapRange(
      0,
      window.innerWidth,
      100 + rect.getBoundingClientRect().width / 2,
      window.innerWidth - (100 + rect.getBoundingClientRect().width / 2),
      e.clientX,
    );

    gsap.to(rect, {
              left:mapVal, 
          })
});
