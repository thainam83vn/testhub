import axios from "axios";
const Server = "https://d3c7370e.ngrok.io";
const Api = {
  get: (url, payload) => {
    const filter = payload.filter ? `filter=${payload.filter}` : "";
    const query = payload.query ? `query=${payload.query}` : "";
    return axios
      .get(`${Server}/${url}?${filter}&${query}`)
      .then(response => response.data);
  }
};
export default Api;
