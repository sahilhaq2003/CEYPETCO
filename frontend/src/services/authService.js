import api from "./api";

const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("ceypetco_token");
    localStorage.removeItem("ceypetco_user");
  },

  getToken: () => {
    return localStorage.getItem("ceypetco_token");
  },

  getUser: () => {
    const user = localStorage.getItem("ceypetco_user");
    return user ? JSON.parse(user) : null;
  },

  setAuth: (token, user) => {
    localStorage.setItem("ceypetco_token", token);
    localStorage.setItem("ceypetco_user", JSON.stringify(user));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("ceypetco_token");
  },
};

export default authService;
