const inputSenha = document.querySelector("[data-input-password]");

export const VerifyPassword = (senha) => {
  const labelSenha = document.querySelector("[data-label-senha]");
  const labelSenhaIncorrect = document.querySelector("[data-senha-incorrect]");
  if (senha === "") {
    labelSenha.classList.add("active-label-senha");
    inputSenha.classList.add("active-input-senha-error");
    return null;
  } else if (senha.length >= 1) {
    labelSenha.classList.remove("active-label-senha");
    inputSenha.classList.remove("active-input-senha-error");
    if (ValidadePassword(senha).result == false) {
      inputSenha.classList.add("active-input-senha-error");
      inputSenha.classList.remove("active-input-senha-correct");
      labelSenhaIncorrect.classList.add(
        "active-label-required-senha-incorrect"
      );
      alert("Sua senha deve conter 8 digitos com letra maiuscula, numero e caracter especial")
    } else if (ValidadePassword(senha).result) {
      inputSenha.classList.add("active-input-senha-correct");
      inputSenha.classList.remove("active-input-senha-error");
    }
  }
};

//valida senha recebida digito por digito
export const ValidadePassword = (senha) => {
  const anUpperCase = /[A-Z]/;
  const aLowerCase = /[a-z]/;
  const aNumber = /[0-9]/;
  const aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
  const obj = {};
  obj.result = true;

  if (senha.length < 8) {
    obj.result = false;
    obj.error = "Not long enough!";
    return obj;
  }
  let numUpper = 0;
  let numLower = 0;
  let numNums = 0;
  let numSpecials = 0;

  for (let i = 0; i < senha.length; i++) {
    if (anUpperCase.test(senha[i])) numUpper++;
    else if (aLowerCase.test(senha[i])) numLower++;
    else if (aNumber.test(senha[i])) numNums++;
    else if (aSpecial.test(senha[i])) numSpecials++;
  }

  if (numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials < 1) {
    obj.result = false;
    obj.error = "Senha Incorreta";
    return obj;
  }
  return obj;
};
