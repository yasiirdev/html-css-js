// putSearchlocaton use geoapify to get search lacation coords
export const putSearchLocation = async (searchText) => {
  const resp = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchText)}`,
  );

  try {
    if (!resp.ok) {
      return;
    }

    const data = await resp.json();

    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      display_name: data[0].display_name.slice(0, 10),
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
    const timeseries = Array.isArray(data?.properties?.timeseries)
      ? data.properties.timeseries.slice(0, 12)
      : [];

    const Hourly = timeseries
      .map((dt) => {
        const time = new Date(dt.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const temperature =
          dt.data.next_6_hours?.details?.air_temperature_max ??
          dt.data.instant.details.air_temperature;
        const precipitation =
          dt.data.next_6_hours?.details?.precipitation_amount ?? 0;
        const icon = precipitation > 0 ? "🌧️" : "☀️";

        return `<div class="rounded-2xl border border-slate-800 bg-slate-800/70 p-3 text-center">
                        <p class="text-sm text-slate-400">${time}</p>
                        <p class="mt-2 text-2xl font-semibold">${temperature}°</p>
                        <p class="mt-2 text-2xl">${icon}</p>
                    </div>`;
      })
      .join("");

    document.getElementById("weatherInfo").innerHTML = Hourly;
    
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
        putSearchLocation(
          `${posit.coords.latitude},${posit.coords.longitude}`,
        ).then((obj) => {
          document.getElementById("locationName").innerText = obj.display_name;
        });
      },
      (error) => {
        throw error;
      },
    );
  } else {
    console.log(" User not support the loaction ");
  }
}
