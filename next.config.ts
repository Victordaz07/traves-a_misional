import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  // Optimizado para teléfonos de gama media/baja y datos limitados (ver CLAUDE.md):
  // cachear al navegar tiene un costo de red adicional que no vale la pena aquí.
  cacheOnNavigation: false,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSerwist(nextConfig);
