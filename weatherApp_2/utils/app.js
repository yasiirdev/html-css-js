
// putSearchlocaton use geoapify to get search lacation coords
export const putSearchLocation = async (searchText) => {
  const requestOptions = {
    method: "GET",
  };
  try {
    const resp = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${searchText}&apiKey=c53bd4b32be34f4e8840232a350dba5f`,
      requestOptions,
    );
    if (!resp.ok) {
        return;
    }

    const data = await resp.json();
    return {
      lat: data.features[0].properties.lat,
      lon: data.features[0].properties.lon,
    };


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

    const data = await resp.json()
      
    const currData = data.properties.timeseries[0].data.instant.details;

    const currUserData = {
      temperature : currData.dew_point_temperature,
      feelsTemperature: currData.air_temperature,
      windSpeed: currData.wind_speed,
      humidity: currData.relative_humidity,
      pressure: currData.air_pressure_at_sea_level,
      rain: currData.cloud_area_fraction,
    };

    document.getElementById("tem").innerText = currUserData.temperature;         
    document.querySelectorAll(".feeltem").forEach(ft => ft.innerText = currUserData.feelsTemperature);

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
        
     coordsToDetails({
       lat: posit.coords.latitude,
       lon: posit.coords.longitude,
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



export async function coordsToDetails(l) {
  const resp = await fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${l.lat},${l.lon}&lang=en&limit=5&format=json&apiKey=c53bd4b32be34f4e8840232a350dba5f`,
  );

  const data = await resp.json();

  document.getElementById("locationName").innerText =
    data.results[0].address_line1;

}
  