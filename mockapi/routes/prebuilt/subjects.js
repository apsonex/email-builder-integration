import express from "express";
import { httpClient } from "../../http-client.js";

const router = express.Router();

router.get("/industries", async (req, res) => {
    // prettier-ignore
    const result = await httpClient({
        url: "api/apsonex-email-builder/prebuilt/subjects/industries",
    });
    return res.status(200).json(result.data);
});

router.get("/industries/:industry", async (req, res) => {
    // prettier-ignore
    const result = await httpClient({
        url: `api/apsonex-email-builder/prebuilt/subjects/industries/${encodeURIComponent(req.params.industry)}`,
    });

    if(!result || !result.data || result.data.status !== 'success') {
        return res.status(404).json({});
    }

    return res.status(200).json(result.data);
});

export { router as prebuiltSubjectsRouter };
