import { useState } from "react";
import style from "./style.module.css";
import Fundo from "../../assets/fundo2.jpg";
import InputText from "../../componentes/IputText";
import PersonIcon from "../../assets/person_24px.png";
import Eye from "../../assets/eye.png";
import Hidden from "../../assets/hidden.png";
import { auth } from "../../Server/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getIdToken } from "firebase/auth";
import { globalValues } from "../../globalValues";

export function Register() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		senha: "",
		confirmarSenha: "",
		nome: "",
		nivel: "",
		observacao: "",
		telefone: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (field: string, value: string) => {
		setFormData({ ...formData, [field]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const { email, senha, confirmarSenha, nome, nivel, observacao, telefone } = formData;

		if (!email || !senha || !confirmarSenha || !nome || !nivel) {
			toast.warning("Preencha todos os campos obrigatórios.");
			return;
		}

		if (senha !== confirmarSenha) {
			toast.error("As senhas não coincidem.");
			return;
		}

		if (!/^[0-9]+$/.test(nivel)) {
			toast.error("O nível de acesso deve conter apenas números inteiros.");
			return;
		}

		try {
			setLoading(true);
			const usuarioAtual = auth.currentUser;
			if (!usuarioAtual) {
				toast.error("Você precisa estar logado para cadastrar novos usuários.");
				setLoading(false);
				return;
			}

			const token = await getIdToken(usuarioAtual);

			const usuario = {
				email,
				nome,
				password: senha,
				nivel,
				observacao,
				telefone: telefone || "",
			};

			const resposta = await fetch(`${globalValues.URLBASE}/criarUsuarios`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					usuario,
				}),
			});

			if (!resposta.ok) {
				const errorText = await resposta.text();
				throw new Error(`Erro ${resposta.status}: ${errorText}`);
			}

			const contentType = resposta.headers.get("content-type");
			const resultado = contentType?.includes("application/json") ? await resposta.json() : await resposta.text();

			if (!resultado.sucesso) {
				throw new Error(resultado.erro || "Erro ao cadastrar usuário.");
			}

			toast.success("Usuário cadastrado com sucesso!");
			setFormData({
				email: "",
				senha: "",
				confirmarSenha: "",
				nome: "",
				nivel: "",
				observacao: "",
				telefone: "",
			});
			navigate("/home");
		} catch (error: any) {
			console.error("Erro ao cadastrar:", error);
			toast.error(error.message || "Erro ao cadastrar usuário.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={style.container}
			style={{
				backgroundImage: `url(${Fundo})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<form className={style.formulario} onSubmit={handleSubmit}>
				<h2 className={style.title}>Cadastro</h2>

				<div className={style.inputGroup}>
					<InputText
						type="text"
						placeholder="Nome"
						value={formData.nome}
						setValue={(val: string) => handleChange("nome", val)}
					>
						<img src={PersonIcon} alt="" className={style.imagemIconInput} />
					</InputText>
				</div>

				<div className={style.inputGroup}>
					<InputText
						type="email"
						placeholder="E-mail"
						value={formData.email}
						setValue={(val: string) => handleChange("email", val)}
					>
						<img src={PersonIcon} alt="" className={style.imagemIconInput} />
					</InputText>
				</div>

				<div className={style.inputGroupSenha}>
					<div className={style.inputGroupSenhaInput}>
						<InputText
							type={showPassword ? "text" : "password"}
							placeholder="Senha"
							value={formData.senha}
							setValue={(val: string) => handleChange("senha", val)}
						>
							<span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
								<img src={showPassword ? Eye : Hidden} alt="" className={style.imagemIconInput} />
							</span>
						</InputText>
					</div>
					<div className={style.inputGroupSenhaInput}>
						<InputText
							type={showPassword ? "text" : "password"}
							placeholder="Confirmar Senha"
							value={formData.confirmarSenha}
							setValue={(val: string) => handleChange("confirmarSenha", val)}
						>
							<span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
								<img src={showPassword ? Eye : Hidden} alt="" className={style.imagemIconInput} />
							</span>
						</InputText>
					</div>
				</div>

				<div className={style.inputGroup}>
					<InputText
						type="tel"
						placeholder="Telefone"
						value={formData.telefone}
						setValue={(val: string) => handleChange("telefone", val)}
					>
						<img src={PersonIcon} alt="" className={style.imagemIconInput} />
					</InputText>
				</div>

				<div className={style.inputGroup}>
					<InputText
						type="text"
						placeholder="Nível de Acesso (somente números)"
						value={formData.nivel}
						setValue={(val: string) => handleChange("nivel", val)}
					/>
				</div>

				<div className={style.inputGroup}>
					<InputText
						type="text"
						placeholder="Observação"
						value={formData.observacao}
						setValue={(val: string) => handleChange("observacao", val)}
					/>
				</div>
				<div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
					<button
						className={style.voltarloginButton}
						type="button"
						onClick={() => navigate("/home")}
						disabled={loading}
					>
						Voltar
					</button>
					<button className={style.loginButton} type="submit" disabled={loading}>
						{loading ? "Cadastrando..." : "Cadastrar"}
					</button>
				</div>
			</form>
		</div>
	);
}
