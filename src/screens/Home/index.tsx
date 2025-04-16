import styles from "./style.module.css";
import { CardButton } from "../../componentes/CardButton";
import CabecalhoVerde from "../../componentes/CabecalhoVerde";

import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useState } from "react";

export function Home() {
  const navigate = useNavigate();

  const levelAccess = useSelector((state: RootState) => state.user.levelAccess);
  const userData = useSelector((state: RootState) => state.user.userData);

  const handleAccess = (requiredAccess: string | string[], page: string) => {
    if (!levelAccess) return setShowModal(true);

    const requiredLevels = Array.isArray(requiredAccess) ? requiredAccess : [requiredAccess];

    const hasPermission = requiredLevels.some((level) => levelAccess.includes(level));

    if (hasPermission) navigate(page);
    else setShowModal(true);
  };

  const [ showModal, setShowModal] = useState(false)

  return (
    <>
      <div className={styles.background}>
        <CabecalhoVerde>
          {userData && <span style={{color:'#ffff', fontSize:'2rem'}}>{userData.nome}</span>}
        </CabecalhoVerde>
        <CardButton
          classe="btn_1"
          text="Sping & Go vs Fish"
          action={() => handleAccess(["1", "4"], "/spin&go")}
        />
        <CardButton
          classe="btn_2"
          text="Sping & Go vs Reg"
          action={() => handleAccess(["2", "4"], "/bountybuilders")}
        />
        <CardButton
          classe="btn_3"
          text="Outras Modalidades"
          action={() => handleAccess("3", "/bountybuilders")}
        />
      </div>
      {showModal && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <span className={styles.span1}>Olá!</span>
          <span className={styles.span2}>
            Você ainda não possui acesso a essa modalidade.
          </span>
          <span className={styles.span3}>
            Por favor, entre em contato com a equipe para aquisição, Abraços!
          </span>
          <span
            className={styles.fechar}
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          >
            x
          </span>
        </div>
      )}
    </>
  );
}