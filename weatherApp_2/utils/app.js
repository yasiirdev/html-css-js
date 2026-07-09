const getC_location = async (lat, lon) => {
  const url = `https://api.met.no/weatherapi/locationforecast/2.0/complete?lat=${lat}&lon=${lon}`;
  
  try {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": "weather-dashboard/1.0",
      },
    });

    if (!resp.ok) {
      return new Error("Api request problem ");
    }
    return resp.json();
  } catch (e) {
     console.log(e);
     
  } 
  
    
};

export function userLive_geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (posit) => {
        // const location = {
        //   lat: posit.coords.latitude,
        //   lon: posit.coords.longitude,
        // };

        // console.log("lat",posit.coords.latitude, "lon",posit.coords.longitude);

        getC_location(posit.coords.latitude, posit.coords.longitude);
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

//userLive_geolocation();  when Dom loaded
