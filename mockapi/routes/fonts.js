import express from "express";
import { httpClient } from "../http-client.js";
import { apiPrefix } from '../constants.js'

const router = express.Router();

router.get("/", async (req, res) => {

    let queryStr = [];

    if (req.query.perPage) {
        queryStr.push(`perPage=${parseInt(req.query.perPage)}`);
    }

    if (req.query.page) {
        queryStr.push(`page=${parseInt(req.query.page)}`);
    }

    if (req.query.query) {
        queryStr.push(`query=${encodeURIComponent(req.query.query)}`);
    }

    const url = `${apiPrefix}/fonts?` + queryStr.join('&');

    const result = await httpClient({ url });

    if (result && result.data) {
        return res.status(200).json(result.data);
    }

    return res.status(404).json({ status: 'error', message: 'No results' });
});

router.get("/search", async (req, res) => {
    const result = await httpClient({
        url: `${apiPrefix}/fonts/search?query=` + encodeURIComponent(req.query.query)
    });
    return res.status(200).json(result.data);
});

router.get("/keys", async (req, res) => {
    const result = await httpClient({
        url: `${apiPrefix}/fonts/search/keys?keys=` + req.query.keys
    });
    return res.status(200).json(result.data);
});

router.get("/family/:family", async (req, res) => {
    // prettier-ignore
    const result = await httpClient({
        url: `${apiPrefix}/fonts/family/${encodeURIComponent(req.params.family)}`
    });
    return res.status(200).json(result ? result.data : {});
});

router.get("/families", async (req, res) => {

    let queryStr = [];

    if (req.query.perPage) {
        queryStr.push(`perPage=${parseInt(req.query.perPage)}`);
    }

    if (req.query.page) {
        queryStr.push(`page=${parseInt(req.query.page)}`);
    }

    if (req.query.families) {
        queryStr.push(`families=${encodeURIComponent(req.query.families)}`);
    }

    const url = `${apiPrefix}/fonts/families?` + queryStr.join('&');

    // prettier-ignore
    const result = await httpClient({
        url
    });

    return res.status(200).json(result ? result.data : {});
});

router.get("/types/:type", async (req, res) => {
    // prettier-ignore
    const result = await httpClient({
        url: `${apiPrefix}/fonts/types/${encodeURIComponent(req.params.type)}`
    });
    return res.status(200).json(result ? result.data : {});
});

export { router as fontRouter };
