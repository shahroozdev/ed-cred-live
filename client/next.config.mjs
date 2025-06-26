/** @type {import('next').NextConfig} */
const nextConfig = {
  // serverActions: {
  //   bodySizeLimit: "10mb", // or whatever limit you want
  // },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["*"], // Only for development!
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "6969",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
