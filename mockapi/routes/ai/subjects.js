import express from "express";
import { apiPrefix } from "../../constants.js";
import { Agent } from "undici";
import { Readable } from 'stream';

const router = express.Router();

// 👇 custom agent that disables SSL certificate verification
const insecureAgent = new Agent({
    connect: {
        rejectUnauthorized: false, // 👈 disables TLS cert validation
    },
});

router.post("/", async (req, res) => {
    const headers = req.headers;

    const toSend = {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.EMAIL_BUILDER_TOKEN}`, // assumes token is from .env
        },
        body: JSON.stringify(req.body),
        dispatcher: insecureAgent
    };

    try {
        const url = process.env.EMAIL_BUILDER_API_ENDPOINT + req.originalUrl;

        const upstreamResponse = await fetch(url, toSend);

        if (!upstreamResponse.body) {
            return res.status(500).json({ error: "No stream returned" });
        }

        // Convert Web ReadableStream to Node.js Readable stream
        const nodeStream = Readable.fromWeb(upstreamResponse.body);

        // Pipe it to the response
        nodeStream.pipe(res);

    } catch (err) {
        console.error("Streaming proxy error:", err);
        res.status(500).json({ error: "Proxy stream failed" });
    }
});

export { router as aiSubjectRoutes };


// const response = await fetch(store().options.ai.subjects.create.url, {
//     method: "POST",
//     headers: payload.headers,
//     body: JSON.stringify(payload.body),
//     signal: controller.signal,
// });

// const result = await httpClient({
//     methid: 'POST',
//     url: `${apiPrefix}/ai/subjects`,
//     payload: req.body,
//     headers: {
//         'x-fake': req.header['x-fake'],
//         'x-fake-speed': '1',
//         'x-fake-type': '200',
//     }
// });
