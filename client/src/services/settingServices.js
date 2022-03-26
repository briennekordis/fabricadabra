import http from "../http-common";

//Fabric types
const getAllTypes = () => {
  return http.get("/fabricTypes");
};
const getType = id => {
  return http.get(`/fabricTypes/${id}`);
};
const createType = data => {
  return http.post("/fabricTypes", data);
};
const updateType = (id, data) => {
  return http.put(`/fabricTypes/${id}`, data);
};
const removeType = id => {
  return http.delete(`/fabricTypes/${id}`);
};

//Fabric sources
const getAllSources = () => {
  return http.get("/fabricTypes");
};
const getSource = id => {
  return http.get(`/fabricTypes/${id}`);
};
const createSource = data => {
  return http.post("/fabricTypes", data);
};
const updateSource = (id, data) => {
  return http.put(`/fabricTypes/${id}`, data);
};
const removeSource = id => {
  return http.delete(`/fabricTypes/${id}`);
};

export default {
  getAllTypes,
  getType,
  createType,
  updateType,
  removeType,
  getAllSources,
  getSource,
  createSource,
  updateSource,
  removeSource,
};