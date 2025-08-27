import express from "express";
import { httpClient } from "../http-client.js";
import multer from 'multer';
import FormData from 'form-data';

const router = express.Router();
const upload = multer(); // defaults to memory storage


router.get("/", async (req, res) => {
    const result = await httpClient({
        url: req.originalUrl,
        headers: { 'Accept': 'application/json' },
    });
    return res.status(result.status).json(result.data);
});

router.post("/", upload.any(), async (req, res) => {
    const form = new FormData();

    // Append files
    req.files.forEach(file => {
        form.append(file.fieldname, file.buffer, {
            filename: file.originalname,
            contentType: file.mimetype
        });
    });

    // Append text fields
    Object.entries(req.body).forEach(([key, value]) => {
        form.append(key, value);
    });

    // Call your API client
    const result = await httpClient({
        method: 'POST',
        url: req.originalUrl,
        headers: {
            ...form.getHeaders(),
            Accept: 'application/json',
        },
        payload: form
    });

    return res.status(result.status || 500).json(result.data || {});
});

router.delete("/:id", async (req, res) => {
    const result = await httpClient({
        method: 'DELETE',
        url: req.originalUrl,
        headers: { 'Accept': 'application/json' },
    });
    return res.status(result.status).json(result.data);
});

// router.put("/:id", async (req, res) => {
//     const result = await httpClient({
//         method: 'PUT',
//         url: req.originalUrl,
//         headers: { 'Accept': 'application/json' },
//         payload: req.body
//     });
//     return res.status(result.status).json(result.data);
// });

// router.delete("/:id", async (req, res) => {
//     const result = await httpClient({
//         method: 'DELETE',
//         url: req.originalUrl,
//         headers: { 'Accept': 'application/json' },
//     });
//     return res.status(result.status).json(result.data);
// });

export { router as mediaRoutes };
