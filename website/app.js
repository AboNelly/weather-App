/* Global Variables */

// grabbing any input from index.html
const generate = document.getElementById("generate");
let temp;
// Personal API Key for OpenWeatherMap API
const apiKey = "97a7ed6f37dbea038e88e20ce58d9911&units=imperial";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
// the function to get the data from the website server
const firstClick = () => {
  const zip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings");
  const content = feelings.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=`;

  const getApi = getMyData(url);
  getApi
    .then((data) => {
      // console.log(data);
      // get temprature only from data object
      temp = data.main.temp;
      const allData = {
        temp,
        content,
        newDate,
      }; // call function to send data to local server
      postData("/postData", allData);
    }) // call function to get data from local server
    .then(() => retrieveData());
};
// get all data from weather website
const getMyData = async (url) => {
  const fullURL = url + apiKey;
  const response = await fetch(fullURL);
  try {
    // convert data to json
    const dataResponse = await response.json();
    return dataResponse;
  } catch (error) {
    console.log("error in data response");
    console.log(error);
  }
};

const postData = async (route, allData) => {
  const response = await fetch(route, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(allData),
  });
  try {
    const allData = await response.json();
    // console.log(data);
  } catch (error) {
    console.log("error in data json");
    console.log(error);
  }
};

const retrieveData = async () => {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("content").innerHTML = allData.content;
    document.getElementById("date").innerHTML = allData.newDate;
  } catch (error) {
    console.log("error in alldata", error);
    // appropriately handle the error
  }
};
generate.addEventListener("click", firstClick);
