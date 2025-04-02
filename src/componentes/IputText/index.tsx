import style from './style.module.css';

type CardProps = {
	children?: React.ReactNode;
	type: string;
	placeholder: string;
	value:string
	setValue:(value:string)=>void
};

export default function InputText({ children, type, placeholder,value,setValue }: CardProps) {
  return (
	<div className={style.inputBox}>
		<input type={type} className={style.inputBox__component} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}>
		</input>
			<div className={style.childrenInput}>{children}</div>
	</div>
  )
}
