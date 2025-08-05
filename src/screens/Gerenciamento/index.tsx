import { useEffect, useState } from "react";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import CabecalhoVerde from "../../componentes/CabecalhoVerde";
import { db } from "../../Server/firebase";
import style from "./style.module.css";
// import { useNavigate } from "react-router-dom";
import { ConfirmModal, DateModal } from "../../componentes/Modal";

interface UserInfo {
	id: string;
	acessoId: string;
	nome: string;
	email: string;
	statusUsuario: boolean;
	nivel: string;
	statusPagamento: boolean | string;
	data_ultimo_pagamento?: string | null;
	status_ultimo_pagamento?: boolean;
}

export default function Gerenciamento() {
	const [usuarios, setUsuarios] = useState<UserInfo[]>([]);
	const [confirm, setConfirm] = useState<{
		message: string;
		onConfirm: () => void;
		onCancel: () => void;
	} | null>(null);
	const [dateModal, setDateModal] = useState<{
		onSave: (date: string) => void;
		onCancel: () => void;
	} | null>(null);
	// const navigate = useNavigate();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const usersSnapshot = await getDocs(collection(db, "usuario"));
				const list: UserInfo[] = [];
				for (const docUser of usersSnapshot.docs) {
					const dataUser = docUser.data();
					let nivel = "";
					let statusPagamento: boolean | string = "N/A";
					let acessoId = "";
					const acessoQuery = query(collection(db, "acesso"), where("id", "==", dataUser.id));
					const acessoSnapshot = await getDocs(acessoQuery);
					if (!acessoSnapshot.empty) {
						const acessoData = acessoSnapshot.docs[0].data();
						acessoId = acessoSnapshot.docs[0].id;
						nivel = String(acessoData.nivel);
						statusPagamento = acessoData.status;
					}
					list.push({
						id: docUser.id,
						acessoId,
						nome: dataUser.nome,
						email: dataUser.email,
						statusUsuario: dataUser.status,
						nivel,
						statusPagamento,
						data_ultimo_pagamento: dataUser.data_ultimo_pagamento || null,
						status_ultimo_pagamento: dataUser.status_ultimo_pagamento || false,
					});
				}
				setUsuarios(list);
			} catch (e) {
				console.error("Erro ao buscar usuários", e);
			}
		};

		fetchUsers();
	}, []);

	const toggleStatusUsuario = (index: number) => {
		const usuario = usuarios[index];
		const novoStatus = !usuario.statusUsuario;
		setConfirm({
			message: "Tem certeza desta ação?",
			onConfirm: async () => {
				await updateDoc(doc(db, "usuario", usuario.id), { status: novoStatus });
				const updated = { ...usuario, statusUsuario: novoStatus };
				setUsuarios((prev) => prev.map((u, i) => (i === index ? updated : u)));
				setConfirm(null);
			},
			onCancel: () => {
				setConfirm(null);
			},
		});
	};

	const toggleStatusPagamento = (index: number) => {
		const usuario = usuarios[index];
		const novoStatus = !(usuario.statusPagamento === true);
		setConfirm({
			message: "Tem certeza desta ação?",
			onConfirm: () => handleConfirmPagamento(usuario, index, novoStatus),
			onCancel: () => setConfirm(null),
		});
	};

	const handleConfirmPagamento = (usuario: UserInfo, index: number, novoStatus: boolean) => {
		if (novoStatus) {
			setConfirm({
				message: "Pagamento realizado hoje?",
				onConfirm: async () => {
					const today = new Date().toISOString().split("T")[0];
					await Promise.all([
						updateDoc(doc(db, "acesso", usuario.acessoId), { status: true }),
						updateDoc(doc(db, "usuario", usuario.id), {
							data_ultimo_pagamento: today,
							status_ultimo_pagamento: true,
						}),
					]);
					const updated = {
						...usuario,
						statusPagamento: true,
						data_ultimo_pagamento: today,
						status_ultimo_pagamento: true,
					};
					setUsuarios((prev) => prev.map((u, i) => (i === index ? updated : u)));
					setConfirm(null);
				},
				onCancel: () => {
					setConfirm(null);
					setDateModal({
						onSave: async (date) => {
							await Promise.all([
								updateDoc(doc(db, "acesso", usuario.acessoId), { status: true }),
								updateDoc(doc(db, "usuario", usuario.id), {
									data_ultimo_pagamento: date,
									status_ultimo_pagamento: true,
								}),
							]);
							const updated = {
								...usuario,
								statusPagamento: true,
								data_ultimo_pagamento: date,
								status_ultimo_pagamento: true,
							};
							setUsuarios((prev) => prev.map((u, i) => (i === index ? updated : u)));
							setDateModal(null);
						},
						onCancel: () => setDateModal(null),
					});
				},
			});
		} else {
			setConfirm({
				message: "Tem certeza desta ação?",
				onConfirm: async () => {
					await Promise.all([
						updateDoc(doc(db, "acesso", usuario.acessoId), { status: false }),
						updateDoc(doc(db, "usuario", usuario.id), {
							status_ultimo_pagamento: false,
						}),
					]);
					const updated = {
						...usuario,
						statusPagamento: false,
						status_ultimo_pagamento: false,
					};
					setUsuarios((prev) => prev.map((u, i) => (i === index ? updated : u)));
					setConfirm(null);
				},
				onCancel: () => setConfirm(null),
			});
		}
	};

	return (
		<div className={style.container}>
			<CabecalhoVerde>
				<span className={style.title}>Gerenciamento</span>
			</CabecalhoVerde>
			<div className={style.menu}>
				{/* <button className={style.linkButton} onClick={() => navigate("/register")}>
					Criar Usuário
				</button> */}
			</div>
			<table className={style.table}>
				<thead>
					<tr>
						<th>Nome</th>
						<th>E-mail</th>
						<th>Status</th>
						<th>Nível de Acesso</th>
						<th>Status de Pagamento</th>
					</tr>
				</thead>
				<tbody>
					{usuarios.map((u, idx) => (
						<tr key={idx}>
							<td>{u.nome}</td>
							<td>{u.email}</td>
							<td>
								<input
									type="checkbox"
									checked={u.statusUsuario}
									onChange={() => toggleStatusUsuario(idx)}
								/>
							</td>
							<td>{u.nivel}</td>
							<td>
								<input
									type="checkbox"
									checked={u.statusPagamento === true}
									onChange={() => toggleStatusPagamento(idx)}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{confirm && (
				<ConfirmModal message={confirm.message} onConfirm={confirm.onConfirm} onCancel={confirm.onCancel} />
			)}
			{dateModal && <DateModal onSave={dateModal.onSave} onCancel={dateModal.onCancel} />}
		</div>
	);
}
