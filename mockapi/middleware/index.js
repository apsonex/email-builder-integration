import { httpClient } from "../http-client.js";
import kleur from "kleur";

export const authMiddleware = async (req, res, next) => {
    const result = await httpClient({
        method: "get",
        url: "/api/user",
    });

    if (result && result.data?.id) {
        return next();
    }

    if (result?.response?.status === 401) {
        return res.status(401).json({ status: "error", message: result.response.statusText });
    }

    return res.status(500).json({ status: "error" });
};
