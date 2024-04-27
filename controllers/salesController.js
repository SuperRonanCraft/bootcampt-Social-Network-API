const { url } = require("../utils/api");
function getSales(req, res) {
  const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY,
    },
  };
  fetch(url, requestOptions)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data, requestOptions);
      res.json(data);
    });
}

module.exports = { getSales };
