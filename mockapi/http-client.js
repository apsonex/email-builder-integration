import https from "https";
import axios from "axios";
import kleur from "kleur";
import FormData from "form-data";

export const httpClient = async ({
    method = "get",
    url,
    payload = {},
    headers = {},
}) => {
    const agent = new https.Agent({ rejectUnauthorized: false });

    const isFormData = payload instanceof FormData;

    const requestHeaders = {
        ...headers,
        ...(isFormData ? payload.getHeaders() : {}),
        Authorization: `Bearer ${process.env.EMAIL_BUILDER_TOKEN}`,
    };

    // const config = {
    //     method,
    //     url: process.env.EMAIL_BUILDER_API_ENDPOINT + '/' + url.replace(/^\/+/, ""),
    //     headers: requestHeaders,
    //     ...(method.toLowerCase() !== "get" && { data: payload }),
    // };

    const endpointUrl = process.env.EMAIL_BUILDER_API_ENDPOINT + '/' + url.replace(/^\/+/, "");

    const config = {
        method,
        url: endpointUrl,
        headers: requestHeaders,
        httpsAgent: agent,
        ...(method.toLowerCase() !== "get" && { data: payload }),
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
    };

    // console.log('----url');
    // console.log(endpointUrl);
    // console.log('----url');

    try {
        const res = await axios({
            ...config,
            httpsAgent: agent,
        });
        return res;
    } catch (err) {
        console.error('');
        console.error(kleur.red('HTTP Client Error:'));
        console.error(kleur.yellow(err.response.data?.message));
        console.error(kleur.yellow(err.response.data?.file));
        console.error('');
        // console.log(config);
        return err;
    }
};
