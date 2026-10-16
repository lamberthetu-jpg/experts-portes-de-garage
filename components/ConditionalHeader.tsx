"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const HIDDEN_ON = [
  "/remplacement-coupe-froid-porte-de-garage",
  "/reparation-porte-garage-granby",
  "/mise-au-point",
  "/reparation-ressort-porte-de-garage",
  "/reparation-ouvre-porte-garage-granby",
  "/avis",
  "/depannage-porte-de-garage",
];
const HIDDEN_PREFIXES = ["/dicter", "/admin"];

export default function ConditionalHeader() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;
  return <Header />;
}
