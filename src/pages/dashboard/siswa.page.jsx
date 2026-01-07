import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import { kelasService } from "../../services/kelas.service";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { siswaService } from "../../services/siswa.service";

const SiswaPage = () => {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [isSelected, setIsSelected] = useState(null);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

    const { data: dataSiswa, isLoading: loadingSiswa, isError: errorSiswa } = useQuery({
        queryKey: ["siswa"],
        queryFn: siswaService.getAll,
    });

    const { data: dataKelas } = useQuery({
        queryKey: ['kelas'],
        queryFn: kelasService.getAll,
    });

    const storeMutate = useMutation({
        mutationFn: siswaService.store,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['siswa'] })
            alert("siswa berhasil ditambahkan");
            setShowModal(false);
        },
        onError: (error) => {
            alert(error.response?.data?.message);
        },
    });

    const updateMutate = useMutation({
        mutationFn: ({ id, payload }) => siswaService.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['siswa'] })
            alert("siswa berhasil diedit");
            setShowModal(false);
        },
        onError: (error) => {
            alert(error.response?.data?.message)
        },
    });

    const deleteMutate = useMutation({
        mutationFn: siswaService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['siswa'] });
            alert("Siswa berhasil dihapus");
        },
        onError: (error) => {
            alert(error.response?.data?.message)
        },
    });

    const onEdit = (item) => {
        setIsSelected(item);
        setValue("foto_siswa", item.foto_siswa);
        setValue("nama_siswa", item.nama_siswa);
        setValue("jenis_kelamin", item.jenis_kelamin);
        setValue("email", item.email);
        setValue("tanggal_lahir", item.tanggal_lahir);
        setValue("no_telpon", item.no_telpon);
        setValue("agama", item.agama);
        setValue("kelas_id", item.kelas.id);
        setShowModal(true);
    }

    const onSubmit = (values) => {
        const formData = new FormData();

        if (isSelected) {
            formData.append("_method", "PUT");
        }

        for (const key in values) {
            if (key === "foto_siswa") {
                if (values.foto_siswa && values.foto_siswa[0] instanceof File) {
                    formData.append("foto_siswa", values.foto_siswa[0]);
                }
            } else {
                formData.append(key, values[key]);
            }
        }

        if (isSelected) {
            updateMutate.mutate({
                id: isSelected.id,
                payload: formData,
            });
        } else {
            storeMutate.mutate(formData);
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

    if (loadingSiswa) {
        return (
            <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                <h2 className="text-xl md:text-3xl font-bold">
                    Loading...
                </h2>
            </div>
        )
    }

    if (errorSiswa) {
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
                        Kelola Siswa
                    </h2>
                </div>
                <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                    <div className="flex justify-between">
                        <h2 className="text-lg md:text-2xl font-bold">
                            Tabel
                        </h2>
                        <button onClick={() => setShowModal(true)} className="bg-white p-2 cursor-pointer hover:bg-white/90 transition-colors text-blue-500 font-bold rounded-md text-sm">
                            Tambah Siswa
                        </button>
                    </div>
                    <hr className="my-5" />
                    <div className="overflow-x-auto rounded-box border border-base-content/5">
                        {dataSiswa.length === 0 ? (
                            <div className="bg-white/10 p-5 rounded-xl border border-white/30">
                                <h2>
                                    Belum ada siswa di kelas ini
                                </h2>
                            </div>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Foto</th>
                                        <th>Nama</th>
                                        <th>Jenkel</th>
                                        <th>Kelas</th>
                                        <th>Email</th>
                                        <th>Tgl Lahir</th>
                                        <th>Telp</th>
                                        <th>Agama</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataSiswa.map((item, index) => (
                                        <tr key={item.id}>
                                            <th>{index + 1}</th>
                                            <td><img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${item.foto_siswa}`} className="w-8 h-8 object-cover" alt={item.nama_siswa} /></td>
                                            <td>{item.nama_siswa}</td>
                                            <td>{item.jenis_kelamin}</td>
                                            <td>{item.kelas.nama_kelas}</td>
                                            <td>{item.email}</td>
                                            <td>{item.tanggal_lahir}</td>
                                            <td>{item.no_telpon}</td>
                                            <td>{item.agama}</td>
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
                            <h1 className="font-bold">{isSelected ? "Edit Siswa" : "Tambah Siswa"}</h1>
                            <button onClick={() => onCloseModal()} className="text-sm cursor-pointer">Tutup</button>
                        </div>
                        <div className="mt-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label className="block text-sm text-white/80 mb-1">
                                        Foto Siswa
                                    </label>
                                    <input
                                        {...register("foto_siswa")}
                                        type="file"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    />
                                    {errors.foto_siswa && <small className="text-red-300">{errors.foto_siswa.message}</small>}
                                </div>
                                <div className="mt-3">
                                    <label className="block text-sm text-white/80 mb-1">
                                        Nama Siswa
                                    </label>
                                    <input
                                        {...register("nama_siswa", { required: "Nama siswa wajib diisi" })}
                                        type="text"
                                        placeholder="Masukan nama siswa"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    />
                                    {errors.nama_siswa && <small className="text-red-300">{errors.nama_siswa.message}</small>}
                                </div>
                                <div className="mt-3">
                                    <label className="block text-sm text-white/80 mb-1">
                                        Jenis Kelamin
                                    </label>
                                    <input
                                        {...register("jenis_kelamin", { required: "Jenis kelamin wajib diisi" })}
                                        type="text"
                                        placeholder="Masukan jenis kelamin"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    />
                                    {errors.jenis_kelamin && <small className="text-red-300">{errors.jenis_kelamin.message}</small>}
                                </div>
                                <div className="mt-3">
                                    <label className="block text-sm text-white/80 mb-1">
                                        Kelas
                                    </label>
                                    <select
                                        {...register("kelas_id", { required: "Kelas wajib diisi" })}
                                        type="text"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    >
                                        {dataKelas.map((item) => (
                                            <option className="text-black text-sm" key={item.id} value={item.id}>{item.nama_kelas}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <label className="block text-sm text-white/80 mb-1">
                                        Email
                                    </label>
                                    <input
                                        {...register("email", { required: "email wajib diisi" })}
                                        type="email"
                                        placeholder="Masukan email"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    />
                                    {errors.email && <small className="text-red-300">{errors.email.message}</small>}
                                </div>
                                <div className="mt-3">
                                    <label className="block text-sm text-white/80 mb-1">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        {...register("tanggal_lahir", { required: "Tanggal lahir wajib diisi" })}
                                        type="date"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    />
                                    {errors.tanggal_lahir && <small className="text-red-300">{errors.tanggal_lahir.message}</small>}
                                </div>
                                <div className="mt-3">
                                    <label className="block text-sm text-white/80 mb-1">
                                        No Telpon
                                    </label>
                                    <input
                                        {...register("no_telpon", { required: "Nomor telpon wajib diisi" })}
                                        type="number"
                                        placeholder="Masukan nomor telpon"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    />
                                    {errors.no_telpon && <small className="text-red-300">{errors.no_telpon.message}</small>}
                                </div>
                                <div className="mt-3">
                                    <label className="block text-sm text-white/80 mb-1">
                                        Agama
                                    </label>
                                    <input
                                        {...register("agama", { required: "Nomor telpon wajib diisi" })}
                                        type="text"
                                        placeholder="Masukan agama"
                                        className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                                    />
                                    {errors.agama && <small className="text-red-300">{errors.agama.message}</small>}
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

export default SiswaPage;