import { useEffect, useState } from "react";
import style from "./style.module.css";
import Fundo from "../../assets/fundo2.jpg";
import PersonIcon from "../../assets/person_24px.png";
import Eye from "../../assets/eye.png";
import Hidden from "../../assets/hidden.png";
import InputText from "../../componentes/IputText";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { loginWithEmail, resetPassword } from "../../slice/auth/authThunks";
import { emailValido, senhaValida } from "../../utils/validador";
import { selectAuthAuthenticated } from "../../slice/auth/authSelectors";

export default function Login() {
	//   const userData = useAppSelector(state => state.user);
	const isAuthenticated = useAppSelector(selectAuthAuthenticated);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showresetPasswordPopUp, setShowresetPasswordPopUp] = useState(false);

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/home", { replace: true });
		}
	}, [isAuthenticated, navigate]);

	const login = (email: string, password: string) => {
		dispatch(loginWithEmail({ email, password }));
	};
	const resetSenha = async (email: string) => {
		const result = dispatch(resetPassword(email));
		if(await result) toast.success("Password reset email sent successfully")
		setShowresetPasswordPopUp(false)
	};

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();

		if (!emailValido(email)) {
			// console.log("email invalido")
			toast.error("Invalid email!");
			return;
		}
		if (!senhaValida(password)) {
			toast.error("Invalid password!");
			return;
		}
		login(email, password);
	};
	const handleRedefiniSenha = (e: React.FormEvent) => {
		e.preventDefault();
		if (!emailValido(email)) {
			toast.error("Invalid email!");
			return;
		}
		resetSenha(email)
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
			{!showresetPasswordPopUp&&<form className={style.formulario} onSubmit={handleLogin}>
				<h2 className={style.title}>Login</h2>

				<div className={style.inputGroup}>
					<InputText type="email" placeholder="E-mail" value={email} setValue={(it: string) => setEmail(it)}>
						<img src={PersonIcon} alt="P" className={style.imagemIconInput} />
					</InputText>
				</div>

				<div className={style.inputGroup}>
					<InputText
						type={showPassword ? "text" : "password"}
						placeholder="Senha"
						value={password}
						setValue={(it: string) => setPassword(it)}
					>
						<span onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }}>
							<img src={showPassword ? Eye : Hidden} alt="P" className={style.imagemIconInput} />
						</span>
					</InputText>
				</div>

				<div className={style.options}>
					<span onClick={() => setShowresetPasswordPopUp(true)} className={style.link}>
						Redefinir senha
					</span>
				</div>

				<button className={style.loginButton} type="submit">
					SIGN IN
				</button>

			</form>}
			{showresetPasswordPopUp && (
				<div className={style.popUp}>
					<div className={style.popUpContainer}>
						<h2 className={style.title}>Reset Password</h2>
						<InputText
							type="email"
							placeholder="E-mail"
							value={email}
							setValue={(it: string) => setEmail(it)}
						>
							<img src={PersonIcon} alt="P" className={style.imagemIconInput} />
						</InputText>
						<div className={style.popUpButtons}>
							<button className={style.loginButton} onClick={() => setShowresetPasswordPopUp(false)}>
								BACK
							</button>
							<button className={style.loginButton} onClick={handleRedefiniSenha}>
								SEND
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
