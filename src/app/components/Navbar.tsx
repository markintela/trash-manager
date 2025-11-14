"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  Users,
  BarChart3,
} from "lucide-react";

// -------------------------------
// Links principais do menu
// -------------------------------
const mainNavigation = [
  { name: "Home", href: "./" },
  { name: "Roommates", href: "/roommates" },
  { name: "Dashboard", href: "/dashboard" },
];

// -------------------------------
// Itens do dropdown "Historic"
// -------------------------------
const historicDropdown = [
  {
    name: "Notifications",
    description: "View trash queue events and status.",
    href: "/notifications",
    icon: Bell,
  },
  {
    name: "Roommates",
    description: "Manage people in the rotation.",
    href: "/roommates",
    icon: Users,
  },
];

// -------------------------------
// Navbar Component
// -------------------------------
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHistoricOpen, setIsHistoricOpen] = useState(false);
  const [isMobileHistoricOpen, setIsMobileHistoricOpen] = useState(false);

  const Logo = () => (
    <Link href="/" className="-m-2 p-2 flex items-center gap-2">
      <img src="/images/logo.jpg" alt="Logo Trash Manager" className="h-10 w-auto" />

      <p className="text-xl font-bold tracking-tight text-gray-900">
        Trash Manager
      </p>
    </Link>
  );

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        {/* LOGO */}
        <div className="flex lg:flex-1">
          <Logo />
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex lg:gap-x-12">
          {/* HISTORIC DROPDOWN */}
          {/* <div className="relative">
            <button
              type="button"
              onClick={() => setIsHistoricOpen(!isHistoricOpen)}
              className="flex items-center gap-1 text-sm font-semibold text-gray-900 hover:text-green-700 transition"
            >
              Historic
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transition-transform ${
                  isHistoricOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isHistoricOpen && (
              <div className="absolute left-0 top-full mt-3 w-72 rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 p-4">
                {historicDropdown.map((item) => (
                  <Link
                    href={item.href}
                    key={item.name}
                    onClick={() => setIsHistoricOpen(false)}
                    className="flex gap-4 items-start p-3 rounded-lg hover:bg-green-50 transition"
                  >
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-center group-hover:bg-green-100">
                      <item.icon className="h-6 w-6 text-gray-700" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div> */}

          {/* SIMPLE LINKS */}
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-gray-900 hover:text-green-700 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* LOGIN BUTTON (DESKTOP) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="#login"
            className="text-sm font-semibold text-gray-900 hover:text-green-700"
          >
            Log in →
          </Link>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <Logo />

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md"
              >
                <X className="h-6 w-6 text-gray-700" />
              </button>
            </div>

            <div className="mt-6">
              {/* MOBILE HISTORIC DROPDOWN */}
              <button
                onClick={() => setIsMobileHistoricOpen(!isMobileHistoricOpen)}
                className="flex w-full items-center justify-between px-3 py-2 text-base font-semibold text-gray-900 rounded-lg hover:bg-gray-100"
              >
                Historic
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    isMobileHistoricOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isMobileHistoricOpen && (
                <div className="ml-3 mt-2 space-y-2">
                  {historicDropdown.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-green-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* MOBILE SIMPLE LINKS */}
              <div className="mt-4 space-y-2">
                {mainNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-green-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* LOGIN MOBILE */}
              <div className="mt-6">
                <Link
                  href="#login"
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-green-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
