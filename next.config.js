module.exports = {
  future: {
    webpack5: true // by default, if you customize webpack config, they switch back to version 4.
    // Looks like backward compatibility approach.
  },
  env: {
    NEXT_PUBLIC_DB_NAME: process.env.NEXT_PUBLIC_DB_NAME,
    NEXT_PUBLIC_DB_HOST: process.env.NEXT_PUBLIC_DB_HOST,
    NEXT_PUBLIC_DB_USER: process.env.NEXT_PUBLIC_DB_USER,
    NEXT_PUBLIC_DB_PW: process.env.NEXT_PUBLIC_DB_PW,
    NEXT_PUBLIC_DB_PORT: process.env.NEXT_PUBLIC_DB_PORT
  },
  reactStrictMode: false,
  swcMinify: true,
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
      tls: false
    };

    return config;
  }
};
