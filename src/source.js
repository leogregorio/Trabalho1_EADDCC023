
function ValidarCamposLogin(event)
{
    event.preventDefault();
    var senha = document.getElementById("senha").value;
    var email = document.getElementById("email").value;
    
    var result = "true" ? (ValidateEmail(email) && email != "" && senha != "") : "false";
    alert(result);
    
    
    return ValidateEmail(email) && email != "" && senha != "";
    
}

function ValidarCamposCadastro(event)
{
    event.preventDefault();
    var nome = document.getElementById("nome").value;
    var cpf = document.getElementById("cpf").value;
    var estado = document.getElementById("estado").value;
    var cep = document.getElementById("cep").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var confirmaSenha = document.getElementById("confirmaSenha").value;

    var result = "true" ? ( ValidateName(nome) && 
                            ValidateState(estado) && 
                            ValidateEmail(email) && 
                            ValidatePassword(senha, confirmaSenha) &&
                            ValidateCPF(cpf) &&
                            email != "" && 
                            senha != "") 
                : "false";
    alert(result);
    
    
    return ValidateEmail(email) && email != "" && senha != "";
    
}



function ValidateEmail(x) {
    var alerta = ""
    var erro = false;
    // todo em letra minuscula
    if(x != x.toLowerCase())
    {
        alerta += "- Email precisa ser todo com letra maiuscula\n";
        erro = true;
    }
    
    // primeiro caractere ser letra do alfabeto
    if( !IsLowerCase(x[0]))
    {
        alerta += "- Primeiro caractere deve ser uma letra\n";
        erro = true;
    }
    
    // deve conter apenas um @
    if(CountOccurrences(x, "@") != 1)
    {
        alerta += "- Apenas um @ permitido\n";
        erro = true; 
    }

    
    // @ não pode estar na ultima posição
    if(x.slice(-1) == "@")
    {
        alerta += "- @ não pode estar na ultima posição\n";
        erro = true;  
    }
    
    // deve haver no minimo 1 .
    var qtdPonto = CountOccurrences(x, ".");
    if(qtdPonto < 1)
    {
        alerta += "- Deve haver, no mínimo, um caractere ponto\n";
        erro = true; 
    }
    else if(qtdPonto > 1)
    {
        if(x.indexOf(".") < (x.indexOf("@") + 2))
        {
            alerta += "- Ponto não pode ser adjecente a arroba\n";
            erro = true;  
        }
    }
    alert(alerta + "fi al");
    // var result = document.getElementById(result)
    // result.value = alerta;
    return !erro;   
}

function ValidateName(name){
    var erro = false;

    var palavras = name.split(' ');
    if(palavras.length < 2)
    {
        alerta += "Pelo menos duas palavras requeridas\n";
        erro = true;
    }
    else{
        for(var i = 0; i < palavras.length; i++)
        {
            var primeiraLetra = palavras[i][0];
            if(IsLetter(primeiraLetra))
            {
                if(IsLowerCase(primeiraLetra)){
                    palavras[i][0] = primeiraLetra.toUpperCase();
                }
            } 
            else
            {
                alerta += "Primeiro caractere de palavra deve ser letra\n";
                erro = true; 
            }
        }

    }
    return !erro;
}

function ValidateCPF(cpf){
    return true;
    
}

function ValidateState(estado){
    var erro = false;
    if(estado.length != 2)
        erro = true;

    if(!IsLetter(estado[0]) || !IsLetter(estado[1]))
        erro = true;

    if(IsLowerCase(estado[0]) || IsLowerCase(estado[1]))
        erro = true;
    
    return !erro;
}

function ValidatePassword(password, confirmPassword)
{
    if(password != confirmPassword)
    {
        return false;
    }
}

function IsLetter(c)
{
    return c.toLowerCase() != c.toUpperCase();
}


function IsLowerCase(x)
{
    return x.match(/[a-z]/i);
}


function CountOccurrences(string, subString, allowOverlapping = true) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

function alertar()
{
    alert("AAAAAAAAAAAAAAAAAAAAAAAA");
}