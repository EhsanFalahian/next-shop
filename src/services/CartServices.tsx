import http from "@/services/httpService";

export function addToCart(id: any) {
  return http
    .post("/cart/add", { productId: id })
    .then(({ data }) => data.data);
}

export function decrementProduct(id: any) {
  return http
    .post("/cart/remove", { productId: id })
    .then(({ data }) => data.data);
}

export function creatPayment() {
  return http.post("/payment/create").then(({ data }) => data.data);
}
