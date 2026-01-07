import { api } from "../lib/axios"

export const authService = {
    register: async (payload) => {
        const { data } = await api.post("/register", payload);
        return data;
    },
    login: async (payload) => {
        const { data } =  await api.post("/login", payload);
        return data;
    },
    logout: async () => {
        return await api.post("/logout")
    },
};