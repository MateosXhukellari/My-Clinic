export function Footer() {
  return (
    <footer className="motion-translate-y-in-100 motion-duration-[2s] motion-ease-spring-smooth4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold">MyClinic</span>
            </div>
            <p className="text-[var(--brand-text)]/80 mb-4 max-w-md">
              Connecting patients with qualified healthcare professionals for
              convenient, accessible medical consultations and appointments.
            </p>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-[var(--brand-text)]/80 hover:opacity-90 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--brand-text)]/80 hover:opacity-90 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--brand-text)]/80 hover:opacity-90 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[var(--brand-text)]/80 hover:opacity-90 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-[var(--brand-text)]/70">
            © 2024 MyClinic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
