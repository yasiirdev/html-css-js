// putSearchlocaton use geoapify to get search lacation coords
export const putSearchLocation = async (searchText) => {
  const NOMINATIM_API = "https://nominatim.openstreetmap.org/search";
  const requestOptions = {
    method: "GET",
  };
  try {
    const resp = await fetch(
      `${NOMINATIM_API}?format=json&q=${encodeURIComponent(searchText)}`,
      requestOptions,
    );
    if (!resp.ok) {
      return;
    }

    const data = await resp.json();

    return {
      lat: data[0].lat,
      lon:data[0].lon,
      name:data[0].display_name, 
    }
    

  } catch (e) {
    console.error(e);
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
    console.log(data);

    const composeData = data.properties.timeseries[0].data.instant.details;

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


        putSearchLocation(`${posit.coords.latitude},${posit.coords.longitude}`).then((obj) => {
          document.getElementById("locationName").innerText = obj.name;
        });
      },
      (error) => {
        console.log(
          `Error code :${error.code} and error massage : ${error.massage}`,
        );
      },
    );
  } else {
    console.log(" User not support the loaction ");
  }
}


// export async function coordsToDetails(l) {
//   const resp = await fetch(
//     `https://api.geoapify.com/v1/geocode/search?text=${l.lat},${l.lon}&lang=en&limit=5&format=json&apiKey=c53bd4b32be34f4e8840232a350dba5f`,
//   );

//   const data = await resp.json();

//   document.getElementById("locationName").innerText =
//     data.results[0].address_line1;
// }
