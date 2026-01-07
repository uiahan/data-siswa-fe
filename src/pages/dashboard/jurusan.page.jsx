import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { jurusanService } from "../../services/jurusan.service";

const JurusanPage = () => {
    const queryCLient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [selectedJurusan, setSelectedJurusan] = useState(null);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["jurusan"],
        queryFn: jurusanService.jurusanGetAll,
    });

    const storeJurusanMutate = useMutation({
        mutationFn: jurusanService.jurusanStore,
        onSuccess: () => {
            queryCLient.invalidateQueries({ queryKey: ['jurusan'] })
            alert("jurusan berhasil ditambahkan");
            setShowModal(false);
        },
        onError: (error) => {
            alert(error.response?.data?.message);
        },
    });

    const updateJurusanMutate = useMutation({
        mutationFn: ({ jurusan, payload }) => jurusanService.jurusanUpdate(jurusan, payload),
        onSuccess: () => {
            queryCLient.invalidateQueries({ queryKey: ['jurusan'] });
            alert("jurusan berhasil diupdate");
            onCloseModal();
        },
        onError: (error) => {
            alert(error.response?.data?.message);
        }
    })

    const deleteJurusanMutate = useMutation({
        mutationFn: jurusanService.jurusanDelete,
        onSuccess: () => {
            queryCLient.invalidateQueries({ queryKey: ['jurusan'] });
            alert("jurusan berhasil dihapus");
        },
        onError: (error) => {
            alert(error.response?.data?.message);
        },
    });

    const onSubmit = (values) => {
        if (selectedJurusan) {
            updateJurusanMutate.mutate({
                jurusan: selectedJurusan.id,
                payload: values
            });
        } else {
            storeJurusanMutate.mutate(values)
        }
    }

    const onEdit = (item) => {
        setSelectedJurusan(item);
        setValue("nama_jurusan", item.nama_jurusan);
        setShowModal(true);
    }

    const onDelete = (id) => {
        deleteJurusanMutate.mutate(id);
    }

    const onCloseModal = () => {
        setShowModal(false);
        setSelectedJurusan(null);
        reset();
    }

    if (isLoading) {
        return (
            <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                <h2 className="text-xl md:text-3xl font-bold">
                    Loading...
                </h2>
            </div>
        )
    }

    if (isError) {
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
                        Kelola Jurusan
                    </h2>
                </div>
                <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                    <div className="flex justify-between">
                        <h2 className="text-lg md:text-2xl font-bold">
                            Tabel
                        </h2>
                        <button onClick={() => setShowModal(true)} className="bg-white p-2 cursor-pointer hover:bg-white/90 transition-colors text-blue-500 font-bold rounded-md text-sm">
                            Tambah Jurusan
                        </button>
                    </div>
                    <hr className="my-5" />
                    <div className="overflow-x-auto rounded-box border border-base-content/5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Jurusan</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={item.id}>
                                        <th>{index + 1}</th>
                                        <td>{item.nama_jurusan}</td>
                                        <td className="flex gap-2">
                                            <button onClick={() => onEdit(item)} className="bg-white p-2 flex items-center gap-1 cursor-pointer hover:bg-white/90 transition-colors text-blue-500 font-bold rounded-md text-sm"><BsPencilSquare /> Ubah</button>
                                            <button disabled={deleteJurusanMutate.isPending} onClick={() => onDelete(item.id)} className="bg-white flex items-center gap-1 p-2 cursor-pointer hover:bg-white/90 transition-colors text-blue-500 font-bold rounded-md text-sm"><BiTrash className="w-4 h-4" />{deleteJurusanMutate.isPending ? "Loading..." : "Hapus"}</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
                    <div className="bg-white/10 border border-white/30 rounded-2xl p-5 w-96">
                        <div className="flex justify-between">
                            <h1 className="font-bold">{selectedJurusan ? "Edit Jurusan" : "Tambah Jurusan"}</h1>
                            <button onClick={() => onCloseModal()} className="text-sm cursor-pointer">Tutup</button>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="block text-sm text-white/80 mb-1">
                                        Nama Jurusan
                                    </label>
                                    <input
                                        {...register('nama_jurusan', { required: "Nama jurusan wajib diisi" })}
                                        type="text"
                                        placeholder="Masukan nama jurusan"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    />
                                    {errors.nama_jurusan && <small className="text-red-300">{errors.nama_jurusan.message}</small>}
                                </div>
                                <div className="mt-5">
                                    <button disabled={storeJurusanMutate.isPending || updateJurusanMutate.isPending} className="bg-white p-2 gap-1 cursor-pointer hover:bg-white/90 transition-colors text-blue-500 font-bold rounded-md text-sm w-full text-center" type="submit">
                                        {storeJurusanMutate.isPending || updateJurusanMutate.isPending ? "Loading..." : "Kirim"}
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

export default JurusanPage;