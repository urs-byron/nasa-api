const API_URL_v1 = "v1";

// Load planets and return as JSON.
async function httpGetPlanets() {
  try {
    return await (await fetch(`${API_URL_v1}/planets`)).json();
  } catch (err) {
    console.log(err);
  }
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  try {
    const res = await fetch(`${API_URL_v1}/launches`);
    const data = await res.json();
    return data.sort((a, b) => {
      return a.flightNumber - b.flightNumber;
    });
  } catch (err) {
    console.log(err);
  }

  // const response = await fetch(`${API_URL_v1}/launches`);
  // const fetchedLaunches = await response.json();
  // return fetchedLaunches.sort((a, b) => {
  //   return a.flightNumber - b.flightNumber;
  // });
}
// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  try {
    const res = await fetch(`${API_URL_v1}/launches`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
    const data = await res.json();
    data.error_type ? (data.ok = false) : (data.ok = true);
    return data;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
  // try {
  //   return await fetch(`${API_URL_v1}/launches`, {
  //     method: "post",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(launch),
  //   });
  // } catch (err) {
  //   return {
  //     ok: false,
  //   };
  // }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    const res = await fetch(`${API_URL_v1}/launches/${id}`, {
      method: "delete",
    });
    const data = await res.json();
    data.error_type ? (data.ok = false) : (data.ok = true);
    return data;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
  // try {
  //   return await fetch(`${API_URL_v1}/launches/${id}`, {
  //     method: "delete",
  //   });
  // } catch (err) {
  //   console.log(err);
  //   return {
  //     ok: false,
  //   };
  // }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
