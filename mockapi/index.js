import "dotenv/config";
import express from "express";
import { init, finish } from "./init.js";
import { authMiddleware } from "./middleware/index.js";
// Routes
import { apiPrefix } from './constants.js';
import { fontRouter } from "./routes/fonts.js";
import { assetsRoute } from "./routes/assets.js";
import { prebuiltBlocksRouter } from "./routes/prebuilt/blocks.js";
import { prebuiltEmailsRouter } from "./routes/prebuilt/emails.js";
import { prebuiltSubjectsRouter } from "./routes/prebuilt/subjects.js";
import { aiSubjectRoutes } from "./routes/ai/subjects.js";
import { aiBlockRoutes } from "./routes/ai/blocks.js";
import { aiEmailRoutes } from "./routes/ai/emails.js";
import { emailTemplatesRoutes } from "./routes/email-templates.js";
import { blockTemplatesRoutes } from "./routes/block-templates.js";
import { initializeConfigRouter } from "./routes/initialize-config.js";
import { mediaRoutes } from "./routes/media.js";

const app = express();

const port = process.env.PORT || 3088;

init({ app });

app.use('/' + apiPrefix + "/initialize-config", [authMiddleware], initializeConfigRouter);
app.use('/' + apiPrefix + "/fonts", [authMiddleware], fontRouter);
app.use('/' + apiPrefix + "/prebuilt/blocks", [authMiddleware], prebuiltBlocksRouter);
app.use('/' + apiPrefix + "/prebuilt/emails", [authMiddleware], prebuiltEmailsRouter);
app.use('/' + apiPrefix + "/prebuilt/subjects", [authMiddleware], prebuiltSubjectsRouter);
app.use('/' + apiPrefix + "/ai/subjects", [authMiddleware], aiSubjectRoutes);
app.use('/' + apiPrefix + "/ai/blocks", [authMiddleware], aiBlockRoutes);
app.use('/' + apiPrefix + "/ai/emails", [authMiddleware], aiEmailRoutes);
app.use('/' + apiPrefix + "/email-templates", [authMiddleware], emailTemplatesRoutes);
app.use('/' + apiPrefix + "/block-templates", [authMiddleware], blockTemplatesRoutes);
app.use('/' + apiPrefix + "/media", [authMiddleware], mediaRoutes);

// app.use('/' + apiPrefix + "/assets", [authMiddleware], assetsRoute);


finish({ app, port });
