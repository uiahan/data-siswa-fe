import { api } from "../lib/axios"

export const siswaService = {
    getAll: async () => {
        const { data } = await api.get("/siswa");
        return data;
    },
    store: async (payload) => {
        const { data } = await api.post("/siswa", payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return data;
    },
    update: async (id, payload) => {
        const { data } = await api.post(`/siswa/${id}`, payload);
        return data;
    },
    delete: async (id) => {
        const { data } = await api.delete(`/siswa/${id}`);
        return data;
    },
}