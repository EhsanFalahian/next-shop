import http from "@/services/httpService";

export function getProducts(query?: string, cookie?: any) {
  return http
    .get(`/product/list?${query}`, {
      headers: {
        Cookie: cookie,
      },
    })
    .then(({ data }) => data.data);
}

export function getProductDetail(slug: string) {
  return http.get(`/product/slug/${slug}`).then(({ data }) => data.data);
}

export function likeProduct(id: string) {
  return http.post(`/product/like/${id}`).then(({ data }) => data.data);
}

export function addProduct(data: object) {
  return http.post(`/admin/product/add`, data).then(({ data }) => data.data);
}

export function getProductsById(id: string) {
  return http.get(`/product/${id}`).then(({ data }) => data.data);
}
export function updateProduct({ productId, data }) {
  return http
    .patch(`/admin/product/update/${productId}`, data)
    .then(({ data }) => data.data);
}

export function removeProducts(id: string) {
  return http
    .delete(`/admin/product/remove/${id}`)
    .then(({ data }) => data.data);
}
