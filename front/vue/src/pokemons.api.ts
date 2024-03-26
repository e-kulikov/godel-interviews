import axios from "axios";
import { API_URL } from "./settings.json";

export const getPokemons = async (limit: number, offset: number) => {
  let response;
  try {
    const pokemons = await axios.get(
      `${API_URL}/pokemon?limit=${limit}&offset=${offset}`,
    );
    if (!pokemons) {
      response = [];
    } else {
      response = pokemons.data.results;
    }
  } catch (err) {
    console.log(err);
  }

  console.log(response);
  return response;
};
