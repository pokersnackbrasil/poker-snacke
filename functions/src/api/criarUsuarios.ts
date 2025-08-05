import { Router } from "express";
import { verifyAuth, requireAdmin } from "../middlewares/auth";
import { admin } from "../firebaseAdmin";

const router = Router();

interface NovoUsuarioDtoCadastro {
	email: string;
	nome: string;
	password: string;
	nivel: string;
	observacao: string;
	telefone: string;
}
// interface NovoUsuario {
// 	currentSession: string;
// 	dataCadastro: Timestamp;
// 	data_ultimo_pagamento: Timestamp;
// 	dinamico: boolean;
// 	email: string;
// 	id: string;
// 	nome: string;
// 	status: boolean;
// 	status_ultimo_pagamento: boolean;
// 	telefone: string;
// }
// interface NovoAcesso {
// 	dataCadastro: Timestamp;
// 	dataFim: Timestamp|null;
// 	dataInicio: Timestamp;
// 	id: string;
// 	nivel: string;
// 	observacao: string;
// 	status: boolean;
// }

router.post("/", verifyAuth, requireAdmin, async (req, res) => {
	const usuario: NovoUsuarioDtoCadastro = req.body.usuario;

	if (!usuario) return res.status(400).send("Dados Inválidos.");
	let resultado = {};

	try {
		const novo = await admin.auth().createUser({
			email: usuario.email,
			password: usuario.password,
			displayName: usuario.email,
		});
		try {
			await admin
				.firestore()
				.collection("usuario")
				.doc(novo.uid)
				.set({
					email: usuario.email,
					nome: usuario.nome,
					status: true,
					telefone: usuario.telefone || "",
					currentSession: "",
					dataCadastro: admin.firestore.Timestamp.now(),
					data_ultimo_pagamento: admin.firestore.Timestamp.now(),
					dinamico: true,
					id: novo.uid,
					status_ultimo_pagamento: true,
				});

			try {

				await admin
				.firestore()
				.collection("acesso")
				.add({
					dataCadastro: admin.firestore.Timestamp.now(),
					dataFim: null,
					dataInicio: admin.firestore.Timestamp.now(),
					id: novo.uid,
					nivel: usuario.nivel,
					observacao: usuario.observacao,
					status: true,
				});

				resultado = { sucesso: true, uid: novo.uid, email: usuario.email };
			} catch (e) {
				await admin.auth().deleteUser(novo.uid);
				resultado = { sucesso: false, erro: e, email: usuario.email };
			}
		} catch (e) {
			await admin.auth().deleteUser(novo.uid);
			resultado = { sucesso: false, erro: e, email: usuario.email };
		}
	} catch (e: any) {
		resultado = { sucesso: false, erro: e.message, email: usuario.email };
	}

	return res.json(resultado);
});

export default router;
