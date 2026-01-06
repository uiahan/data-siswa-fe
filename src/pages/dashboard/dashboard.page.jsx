const Dashboard = () => {
  return (
    <div className="space-y-6 text-white">
      
      <h2 className="text-xl md:text-2xl font-bold">
        Selamat Datang 👋
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="p-5 md:p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30">
          <p className="text-sm text-white/80">Total Siswa</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">120</h3>
        </div>

        <div className="p-5 md:p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30">
          <p className="text-sm text-white/80">Siswa Aktif</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">110</h3>
        </div>

        <div className="p-5 md:p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30">
          <p className="text-sm text-white/80">Kelas</p>
          <h3 className="text-2xl md:text-3xl font-bold mt-2">6</h3>
        </div>
      </div>

      <div className="p-5 md:p-6 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30">
        <h3 className="font-semibold mb-3">
          Aktivitas Terbaru
        </h3>
        <p className="text-white/80 text-sm">
          Belum ada aktivitas terbaru.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
