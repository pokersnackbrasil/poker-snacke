// functions/src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";

// Extrai e valida token
export async function verifyAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")?.split("Bearer ")[1];
  if (!token) return res.status(401).send("Token ausente");
  try {
    const decoded = await admin.auth().verifyIdToken(token);
	if(decoded){
		(req as any).auth = decoded;
		return next();
	}
	throw new Error("Erro ao verificar token: Decoded não encontrado");

  } catch (erro) {
	console.error("Erro ao verificar token:", erro);
    return res.status(401).send("Token inválido");
  }
}

// Garante que o usuário seja admin (campo custom claim)
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const auth = (req as any).auth;
  if (!auth || !auth.admin) return res.status(403).send("Acesso negado: admin req -"+ auth);
  return next();
}
