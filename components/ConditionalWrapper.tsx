"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Footer from "./Footer";

const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });

const HIDDEN_ON: string[] = [
  "/reparation-porte-garage-granby",
  "/mise-au-point",
  "/reparation-ressort-porte-de-garage",
  "/reparation-ouvre-porte-garage-granby",
  "/avis",
];
const HIDDEN_PREFIXES = ["/dicter", "/admin"];

export default function ConditionalWrapper() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;
  return (
    <>
      <Footer />
      <ChatBot />
    </>
  );
}
