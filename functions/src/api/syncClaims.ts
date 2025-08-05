import { Router } from "express";
import { verifyAuth} from "../middlewares/auth";
import { admin } from "../firebaseAdmin";

const router = Router();

router.post("/", verifyAuth, async (req, res) => {
	const uid = (req as any).auth.uid;
	try {
		const snapshot = await admin.firestore().collection("acesso").where("id", "==", uid).where("status", "==", true).get();
		const isAdmin = !snapshot.empty && snapshot.docs[0].data()?.role === 'admin';
		if (isAdmin) {
			await admin.auth().setCustomUserClaims(uid, { admin: true });
			return res.send("Claim admin aplicado");
		} else {
			await admin.auth().setCustomUserClaims(uid, {});
			return res.send("Claim removido (não é admin no Firestore)");
		}
	} catch (err) {
		return res.status(500).send("Erro ao aplicar claims");
	}
  }
);

export default router;
