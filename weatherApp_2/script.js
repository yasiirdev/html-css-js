import { browserLocationAccess, coordsToDetails, getWeatherDetails, putSearchLocation } from "./utils/app.js";

class weather {
    constructor() {
        this.searchFeild = document.getElementById("location")
        this.button = document.getElementById("submitBtu");
        this.setupStartingEvent()
    }
        

    setupStartingEvent() {
        this.button.addEventListener('click', () => {
            const val = this.searchFeild.value.trim();
            putSearchLocation(val).then(obj => {
                coordsToDetails(obj);
                getWeatherDetails(obj);
            })
               
        })
        
    
    }
 



}

window.document.addEventListener("DOMContentLoaded", () => {
            new weather();
})


