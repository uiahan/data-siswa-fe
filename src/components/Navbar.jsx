const Navbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white/20 backdrop-blur-xl border-b border-white/30">
      
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>

        <h1 className="text-white font-semibold text-base md:text-lg">
          Dashboard Siswa
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-white/80 text-sm">
          Admin
        </span>
        <button className="px-3 py-1 rounded-lg bg-white text-indigo-600 text-sm font-medium hover:bg-white/90">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
