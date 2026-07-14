import {
  browserLocationAccess,
  getWeatherDetails,
  putSearchLocation,
} from "./utils/app.js";

class weather {
  constructor() {
    this.searchFeild = document.getElementById("location");
    this.button = document.getElementById("submitBtu");
    this.setupStartingEvent();
  }

  setupStartingEvent() {
    browserLocationAccess()
    this.button.addEventListener("click", (e) => {
      e.preventDefault();
      const val = this.searchFeild.value.trim();
      putSearchLocation(val).then((obj) => {
        document.getElementById("locationName").innerText = obj.name;
        getWeatherDetails(obj);
      });
    });
  }
}

window.document.addEventListener("DOMContentLoaded", () => {
  new weather();
});
