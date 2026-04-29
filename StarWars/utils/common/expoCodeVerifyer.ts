import expos from "../../config/expos.json";

export const verifyCode = (code?: string) => {
  if (!code?.trim()) return null;

  const normalizedCode = code.trim().toUpperCase();

  return expos.find((expo) => expo?.code?.trim().toUpperCase() === normalizedCode) ?? null;
};