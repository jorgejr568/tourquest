const APP_ENV = Bun.env.APP_ENV || "production";
export const Environment = {
  PORT: Bun.env.PORT || 8000,
  APP_ENV,
  APP_DEBUG: Bun.env.APP_DEBUG || false,
  JWT_SECRET: Bun.env.JWT_SECRET || "secret",
  JWT_EXPIRES_IN: Bun.env.JWT_EXPIRES_IN || "1h",

  // processed
  isProduction: APP_ENV === "production",
};
