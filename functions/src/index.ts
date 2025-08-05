import * as functions from "firebase-functions";
import express from "express";
import criarUsuariosRouter from "./api/criarUsuarios";
import syncClaims from "./api/syncClaims";

import verificaStatusValidacaoEmail from "./api/verificaStatusValidacaoEmail";
import cors from "cors";
import { errorHandler } from "./utils/errors";

//settings
const app = express();
app.use(cors({ origin: true, methods: ['GET','POST','PUT','DELETE','OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

app.get("/test", (req, res) => { res.send("Servidor funcionando! -")});

app.use("/criarUsuarios", criarUsuariosRouter);
app.use("/verificaStatusValidacaoEmail", verificaStatusValidacaoEmail);
app.use("/syncClaims", syncClaims);

app.use(errorHandler);

export const api = functions.https.onRequest(app);

