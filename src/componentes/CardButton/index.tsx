import styles from "./style.module.css"

type Props = {
	classe: string;
	text: string;
  action:()=>void
};

export const CardButton = ({ classe, text ,action}:Props) => {
 return (
   <button className={`${styles[classe]} ${styles.btn}`} onClick={()=>action()}>
     <span className={styles.btnText}>{text}</span>
   </button>
 );
};