import styles from "./style.module.css";
import fundo from "./../../assets/3.png";

type Props = {
	text: string;
	img:string;
	action: () => void;
};

export const CardButton = ({ text, action, img }: Props) => {
	return (
		<button className={styles.btn} onClick={() => action()}>
			<img className={styles.carta} src={img} alt="AAAAA" />
			<img className={styles.fundo} src={fundo} alt="" />
			<span className={styles.btnText}>{text}</span>
		</button>
	);
};
