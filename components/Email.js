const inputEmail = document.querySelector("[data-input-email]");

export const ValidarEmail = (email) => {
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
