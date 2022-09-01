import axios from 'axios';
import { SpotifyConnection } from './SpotifyConnection';

const instance = axios.create({
  baseURL: process.env.SPOTIFY_API_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = await SpotifyConnection.getAccessToken();
    if(!config.headers) {
      config.headers = {
        Authorization: 'Bearer ' + accessToken
      }
      return config;
    }
    
    config.headers.Authorization = 'Bearer ' + accessToken;
    return config;
  },
  (error) => {
    console.log(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;