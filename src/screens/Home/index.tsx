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

  const handleAcess = (acesso:string,page:string)=>{
    if(levelAccess && acesso.split(",").map(item => item.trim()).includes(levelAccess)) navigate(page)
    else setShowModal(true)
  }

  const [ showModal, setShowModal] = useState(false)

  return (
    <div className={styles.background}>
      <CabecalhoVerde />
      <CardButton
        classe="btn_1"
        text="Sping & Go vs Fish"
        action={() => handleAcess("1", "/spin&go")}
      />
      <CardButton
        classe="btn_2"
        text="Sping & Go vs Reg"
        action={() => handleAcess("2", "/bountybuilders")}
      />
      <CardButton 
        classe="btn_3" 
        text="Outras Modalidades" 
        action={() => handleAcess("3", "/bountybuilders")} 
      />
      {showModal && <div className={styles.modal} onClick={()=>setShowModal(false)}>
        <span className={styles.span1}>Olá!</span>
        <span className={styles.span2}>Ainda não possui acesso a essa modalidade.</span>
        <span className={styles.span3}>Por favor, entre em contato com a equipe para aquisição, Abraços!</span>
        <span className={styles.fechar} style={{cursor: 'pointer'}} onClick={()=>setShowModal(false)}>x</span>
      </div>}
    </div>
  );
}