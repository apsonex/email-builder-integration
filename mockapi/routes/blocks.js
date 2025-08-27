import express from "express";
import { httpClient } from "../http-client.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
    const result = await httpClient({
        url: req.originalUrl,
        headers: { 'Accept': 'application/json' },
        payload: {}
    });
    return res.status(200).json(result.data);
});

router.post("/", async (req, res) => {
    const result = await httpClient({
        method: 'POST',
        url: req.originalUrl,
        headers: { 'Accept': 'application/json' },
        payload: req.body
    });
    return res.status(200).json(result.data);
});

router.put("/:id", async (req, res) => {
    const result = await httpClient({
        method: 'PUT',
        url: req.originalUrl,
        headers: { 'Accept': 'application/json' },
        payload: req.body
    });
    return res.status(200).json(result.data);
});

router.delete("/:id", async (req, res) => {
    const result = await httpClient({
        method: 'DELETE',
        url: req.originalUrl,
        headers: { 'Accept': 'application/json' },
    });
    return res.status(200).json(result.data);
});

export { router as blocksRoutes };
