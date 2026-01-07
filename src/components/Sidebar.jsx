import { BiHome } from "react-icons/bi";
import { LuGraduationCap } from "react-icons/lu";
import { MdClass } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed md:static z-50
          w-64
          bg-white/10 backdrop-blur-xl border-r border-white/30
          p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-white font-bold text-xl mb-8">
          SISWA APP
        </h2>

        <nav className="space-y-3">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2 px-2 py-2 rounded-xl text-white hover:bg-white/30 transition"
          >
            <BiHome className="h-5 w-5" /> Dashboard
          </Link>

          <Link
            to="/jurusan"
            onClick={onClose}
            className="flex items-center gap-2 px-2 py-2 rounded-xl text-white hover:bg-white/30 transition"
          >
            <LuGraduationCap className="w-5 h-5" /> Jurusan
          </Link>

          <Link
            to="/kelas"
            onClick={onClose}
            className="flex items-center gap-2 ml-1 px-2 py-2 rounded-xl text-white hover:bg-white/30 transition"
          >
            <SiGoogleclassroom /> Kelas
          </Link>

          <Link
            to="/siswa"
            onClick={onClose}
            className="flex items-center gap-2 px-2 py-2 rounded-xl text-white hover:bg-white/30 transition"
          >
            <PiStudent className="h-5 w-5" /> Siswa
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
