"use client";

import { useState } from "react";
import { Trash2, X, Menu } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Room Mates", href: "/room-mates" },
    { name: "Historic", href: "/historic" },
    { name: "Pendences", href: "/pendences" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          {/* LOGO */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <Trash2 className="h-6 w-6 text-yellow-600" />
              <span className="text-lg font-extrabold text-yellow-700">
                Trash Manager
              </span>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-900 hover:text-yellow-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* LOGIN */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="text-sm font-semibold text-gray-900 hover:text-yellow-600 transition"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>

        {/* MOBILE MENU OVERLAY */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/30 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-full sm:max-w-sm bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="-m-1.5 p-1.5 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Trash2 className="h-6 w-6 text-yellow-600" />
                  <span className="text-lg font-extrabold text-yellow-700">
                    Trash Manager
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="space-y-2 py-6">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
