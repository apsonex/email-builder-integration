import express from "express";
import { httpClient } from "../../http-client.js";
import { apiPrefix } from "../../constants.js";

const router = express.Router();

router.get("/industries", async (req, res) => {
    const result = await httpClient({
        url: `${apiPrefix}/prebuilt/emails/industries`,
    });

    return res.status(200).json(result.data);
});

router.get("/industries/:industry/email-types", async (req, res) => {
    // prettier-ignore
    const result = await httpClient({
        url: `${apiPrefix}/prebuilt/emails/industries/${encodeURIComponent(req.params.industry)}/email-types`,
    });

    return res.status(200).json(result.data);
});

router.get("/industries/:industry/email-types/:type", async (req, res) => {
    const result = await httpClient({
        url: `${apiPrefix}/prebuilt/emails/industries/${encodeURIComponent(req.params.industry)}/email-types/${encodeURIComponent(req.params.type)}`,
    });

    return res.status(200).json(result.data);
});

router.get("/industries/:industry/email-types/:type/config/:config", async (req, res) => {
    const result = await httpClient({
        url: `${apiPrefix}/prebuilt/emails/industries/${encodeURIComponent(req.params.industry)}/email-types/${encodeURIComponent(req.params.type)}/config/${encodeURIComponent(req.params.config)}`,
    });

    return res.status(200).json(result.data);
});

export { router as prebuiltEmailsRouter };
