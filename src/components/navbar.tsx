import { Link } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/auth-store";

export function Navbar() {
  const role = useAuthStore((s) => s.role);
  return (
    <nav className="bg-[var(--brand-bg)] shadow-sm border-b border-gray-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-[var(--brand-text)]">
                MyClinic
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[var(--brand-text)] hover:opacity-80 transition-colors "
            >
              Home
            </Link>
          </div>
          <div>
            <Link
              to="/book"
              className=" text-[var(--brand-text)] hover:opacity-80 transition-colors"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      </div>
      {role === "admin" && (
        <Link to="/admin/appoinments" className="text-[var(--brand-text)]/80">
          Admin
        </Link>
      )}
    </nav>
  );
}
