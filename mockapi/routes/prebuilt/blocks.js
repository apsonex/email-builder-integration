import express from "express";
import { httpClient } from "../../http-client.js";
import { apiPrefix } from "../../constants.js";

const router = express.Router();

router.get("/categories", async (req, res) => {
    const result = await httpClient({
        url: apiPrefix + "/prebuilt/blocks/categories",
    });

    return res.status(200).json(result.data);
});

router.get("/categories/:category", async (req, res) => {
    const result = await httpClient({
        url: apiPrefix + "/prebuilt/blocks/categories/" + encodeURIComponent(req.params.category),
    });

    return res.status(200).json(result.data);
});

export { router as prebuiltBlocksRouter };
