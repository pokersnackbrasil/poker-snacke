import { useState } from "react";
import style from "./style.module.css";
import Fundo from "../../assets/fundo2.jpg";
import InputText from "../../componentes/IputText";
import PersonIcon from "../../assets/person_24px.png";
import Eye from "../../assets/eye.png";
import Hidden from "../../assets/hidden.png";
import { collection, doc, addDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../Server/firebase";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
    nome: "",
    nivel: "",
    observacao: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, senha, confirmarSenha, nome, nivel, observacao } = formData;

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
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast.error("Você precisa estar logado para cadastrar novos usuários.");
        return;
      }

      // Criar novo usuário temporariamente
      const secondaryApp = await import("firebase/app").then(({ initializeApp, getApps }) => {
        const config = auth.app.options;
        const name = "Secondary";
        const apps = getApps();
        return apps.find(app => app.name === name) || initializeApp(config, name);
      });

      const { getAuth, signOut: secondarySignOut, createUserWithEmailAndPassword: createInSecondary } = await import("firebase/auth");
      const secondaryAuth = getAuth(secondaryApp);

      const { user } = await createInSecondary(secondaryAuth, email, senha);
      const uid = user.uid;

      await secondarySignOut(secondaryAuth); // desconecta usuário criado e mantém sessão principal

      const usuarioDoc = {
        id: uid,
        nome,
        email,
        status: true,
        currentSession: "",
        dinamico: true,
        dataCadastro: serverTimestamp()
      };

      const acessoDoc = {
        id: uid,
        nivel,
        status: true,
        observacao,
        dataCadastro: serverTimestamp(),
        dataInicio: serverTimestamp(),
        dataFim: null
      };

      await setDoc(doc(db, "usuario", uid), usuarioDoc);
      await addDoc(collection(db, "acesso"), acessoDoc);

      toast.success("Usuário cadastrado com sucesso!");
      setFormData({
        email: "",
        senha: "",
        confirmarSenha: "",
        nome: "",
        nivel: "",
        observacao: ""
      });
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div
      className={style.container}
      style={{
        backgroundImage: `url(${Fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
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

        <div className={style.inputGroup}>
          <InputText
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={formData.senha}
            setValue={(val: string) => handleChange("senha", val)}
          >
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={showPassword ? Eye : Hidden}
                alt=""
                className={style.imagemIconInput}
              />
            </span>
          </InputText>
        </div>

        <div className={style.inputGroup}>
          <InputText
            type={showPassword ? "text" : "password"}
            placeholder="Confirmar Senha"
            value={formData.confirmarSenha}
            setValue={(val: string) => handleChange("confirmarSenha", val)}
          >
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={showPassword ? Eye : Hidden}
                alt=""
                className={style.imagemIconInput}
              />
            </span>
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
        <div style={{ display: "flex", justifyContent: "space-between" ,width:"80%"}}>
          <button className={style.voltarloginButton} onClick={() => navigate("/home")}>Voltar</button>
          <button className={style.loginButton} type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
