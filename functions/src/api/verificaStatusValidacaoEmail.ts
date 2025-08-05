import { Router } from "express";
import { verifyAuth } from "../middlewares/auth";
import { admin } from "../firebaseAdmin";

const router = Router();

router.post("/", verifyAuth, async (req, res) => {
	const usuariosUids = req.body.usuariosUId;

	if (!Array.isArray(usuariosUids)) return res.status(400).send("Lista inválida.");

	try {
		const promessas = usuariosUids.map(async (uid) => {
			try {
				const userRecord = await admin.auth().getUser(uid);
				return {
					uid,
					emailVerificado: userRecord.emailVerified,
				};
			} catch (error: any) {
				return {
					uid,
					erro: `Erro ao buscar usuário: ${error.message}`,
				};
			}
		});
		const resultados = await Promise.all(promessas);
		return res.json({ sucesso: true, resultados });
	} catch (e: any) {
		return res.status(500).json({ sucesso: false, erro: e.message });
	}
});

export default router;
