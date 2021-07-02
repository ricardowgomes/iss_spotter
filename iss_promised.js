const request = require('request-promise-native');
const ipAPI = 'https://api.ipify.org?format=json';
const coordsAPI = 'https://freegeoip.app/json/';
const passesISSAPI = 'http://api.open-notify.org/iss/v1/?';

const fetchMyIP = () => request(ipAPI);

const fetchCoordsByIP = (body) => {
  return request(`${coordsAPI}${JSON.parse(body).ip}`);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);

  return request(`${passesISSAPI}lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };