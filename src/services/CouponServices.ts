import http from "@/services/httpService";

export function getCoupons() {
  return http.get(`/admin/coupon/list`).then(({ data }) => data.data);
}

export function getOneCoupon(id: string) {
  return http.get(`/admin/coupon/${id}`).then(({ data }) => data.data);
}

export function addCoupons(data: object) {
  return http.post(`/admin/coupon/add`, data).then(({ data }) => data.data);
}

export function updateCoupons({ id, data }) {
  return http
    .patch(`/admin/coupon/update/${id}`, data)
    .then(({ data }) => data.data);
}

export function removeCoupon(id) {
  return http
    .delete(`/admin/coupon/remove/${id}`)
    .then(({ data }) => data.data);
}
