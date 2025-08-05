const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

export const emailValido = (value:string)=>{
	try {return emailRegex.test(value);}
	catch {return false;}
}

export const senhaValida = (value:string)=>{
	try { return passwordRegex.test(value)}
	catch {return false;}
}

export const cnpjValido= (cnpj: string)=> {
	try{
		cnpj = cnpj.replace(/[^\d]+/g, '');

		if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

		const calcularDigito = (base: string, pesos: number[]) => {
		  const soma = base
			.split('')
			.reduce((acc, num, idx) => acc + parseInt(num) * pesos[idx], 0);
		  const resto = soma % 11;
		  return resto < 2 ? 0 : 11 - resto;
		};

		const base = cnpj.slice(0, 12);
		const digito1 = calcularDigito(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
		const digito2 = calcularDigito(base + digito1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

		return cnpj === base + digito1.toString() + digito2.toString();
	}
  catch {return false;}
}

export const cepValido = (cep: string)=> {
	try{
		cep = cep.replace(/\D/g, '');
		return /^[0-9]{8}$/.test(cep);
	}
  catch {return false;}
}

export const telefoneValido = (telefone: string)=> {
	try{
		const apenasNumeros = telefone.replace(/\D/g, '');
		return /^(\d{10}|\d{11})$/.test(apenasNumeros);
	}
  catch {return false;}
}

export const latitudeValida = (lat:string) => {
	try{
		const latRegex = /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
		return latRegex.test(lat);

	}
  catch {return false;}
}

export const logintudeValida = (long:string) => {
	try{
		const longRegex = /^-?((1[0-7]\d)|([1-9]?\d))(\.\d+)?$|^-?180(\.0+)?$/;
		return longRegex.test(long);
	}
	catch {return false;}
}



export const dataValida=(dateStr: string)=> {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return false;
  const [dd, mm, yyyy] = dateStr.split("/").map(Number);
  if (dd < 1 || mm < 1 || mm > 12) return false;
  const date = new Date(yyyy, mm - 1, dd);
  return (
    date.getFullYear() === yyyy &&
    date.getMonth() === mm - 1 &&
    date.getDate() === dd
  );
}
