"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  BarChart,
  Bell,
  ClipboardList,
  Clock,
} from "lucide-react";

// Links principais
const mainNavigation = [
  { name: "Historic", href: "#historic" },
  { name: "Dashboard", href: "#dashboard" },
];

// Itens do dropdown
const features = [
  {
    name: "Analytics",
    description: "Visualize as tendências de lixo.",
    href: "#analytics",
    icon: BarChart,
  },
  {
    name: "Pendences",
    description: "Gerencie a fila de coleta atual.",
    href: "#pendences",
    icon: ClipboardList,
  },
  {
    name: "Room Mates",
    description: "Gerencie membros e escalas de limpeza.",
    href: "#room-mates",
    icon: Clock,
  },
  {
    name: "Notifications",
    description: "Ative alertas para a sua vez.",
    href: "#notifications",
    icon: Bell,
  },
];

// Ações secundárias
const callsToAction = [
  { name: "Watch Demo", href: "#demo" },
  { name: "Contact Support", href: "#support" },
];

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  const [isMobileProductMenuOpen, setIsMobileProductMenuOpen] = useState(false);

  const Logo = () => (
    <Link href="/" className="-m-2 p-2 flex items-center gap-2">
      <img
        src="/images/logo.jpg"
        alt="Logo Trash Manager"
        className="h-12 w-auto"
      />
      <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">
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
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Logo />
        </div>

        {/* Botão do menu mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Abrir menu principal</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="hidden lg:flex lg:gap-x-12">
          {/* Dropdown Features */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
              onBlur={() => setTimeout(() => setIsProductMenuOpen(false), 100)}
              className="flex items-center gap-x-1 text-sm font-semibold text-gray-900 hover:text-green-700 transition"
              aria-expanded={isProductMenuOpen}
            >
              Features
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transform transition-transform ${
                  isProductMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProductMenuOpen && (
              <div className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-gray-900/5 transition ease-out duration-200 origin-top-left">
                <div className="p-4">
                  {features.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-green-50 transition"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-green-100">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          href={item.href}
                          onClick={() => setIsProductMenuOpen(false)}
                          className="block font-semibold text-gray-900"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 divide-x divide-gray-100 bg-gray-50">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsProductMenuOpen(false)}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition"
                    >
                      <Bell
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Links simples */}
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

        {/* Login Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="#login"
            className="text-sm font-semibold text-gray-900 hover:text-green-700 transition"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="fixed inset-y-0 right-0 z-[60] w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Fechar menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {/* Dropdown Mobile */}
                  <div className="-mx-3">
                    <button
                      type="button"
                      onClick={() =>
                        setIsMobileProductMenuOpen(!isMobileProductMenuOpen)
                      }
                      className="flex w-full items-center justify-between rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
                      aria-expanded={isMobileProductMenuOpen}
                    >
                      Features
                      <ChevronDown
                        className={`h-5 w-5 transform transition-transform ${
                          isMobileProductMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isMobileProductMenuOpen && (
                      <div className="mt-2 space-y-2">
                        {[...features, ...callsToAction].map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block rounded-lg py-2 pl-6 text-sm font-semibold text-gray-900 hover:bg-green-50"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Links móveis */}
                  {mainNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-green-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="py-6">
                  <Link
                    href="#login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-green-50"
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
  );
};

export default Navbar;
