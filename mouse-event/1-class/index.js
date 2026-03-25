const rect = document.querySelector(".rectangle");

rect.addEventListener("mousemove", function (e) {
  const rectBoundLocation = rect.getBoundingClientRect();
  const pointInsideRect = e.clientX - rectBoundLocation.x;

  if (pointInsideRect < rectBoundLocation.width / 2) {
    const mapVal = gsap.utils.mapRange(
      0,
      rectBoundLocation.width / 2,
      255,
      0,
      pointInsideRect,
    );

    gsap.to(rect, {
      backgroundColor: `rgb(0,${mapVal} , 0)`,
    });
  } else {
    const mapVal = gsap.utils.mapRange(
      rectBoundLocation.width / 2,
      rectBoundLocation.width,
      0,
      255,
      pointInsideRect,
    );

    gsap.to(rect, {
      backgroundColor: `rgb(0,0,${mapVal})`,
    });
  }
});

rect.addEventListener("mouseleave", function () {
  gsap.to(rect, {
    backgroundColor: "white",
  });
});
