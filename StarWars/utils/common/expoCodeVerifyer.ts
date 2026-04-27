import expos from "../../config/expos.json"

export const verifyCode = (code: string) => {
    return expos.find(expo => expo.code === code.toUpperCase());
}