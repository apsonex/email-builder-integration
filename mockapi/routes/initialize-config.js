import express from "express";
import { httpClient } from "../http-client.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const result = await httpClient({
        url: req.originalUrl,
        headers: {
            'Accept': 'application/json'
        }
    });
    return res.status(200).json(result.data);
});

export { router as initializeConfigRouter };
