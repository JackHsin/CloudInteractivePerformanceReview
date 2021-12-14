require("dotenv").config({ path: `./env/.env.${process.env.ENVIRONMENT}` });

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};
