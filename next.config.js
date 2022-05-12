/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    APP_URL:'https://jsonplaceholder.typicode.com',
    MONGO_URL:'mongodb://127.0.0.1:27017/clipit',
    MONGODB_DB:'sample_mflix'
  }
}

module.exports = nextConfig

