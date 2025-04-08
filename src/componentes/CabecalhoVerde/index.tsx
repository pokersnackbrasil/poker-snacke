
import style from './style.module.css';
import {Icon} from "../IconsSocialMidia/icon";
// import facebookIcon from "../../assets/facebook.png";
// import linkedinIcon from "../../assets/linkedin.png";
import User from "../../assets/user.png";
import { globalValues } from "../../globalValues";

type CardProps = {
	children?: React.ReactNode;
};

export default function CabecalhoVerde({ children }: CardProps) {
  return (
	<div className={style.green_header__body}>
		<div className={style.green_header__icons}>
			<Icon icon={User} link={globalValues.linkFacebook} alt={"Facebook Icon"}/>
			{/* <Icon icon={InstagramIcon} link={globalValues.linkIntagram} alt={"Intagram Icon"}/>
			<Icon icon={linkedinIcon} link={globalValues.linkLinkedin} alt={"Linkedin Icon"}/> */}
	  		{children}
		</div>
	</div>
  );
}
