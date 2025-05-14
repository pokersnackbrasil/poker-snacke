const grupos = {
  grupoBTN: [
    "3W BTN",
    "3W BTN * REG"
  ],
  grupoSBvsBB: [
    "3W SB * BB",
    "3W SB * BB REG"
  ],
  grupoSBvsBTN: [
    "3W SB * BTN ALL-IN",
    "3W SB * BTN ALL-IN REG",
    "3W SB * BTN LIMP",
    "3W SB * BTN MR",
    "3W SB * BTN MR - REG"
  ],
  grupoBBvsBTN: [
    "3W BB * BTN 3X",
    "3W BB * BTN ALL-IN",
    "3W BB * BTN LIMP",
    "3W BB * BTN MR",
    "3W BB * BTN MR REG",
    "3W BB * BTN * SB ALL-IN"
  ],
  grupoBBvs2P: [
    "3W BB * LIMP 2P",
    "3W BB * MR 2P",
    "3W BB * MR 2P REG"
  ],
  grupoBBvsSB: [
    "3W BB * SB ALL-IN",
    "3W BB * SB LIMP",
    "3W BB * SB LIMP REG",
    "3W BB * SB MR"
  ],
  grupoHUvsSB: [
    "HU * SB",
    "HU * SB VS REG",
    "HU * SB VS MR"
  ],
  grupoHUvsBB: [
    "HU * BB VS LIMP",
    "HU * BB VS LIMP REG",
    "HU * BB VS MR REG",
    "HU * BB VS ALL-IN",
    "HU * BB VS 3X"
  ]
};

export function getGrupoRelacionado(botaoSelecionado: string, botaoCheck:string) {
  for (const [grupo, botoes] of Object.entries(grupos)) {
    if (botoes.includes(botaoSelecionado)) {

      return botoes.includes(botaoCheck);
    }else{
      if(grupo != "") return false;
    }
  }
  return false;
}