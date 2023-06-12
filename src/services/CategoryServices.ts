import http from "@/services/httpService";

export function getCategories() {
  return http.get("/category/list").then(({ data }) => data.data);
}

export function addCategory(data: object) {
  console.log(data);
  return http.post(`/admin/category/add`, data).then(({ data }) => data.data);
}

export function getCategoryById(id: string) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}
export function updateCategory({ productId, data }) {
  return http
    .patch(`/admin/category/update/${productId}`, data)
    .then(({ data }) => data.data);
}

export function removeCategory(id: string) {
  return http
    .delete(`/admin/category/remove/${id}`)
    .then(({ data }) => data.data);
}
