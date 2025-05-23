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
          action={() => handleAccess(["0","1","4","6","7"], "/spin&go&fish")}
        />
        <CardButton
          classe="btn_2"
          text="Sping & Go vs Reg"
          action={() => handleAccess(["0","2","4","5","7"], "/spin&go&reg")}
        />
        <CardButton
          classe="btn_3"
          text="-"
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
          <span style={{height:"4rem", color:'#ffffff'}}>------</span>
          <span className={styles.span1}>Hello!</span>
          <span className={styles.span2}>
            You do not yet have access to this modality.
          </span>
          <span className={styles.span3}>
            Please contact the team for purchase, Cheers!
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
