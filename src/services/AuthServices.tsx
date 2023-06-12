import http from "@/services/httpService";

export function getOtp(phoneNumber: string) {
  console.log(phoneNumber);
  return http
    .post("/user/get-otp", { phoneNumber })
    .then(({ data }) => data.data);
}

export function checkOtp(data: object) {
  return http.post("/user/check-otp", data).then(({ data }) => data.data);
}

export function completeProfile(data: object) {
  return http
    .post("/user/complete-profile", data)
    .then(({ data }) => data.data);
}

export function getProfile() {
  return http.get("/user/profile").then(({ data }) => data.data);
}

export function updateProfile(data: object) {
  return http.patch("/user/update", data).then(({ data }) => data.data);
}

export function logout() {
  return http.post("/user/logout");
}

// admin

export function getAllUsers() {
  return http.get("admin/user/list").then(({ data }) => data.data);
}

export function getAdminPayments() {
  return http.get("/admin/payment/list").then(({ data }) => data.data);
}
