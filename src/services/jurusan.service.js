import { api } from "../lib/axios"

export const jurusanService = {
    jurusanStore: async (payload) => {
        const { data } = await api.post("/jurusan", payload);
        return data;
    },
    jurusanGetAll: async () => {
        const { data } = await api.get("/jurusan");
        return data;
    },
    jurusanDelete: async (jurusan) => {
        const { data } = await api.delete(`/jurusan/${jurusan}`);
        return data;
    },
    jurusanUpdate: async (jurusan, payload) => {
        const { data } = await api.put(`/jurusan/${jurusan}`, payload);
        return data;
    }
};