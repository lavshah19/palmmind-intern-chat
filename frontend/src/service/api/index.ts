import axiosInstance from "../../api/axiosInstance";
import type { MyFormData,} from "../../types";


export async function registerUserService(signupFormdata:MyFormData) {
   const response = await axiosInstance.post("/auth/register", signupFormdata);
   return response.data;
}

export async function loginUserService(signinFormdata:MyFormData) {
   const response = await axiosInstance.post("/auth/login", signinFormdata);
   return response.data;
}
export async function checkAuthService() {
   const response = await axiosInstance.get("/auth/checkAuth");
   return response.data;
}