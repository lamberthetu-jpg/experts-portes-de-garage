"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useBookingModal } from "@/context/BookingModalContext";

const serviceLinks = [
  { href: "/reparation-urgente-de-porte-de-garage", label: "Réparation urgente 24/7" },
  { href: "/installation-de-nouvelle-porte-de-garage", label: "Nouvelle installation" },
  { href: "/reparation-ouvre-porte-de-garage", label: "Ouvre-porte de garage" },
  { href: "/remplacement-coupe-froid-porte-de-garage", label: "Remplacement de coupe-froid" },
];

const mainNavLinks = [
  { href: "/a-propos", label: "À propos" },
  { href: "/carriere", label: "Carrières" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isServiceActive = serviceLinks.some((s) => s.href === pathname);
  const { openModal } = useBookingModal();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top info bar */}
      <div className="hidden lg:block bg-brand text-white">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex items-center justify-between text-xs font-medium">
          <span>Service d&apos;urgence 24/7 — Granby &amp; régions</span>
          <a href="tel:4505585788" className="hover:underline font-bold">
            450-558-5788
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-28 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo_experts.png"
            alt="Experts Portes de Garage"
            width={320}
            height={100}
            className="h-24 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {/* Services dropdown */}
          <div className="relative group">
            <button
              className={`text-sm font-semibold flex items-center gap-1 transition-colors ${
                isServiceActive ? "text-brand" : "text-gray-700 hover:text-brand"
              }`}
            >
              Services
              <svg className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown panel */}
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
              <div className="bg-white border border-gray-100 shadow-xl rounded-xl p-3 w-80">
                <div className="grid grid-cols-1 gap-0.5 mb-2">
                  {serviceLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`text-sm px-3 py-2 rounded-lg transition-colors ${
                        pathname === href
                          ? "bg-brand/10 text-brand font-semibold"
                          : "text-gray-700 hover:bg-brand/5 hover:text-brand"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main nav links */}
          {mainNavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-semibold transition-colors ${
                pathname === href ? "text-brand" : "text-gray-700 hover:text-brand"
              }`}
            >
              {label}
            </Link>
          ))}

          {/* Planifier CTA */}
          <button
            type="button"
            onClick={openModal}
            className="text-sm font-bold bg-brand text-white px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors shadow-sm"
          >
            Planifier une visite
          </button>
        </nav>

        {/* Phone + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="tel:4505585788"
            className="inline-flex lg:hidden items-center bg-brand text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors"
          >
            450-558-5788
          </a>
          <button
            className="lg:hidden p-2 text-brand"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-1 shadow-lg">
          {/* Services section */}
          <button
            onClick={() => setMobileServicesOpen((o) => !o)}
            className="flex items-center justify-between w-full text-gray-700 font-semibold text-sm py-2.5 px-3 rounded-lg hover:bg-gray-50"
          >
            <span className={isServiceActive ? "text-brand" : ""}>Services</span>
            <svg
              className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {mobileServicesOpen && (
            <div className="pl-3 flex flex-col gap-0.5 mb-1">
              {serviceLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm py-2 px-3 rounded-lg transition-colors ${
                    pathname === href ? "text-brand font-semibold bg-brand/10" : "text-gray-600 hover:text-brand hover:bg-brand/5"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}

          {mainNavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-semibold py-2.5 px-3 rounded-lg transition-colors ${
                pathname === href ? "text-brand bg-brand/10" : "text-gray-700 hover:text-brand hover:bg-gray-50"
              }`}
            >
              {label}
            </Link>
          ))}

          <div className="flex flex-col gap-2.5 mt-3 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={() => { setMobileOpen(false); openModal(); }}
              className="bg-brand text-white text-sm font-bold px-5 py-3 rounded-lg text-center hover:bg-brand-dark transition-colors"
            >
              Planifier une visite
            </button>
            <a
              href="tel:4505585788"
              className="border-2 border-brand text-brand text-sm font-bold px-5 py-3 rounded-lg text-center hover:bg-brand hover:text-white transition-colors"
            >
              450-558-5788
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
