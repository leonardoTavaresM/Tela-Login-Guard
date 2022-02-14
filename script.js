const inputEmail = document.querySelector("[data-input-email]");
const inputSenha = document.querySelector("[data-input-password]");
const buttonEntrar = document.getElementById("button-entrar");
const form = document.querySelector("[data-form]");
const buttonGenerator = document.querySelector("[data-button-generator]");
const buttonMalta = document.querySelector("[data-button-malta]");

const generateRandomKey = () => {
  let key = parseInt(Math.random() * 1000000);
  while (key <= 100000) {
    key = parseInt(Math.random() * 1000000);
  }

  return sessionStorage.setItem("authKey", key.toString());
};
generateRandomKey();

const logar = () => {
  const key = getStoredObject("authKey");
  const logado = document.querySelector("[data-logado]");
  const inputAuthKey = document.querySelector("[data-malta-key]").value;

  if (inputAuthKey === key) {
    logado.classList.add("malta-guard-active");
  } else {
    alert("Chave incorreta");
  }
};

const showKey = () => {
  // debugger
  const key = getStoredObject("authKey");

  alert(`Sua chave: ${key}`);
};

const maltaGuardActive = () => {
  const maltaGuard = document.querySelector("[data-malta-guard]");
  maltaGuard.classList.toggle("malta-guard-active");
};

const verifications = () => {
  const email = document.querySelector("[data-input-email]").value;
  const senha = document.querySelector("[data-input-password]").value;
  const labelEmailIncorrect = document.querySelector("[data-email-incorrect]");
  const labelSenhaIncorrect = document.querySelector("[data-senha-incorrect]");
  ValidarEmail(email);
  validadePassword(senha);
  verifyPassword(senha);

  if (ValidarEmail(email) && validadePassword(senha).result) {
    maltaGuardActive();
  }
};

const handleClick = (event) => {
  event.preventDefault();
  verifications();
};

const handleKeyPress = (event) => {
  if (event.key == "Enter") {
    console.log("to dando enter");
    verifications();
  }
};

//
const verifyPassword = (senha) => {
  const labelSenha = document.querySelector("[data-label-senha]");
  const labelSenhaIncorrect = document.querySelector("[data-senha-incorrect]");
  if (senha === "") {
    labelSenha.classList.add("active-label-senha");
    inputSenha.classList.add("active-input-senha-error");
    return null
  } else if (senha.length >= 1) {
    labelSenha.classList.remove("active-label-senha");
    inputSenha.classList.remove("active-input-senha-error");
    if (validadePassword(senha).result == false) {
      inputSenha.classList.add("active-input-senha-error");
      inputSenha.classList.remove("active-input-senha-correct");
      labelSenhaIncorrect.classList.add(
        "active-label-required-senha-incorrect"
      );
    } else if (validadePassword(senha).result) {
      inputSenha.classList.add("active-input-senha-correct");
      inputSenha.classList.remove("active-input-senha-error");
    }
  }
};

//valida senha recebida digito por digito
const validadePassword = (senha) => {
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


const ValidarEmail = (email) => {
  const emailPattern =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  const labelEmail = document.querySelector("[data-label-email]");
  const labelEmailIncorrect = document.querySelector("[data-email-incorrect]");

  if (email == "") {
    labelEmail.classList.add("active-label-email");
    inputEmail.classList.add("active-input-senha-email");
    return null;
  } else if (email.length >= 1) {
    labelEmail.classList.remove("active-label-email");
    inputEmail.classList.remove("active-input-senha-email");

    if (emailPattern.test(email) == false) {
      inputEmail.classList.add("active-input-email-error");
      inputEmail.classList.remove("active-input-email-correct");
      labelEmailIncorrect.classList.add(
        "active-label-required-email-incorrect"
      );
    } else if (emailPattern.test(email)) {
      inputEmail.classList.add("active-input-email-correct");
      inputEmail.classList.remove("active-input-email-error");
    }
  }
  return emailPattern.test(email); //test faz uma busca entre o parametro e a variavel, retornando true ou false
};

//funçao de utilidade
function getStoredObject(storageKey) {
  return sessionStorage.getItem(storageKey);
}

buttonGenerator.addEventListener("click", showKey);
buttonEntrar.addEventListener("click", handleClick);
inputEmail.addEventListener("keypress", handleKeyPress);
inputSenha.addEventListener("keypress", handleKeyPress);
buttonMalta.addEventListener("click", logar);
