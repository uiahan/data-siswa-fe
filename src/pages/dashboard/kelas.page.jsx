import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { kelasService } from "../../services/kelas.service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { jurusanService } from "../../services/jurusan.service";

const KelasPage = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [isSelected, setIsSelected] = useState(null);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const { data: dataKelas, isLoading: loadingKelas, isError: errorKelas } = useQuery({
        queryKey: ["kelas"],
        queryFn: kelasService.getAll,
    });

    const { data: dataJurusan } = useQuery({
        queryKey: ['jurusan'],
        queryFn: jurusanService.jurusanGetAll,
    });

    const storeMutate = useMutation({
        mutationFn: kelasService.store,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kelas'] })
            alert("Kelas berhasil ditambahkan");
            setShowModal(false);
        },
        onError: (error) => {
            alert(error.response?.data?.message);
        },
    });

    const updateMutate = useMutation({
        mutationFn: ({ id, payload }) => kelasService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kelas'] })
            alert("kelas berhasil diedit");
            setShowModal(false);
        },
        onError: (error) => {
            alert(error.response?.data?.message)
        },
    });

    const deleteMutate = useMutation({
        mutationFn: kelasService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['kelas'] });
            alert("Kelas berhasil dihapus");
        },
        onError: (error) => {
            alert(error.response?.data?.message)
        },
    });

    const onEdit = (item) => {
        setIsSelected(item);
        setValue("nama_kelas", item.nama_kelas);
        setValue("jurusan_id", item.jurusan.id);
        setShowModal(true);
    }

    const onSubmit = (values) => {
        if (isSelected) {
            updateMutate.mutate({
                id: isSelected.id,
                payload: values,
            });
        } else {
            storeMutate.mutate(values);
        }
    }

    const onDelete = (id) => {
        deleteMutate.mutate(id);
    }

    const onCloseModal = () => {
        setShowModal(false);
        setIsSelected(null);
        reset();
    }

    if (loadingKelas) {
        return (
            <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                <h2 className="text-xl md:text-3xl font-bold">
                    Loading...
                </h2>
            </div>
        )
    }

    if (errorKelas) {
        return (
            <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                <h2 className="text-xl md:text-3xl font-bold">
                    Gagal mengambil data
                </h2>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-6 text-white">
                <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                    <h2 className="text-xl md:text-3xl font-bold">
                        Kelola Kelas
                    </h2>
                </div>
                <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                    <div className="flex justify-between">
                        <h2 className="text-lg md:text-2xl font-bold">
                            Tabel
                        </h2>
                        <button onClick={() => setShowModal(true)} className="bg-white p-2 cursor-pointer hover:bg-white/90 transition-colors text-blue-500 font-bold rounded-md text-sm">
                            Tambah Kelas
                        </button>
                    </div>
                    <hr className="my-5" />
                    <div className="overflow-x-auto rounded-box border border-base-content/5">
                        {dataKelas.length === 0 ? (
                            <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                                <h2>
                                    Belum ada kelas
                                </h2>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Kelas</th>
                                        <th>Jurusan</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataKelas.map((item, index) => (
                                        <tr key={item.id}>
                                            <th>{index + 1}</th>
                                            <td>{item.nama_kelas}</td>
                                            <td>{item.jurusan.nama_jurusan}</td>
                                            <td className="flex gap-2">
                                                <button onClick={() => onEdit(item)} className="bg-white p-2 flex items-center gap-1 cursor-pointer hover:bg-white/90 transition-colors text-blue-500 font-bold rounded-md text-sm"><BsPencilSquare /> Ubah</button>
                                                <button disabled={deleteMutate.isPending} onClick={() => onDelete(item.id)} className="bg-white flex items-center gap-1 p-2 cursor-pointer hover:bg-white/90 transition-colors text-blue-500 font-bold rounded-md text-sm"><BiTrash className="w-4 h-4" />{deleteMutate.isPending ? "Loading..." : "Hapus"}</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="bg-white/10 border border-white/30 rounded-2xl p-5 w-96">
                        <div className="flex justify-between">
                            <h1 className="font-bold">{isSelected ? "Edit Kelas" : "Tambah Kelas"}</h1>
                            <button onClick={() => onCloseModal()} className="text-sm cursor-pointer">Tutup</button>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="block text-sm text-white/80 mb-1">
                                        Nama Kelas
                                    </label>
                                    <input
                                        {...register("nama_kelas", { required: "Nama kelas wajib diisi" })}
                                        type="text"
                                        placeholder="Masukan nama kelas"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    />
                                    {errors.nama_kelas && <small className="text-red-300">{errors.nama_kelas.message}</small>}
                                </div>
                                <div className="mt-3">
                                    <label className="block text-sm text-white/80 mb-1">
                                        Jurusan
                                    </label>
                                    <select
                                        {...register("jurusan_id", { required: "Jurusan wajib diisi" })}
                                        type="text"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    >
                                        {dataJurusan.map((item) => (
                                            <option className="text-black text-sm" key={item.id} value={item.id}>{item.nama_jurusan}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-5">
                                    <button disabled={storeMutate.isPending || updateMutate.isPending} className="bg-white p-2 gap-1 cursor-pointer hover:bg-white/90 transition-colors text-blue-500 font-bold rounded-md text-sm w-full text-center" type="submit">
                                        {storeMutate.isPending || updateMutate.isPending ? "Loading..." : "Kirim"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default KelasPage;