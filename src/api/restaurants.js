import { useEffect } from "react";
import instance from ".";

// const getAllPets = async () => {
//   const response = await instance.get("/pets");
//   return response.data;
// };

// const getPetById = async (id) => {
//   const response = await instance.get(`/pets/${id}`);
//   return response.data;
// };

// export { getAllPets, getPetById };

const getAllCategories = async () => {
  const res = await instance.get("/category");
  return res.data;
};
const getAllRestaurants = async () => {
  const res = await instance.get("/resturant");
  return res.data;
};

const getRestaurant = async (id) => {
  const res = await instance.get(`/resturant/${id}`);
  return res.data;
};
const getRestaurantItems = async (id) => {
  const res = await instance.get(`/resturant/${id}/items`);
  return res.data;
};
const getItemDetails = async (id) => {
  const res = await instance.get(`/item/${id}`);
  return res.data;
};

export {
  getAllCategories,
  getAllRestaurants,
  getRestaurant,
  getRestaurantItems,
  getItemDetails,
};