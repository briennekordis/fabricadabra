import http from "../http-common";
const getAll = () => {
  return http.get("/fabrics");
};
const get = id => {
  return http.get(`/fabrics/${id}`);
};
const create = data => {
  return http.post("/fabrics", data);
};
const update = (id, data) => {
  return http.put(`/fabrics/${id}`, data);
};
const remove = id => {
  return http.delete(`/fabrics/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};