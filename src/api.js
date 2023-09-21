import axios from "axios";

export const api = axios.create({
  baseURL: 'http://pokeapi.co/api/v2/pokemon/',
});