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
  return http.get("/fabricSources");
};
const getSource = id => {
  return http.get(`/fabricSources/${id}`);
};
const createSource = data => {
  return http.post("/fabricSources", data);
};
const updateSource = (id, data) => {
  return http.put(`/fabricSources/${id}`, data);
};
const removeSource = id => {
  return http.delete(`/fabricSources/${id}`);
};

//Fabric patterns
const getAllPatterns = () => {
  return http.get("/fabricpatterns");
};
const getPattern = id => {
  return http.get(`/fabricpatterns/${id}`);
};
const createPattern = data => {
  return http.post("/fabricpatterns", data);
};
const updatePattern = (id, data) => {
  return http.put(`/fabricpatterns/${id}`, data);
};
const removePattern = id => {
  return http.delete(`/fabricpatterns/${id}`);
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
  getAllPatterns,
  getPattern,
  createPattern,
  updatePattern,
  removePattern
};