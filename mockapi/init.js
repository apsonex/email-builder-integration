import express from "express";
import cors from "cors";

export function init({ app }) {
    app.set("trust proxy", true);

    app.use(cors());

    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    app.use(
        cors({
            origin: "*",
            allowedHeaders: "*",
            methods: "*",
            credentials: true,
        })
    );
}

export function finish({ app, port }) {
    app.listen(port, () => {
        console.log(`Mock server is running on port ${port}.`);
    });
}
