import { VerifyPassword, ValidadePassword } from "./components/Password.js";
import { ValidarEmail } from "./components/Email.js";
import { GetStoredObject } from "./components/GenerateRandomKey.js";

const inputEmail = document.querySelector("[data-input-email]");
const inputSenha = document.querySelector("[data-input-password]");
const buttonEntrar = document.getElementById("button-entrar");
const buttonGenerator = document.querySelector("[data-button-generator]");
const buttonMalta = document.querySelector("[data-button-malta]");

const logar = () => {
  const key = GetStoredObject("authKey");
  const logado = document.querySelector("[data-logado]");
  const inputAuthKey = document.querySelector("[data-malta-key]").value;

  if (inputAuthKey === key) {
    logado.classList.add("malta-guard-active");
  } else {
    alert("Chave incorreta");
  }
};

const showKey = () => {
  const key = GetStoredObject("authKey");
  alert(`Sua chave: ${key}`);
};

const maltaGuardActive = () => {
  const maltaGuard = document.querySelector("[data-malta-guard]");
  maltaGuard.classList.toggle("malta-guard-active");
};

const verifications = () => {
  const email = document.querySelector("[data-input-email]").value;
  const senha = document.querySelector("[data-input-password]").value;
  ValidarEmail(email);
  ValidadePassword(senha);
  VerifyPassword(senha);

  if (ValidarEmail(email) && ValidadePassword(senha).result) {
    maltaGuardActive();
  }
};

const handleClick = () => {
  verifications();
};

const handleKeyPress = (event) => {
  if (event.key == "Enter") {
    verifications();
  }
};

buttonGenerator.addEventListener("click", showKey);
buttonEntrar.addEventListener("click", handleClick);
inputEmail.addEventListener("keypress", handleKeyPress);
inputSenha.addEventListener("keypress", handleKeyPress);
buttonMalta.addEventListener("click", logar);
