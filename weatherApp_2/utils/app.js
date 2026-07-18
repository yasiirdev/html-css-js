// putSearchlocaton use geoapify to get search lacation coords
export const putSearchLocation = async (searchText) => {
console.log(searchText);

  const resp = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${searchText}&lang=en&limit=5&format=json&apiKey=c53bd4b32be34f4e8840232a350dba5f`,
  );


  try {
    if (!resp.ok) {
      return;
    }

    const data = await resp.json();
      console.log("data", data);

    return {
      lat: data.results[0].lat,
      lon: data.results[0].lon,
      name: data.results[0].address_line1,
    };

  } catch (e) {
    console.error(e);
    throw error;
  }
};

// getWeatherDetails  get a param location object that contains coords lat , lon
export const getWeatherDetails = async (location) => {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${location.lat}&lon=${location.lon}`;
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "weather-dashboard/1.0",
      },
    });

    if (!resp.ok) throw new Error(resp.status);

    const data = await resp.json();
    data.properties.timeseries.slice(0, 12).map((dt) => {
      const obj = {
        time: new Date(dt.time).toLocaleTimeString(),
        temperature: dt.data.next_6_hours.details.air_temperature_max,
        precipitation: dt.data.next_6_hours.details.precipitation_amount,
      };

      const weatherInfo = document.getElementById("weatherInfo").innerText =
        `<div class="rounded-2xl border border-slate-800 bg-slate-800/70 p-3 text-center">
                        <p class="text-sm text-slate-400">${obj.time}</p>
                        <p class="mt-2 text-2xl font-semibold">${obj.temperature}°</p>
                        <p class="mt-2 text-2xl">☀️</p>
                    </div>`
    });

    const composeData = data.properties.timeseries[0].data.instant.details;
    //  console.log(data);

    const currUserData = {
      temperature: composeData.dew_point_temperature,
      feelsTemperature: composeData.air_temperature,
      windSpeed: composeData.wind_speed,
      humidity: composeData.relative_humidity,
      pressure: composeData.air_pressure_at_sea_level,
      rain: composeData.cloud_area_fraction,
    };

    document
      .querySelectorAll(".tem")
      .forEach((t) => (t.innerText = currUserData.temperature));

    document
      .querySelectorAll(".feeltem")
      .forEach((ft) => (ft.innerText = currUserData.feelsTemperature));

    document.getElementById("humidity").innerText = currUserData.humidity;
    document.getElementById("windspeed").innerText = currUserData.windSpeed;
    document.getElementById("pressure").innerText =
      `${currUserData.pressure} hPa`;

    const next_hour = data.properties.timeseries[0].data.next_1_hours;
  } catch (e) {
    console.error(e);
  }
};

// browserLocationAccess use native api to get user browser location
export function browserLocationAccess() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (posit) => {

        getWeatherDetails({
          lat: posit.coords.latitude,
          lon: posit.coords.longitude,
        });

        console.log(posit.coords.latitude,"k",posit.coords.longitude);
        
        putSearchLocation(
          `${posit.coords.latitude},${posit.coords.longitude}`,
        ).then(
          (obj) =>document.getElementById("locationName").innerText = obj.name
        );
      },
      (error) => {
        throw error;
      },
    );
  } else {
    console.log(" User not support the loaction ");
  }
}
