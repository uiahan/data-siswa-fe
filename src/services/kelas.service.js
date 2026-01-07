import { api } from "../lib/axios"

export const kelasService = {
    getAll: async () => {
        const { data } = await api.get("/kelas");
        return data
    },
    store: async (payload) => {
        const { data } = await api.post("/kelas", payload);
        return data
    },
    update: async (id, payload) => {
        const { data } = await api.put(`/kelas/${id}`, payload);
        return data
    },
    delete: async (id) => {
        const { data } = await api.delete(`/kelas/${id}`);
        return data
    },
};