// External Modules
const axios = require("axios");

exports.getHomePage = (req, res, next) => {
  console.log("Home page is working correctly");
  res.render("user/home");
};

exports.getDetailsPage = async (req, res, next) => {
  const { Pickup, Drop } = req.body;

  // Step 1: Get coordinates
  async function getCoordinates(place) {
    const url = `https://nominatim.openstreetmap.org/search?q=${place}&format=json`;

    const res = await axios.get(url, {
      headers: {
        "User-Agent": "distance-app",
      },
    });

    if (!res.data || res.data.length === 0) {
      throw new Error("Location not found: " + place);
    }

    return {
      lat: res.data[0].lat,
      lon: res.data[0].lon,
    };
  }

  // Step 2: Get distance
  async function getDistance(Pickup, Drop) {
    try {
      const fromCoord = await getCoordinates(Pickup);
      const toCoord = await getCoordinates(Drop);

      const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${fromCoord.lon},${fromCoord.lat};${toCoord.lon},${toCoord.lat}?overview=false`;

      const res = await axios.get(osrmUrl);

      const distance = res.data.routes[0].distance / 1000; // km
      const duration = res.data.routes[0].duration / 60; // minutes

      console.log(`Distance: ${distance.toFixed(2)} km`);
      console.log(`Time: ${duration.toFixed(2)} minutes`);

      return { distance, duration };
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  const { distance } = await getDistance(Pickup, Drop);
  console.log("Pickup Location:", Pickup);
  console.log("Drop Location:", Drop);

  // For railway API
  const API_KEY = "4a0a725397msh5e641bf63a3d1cdp10d65fjsn9dbf074e9c13";

  async function getTrains() {
    try {
      const res = await axios.get(
        `http://api.erail.in/trains/?stn1=${Pickup}&stn2=${Drop}&key=${API_KEY}`,
      );

      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  getTrains(Pickup, Drop);

  res.render("user/details", { Pickup, Drop, distance });
};

exports.getProfilePage = (req, res, next) => {
  console.log("Profile page is working correctly");
  res.render("user/profile");
};

exports.getSupportPage = (req, res, next) => {
  console.log("Support page requested");
  res.render("user/support");
};

exports.getHelpPage = (req, res, next) => {
  console.log("Help page requested");
  res.render("user/help");
};

exports.getFeedbackPage = (req, res, next) => {
  console.log("Feedback page requested");
  res.render("user/feedback");
};
