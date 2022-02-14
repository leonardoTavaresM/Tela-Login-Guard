const inputEmail = document.querySelector('[data-input-email]')
const inputSenha = document.querySelector('[data-input-password]')
const buttonEntrar = document.getElementById('button-entrar')
const form = document.querySelector('[data-form]')
const buttonGenerator = document.querySelector('[data-button-generator]')

const password = "Test@1234";

const randomKey = (event)=>{
    event.preventDefault()
    let key = parseInt(Math.random()*1000000)
    if(key<=100000){
        key=parseInt(Math.random()*1000000)
    }else{
        console.log(key)
        ValidarMalta(key)
    }
}


const ValidarMalta = (key)=>{
    
    console.log(key)
    console.log('botao malta foi')
    const inputMalta = document.querySelector('[data-malta-key]').value
    console.log(inputMalta)
    
    if(inputMalta==key){
        console.log('deu certo')
    }
}

const maltaGuardActive = ()=>{
    const buttonMalta = document.querySelector('[data-button-malta]')
    buttonMalta.addEventListener('click', randomKey)
    const maltaGuard = document.querySelector('[data-malta-guard]')
    maltaGuard.classList.toggle('malta-guard-active')
}

const verifications = ()=>{
    const email = document.querySelector('[data-input-email]').value
    const senha = document.querySelector('[data-input-password]').value
    const labelEmailIncorrect = document.querySelector('[data-email-incorrect]')
    const labelSenhaIncorrect = document.querySelector('[data-senha-incorrect]')
    ValidarEmail(email)
    ValidarSenha(senha)
    

    if(ValidarSenha(senha).result){
        inputSenha.classList.add('active-input-senha-correct')
        inputSenha.classList.remove('active-input-senha-error')
        labelSenhaIncorrect.remove('active-label-required-senha-incorrect')
    }else if(ValidarSenha(senha).result==false){
        inputSenha.classList.add('active-input-senha-error')
        inputSenha.classList.remove('active-input-senha-correct')
        labelSenhaIncorrect.classList.add('active-label-required-senha-incorrect')
    }
    if(ValidarEmail(email) && ValidarSenha(senha).result){
        maltaGuardActive()
    }
}



const handleClick = (event)=>{
    event.preventDefault()
    verifications()
    
};

// const handleKeyPressSenha = (event)=>{
    
//     if(event.key == 'Enter'){
//         verifications()
//     }   
// };


const handleKeyPress = (event)=>{
    if(event.key == 'Enter'){
        console.log('to dando enter')
        verifications()
    }   
};


const ValidarSenha = (p)=>{
    const labelSenha = document.querySelector('[data-label-senha]')
    const labelSenhaIncorrect = document.querySelector('[data-senha-incorrect]')
    const anUpperCase = /[A-Z]/;
    const aLowerCase = /[a-z]/; 
    const aNumber = /[0-9]/;
    const aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    const obj = {};
    obj.result = true;

    if(p==""){
        labelSenha.classList.add('active-label-senha')
        inputSenha.classList.add('active-input-senha-error')
        
    }else if(p.length>=1){
        labelSenha.classList.remove('active-label-senha')
        inputSenha.classList.remove('active-input-senha-error')
    }
    if(p.length < 8){
        obj.result=false;
        obj.error="Not long enough!"
        return obj;
    }
    let numUpper = 0;
    let numLower = 0;           
    let numNums = 0;
    let numSpecials = 0;

    for(let i=0; i<p.length; i++){
        if(anUpperCase.test(p[i]))
            numUpper++;
        else if(aLowerCase.test(p[i]))
            numLower++;
        else if(aNumber.test(p[i]))
            numNums++;
        else if(aSpecial.test(p[i]))
            numSpecials++;
    }

    // console.log(numUpper)
    // console.log(numLower)
    // console.log(numNums)
    // console.log(numSpecials)
    
    if(numUpper < 1 || numLower < 1 || numNums < 1 || numSpecials<1){
        obj.result=false;
        obj.error="Senha Incorreta";
        return obj;
    }
    return obj;
}

const ValidarEmail = (email) =>{
    const emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    const labelEmail = document.querySelector('[data-label-email]');
    const labelEmailIncorrect = document.querySelector('[data-email-incorrect]')
    if(email == ""){
        labelEmail.classList.add('active-label-email');
        inputEmail.classList.add('active-input-senha-email');
        
    }else if(email.length>=1){
        labelEmail.classList.remove('active-label-email')
        inputEmail.classList.remove('active-input-senha-email');
    }
    if(emailPattern.test(email)){
        inputEmail.classList.add('active-input-email-correct');
        inputEmail.classList.remove('active-input-email-error');
    }else if(emailPattern.test(email)==false){
        inputEmail.classList.add('active-input-email-error');
        inputEmail.classList.remove('active-input-email-correct');
        labelEmailIncorrect.classList.add('active-label-required-email-incorrect')
    }
    return emailPattern.test(email); //test faz uma busca entre o parametro e a variavel, retornando true ou false
}
buttonGenerator.addEventListener('click', randomKey)
buttonEntrar.addEventListener('click', handleClick)
inputEmail.addEventListener('keypress', handleKeyPress)
inputSenha.addEventListener('keypress', handleKeyPress)


//   console.log('teste');
//   console.log(ValidarEmail('teste@teste@teste.com'));
//   console.log(ValidarEmail('teste@teste.com'));
//   console.log(ValidarEmail('teste@.teste.com.br'));


// const password = "TEstpass12aaaaaaa$$";

// console.log(isOkPass(password));



