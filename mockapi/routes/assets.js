import express from "express";
import { httpClient } from "../http-client.js";

const router = express.Router();

router.get("/url-manifest", async (req, res) => {
    const result = await httpClient({
        url: "api/apsonex-email-builder/assets/url-manifest",
    });

    return res.status(200).json(result.data);
});


export { router as assetsRoute };
