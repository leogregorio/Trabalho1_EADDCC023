
function ValidarCamposLogin(event)
{
    event.preventDefault();
    var senha = document.getElementById("senha").value;
    var email = document.getElementById("email").value;

    var validEmail = ValidateEmail(email);
    var validSenha = senha != "";
    
    fieldsAreValid = validEmail && validSenha;   
    
    if(fieldsAreValid)
    {
        window.location.href = "./pagina_reserva.html";
    }

    return fieldsAreValid;
    
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

    var validNome = ValidateName(nome);
    var validCpf = ValidateCPF(cpf);
    var validEstado = ValidateState(estado);
    var validSenha = ValidatePassword(senha, confirmaSenha);
    var validEmail = ValidateEmail(email);
    var validCep = true;
    var validConfirmaSenha = (senha == confirmaSenha);
    var validFields = validNome && validCpf && validEmail && validEstado && validSenha && validConfirmaSenha;       


    return validFields;
    
}

function ValidarCamposContato(event){
    event.preventDefault();

    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;

    var validNome = ValidadeNameContato(nome);
    var validEmail = ValidateEmail(email);
    
    result = validEmail && validNome;   
    
    return result;    
}

function ValidateEmail(x) {
    var alerta = ""
    var erro = false;

    // todo em letra minuscula
    if(x != x.toLowerCase())
    {
        alerta += "- Email precisa ser todo com letra minuscula<br/>\n";
        erro = true;
    }
    
    // primeiro caractere ser letra do alfabeto
    if( (x[0].toUpperCase == x[0].toLowerCase))
    {
        alerta += "- Primeiro caractere deve ser uma letra<br/>\n";
        erro = true;
    }

    // deve conter apenas um @
    if(CountOccurrences(x, "@") != 1)
    {
        alerta += "- Deve conter apenas um @<br/>\n";
        erro = true; 
    }
    
    
    // @ n??o pode estar na ultima posi????o
    if(x.slice(-1) == "@")
    {
        alerta += "- @ n??o pode estar na ultima posi????o<br/>\n";
        erro = true;  
    }
    
    // deve haver no minimo 1 .
    var qtdPonto = CountOccurrences(x, ".");
    if(qtdPonto < 1)
    {
        alerta += "- Deve haver, no m??nimo, um caractere ponto<br/>\n";
        erro = true; 
    }
    else if(qtdPonto > 1)
    {
        if(x.indexOf(".") < (x.indexOf("@") + 2))
        {
            alerta += "- Ponto n??o pode ser adjecente a arroba<br/>\n";
            erro = true;  
        }
        if(x.indexOf('.') == (x.length - 1))
        {
            alerta += "- Ponto n??o pode ser ultimo caractere<br/>\n";
            erro = true;  
        }
    }

    if(erro)
        document.getElementById("email-result").innerHTML = alerta;
    else
        document.getElementById("email-result").innerHTML = "";

        
    
    // var result = document.getElementById(result)
    // result.value = alerta;
    return !erro;   
}

function ValidateName(name){
    var erro = false;
    var alerta = "";
    var palavras = name.split(' ');
    if(palavras.length < 2)
    {
        alerta += "- Pelo menos dois nomes requeridos<br/>\n";
        erro = true;
    }
    
    var flag1 = false;
    var flag2 = false
    for(var i = 0; i < palavras.length; i++)
    {
        if(palavras[i].length < 3)
        {
            flag1 = true;
            erro = true; 
        }
        
        
        var primeiraLetra = palavras[i][0];
        if(IsLetter(primeiraLetra))
        {
            if(IsLowerCase(primeiraLetra)){
                alert(primeiraLetra)
                palavras[i][0] = primeiraLetra.toUpperCase();
            }
        } 
        else
        {
            flag2 = true;
            erro = true; 
        }
    }
    if(flag1)
    {
        alerta += "- Cada nome deve ter no m??nimo 3 caracteres<br/>\n";        
    }
    if(flag2)
    {
        alerta += "- Primeiro caractere de palavra deve ser letra<br/>\n";
    }
    

    if(erro)
        document.getElementById("nome-result").innerHTML = alerta;
    else
        document.getElementById("nome-result").innerHTML = "";
    

    return !erro;
}

function ValidadeNameContato(name){
    var erro = false;
    var alerta = "";
    if(name.length < 3)
    {
        erro = true;
        alerta += "- O nome deve ter pelo menos 3 caracteres<br/>";
    }
    
    if(!IsLetter(name[0]))
    {
        erro = true;
        alerta += "- O primeiro caractere deve ser uma letra<br/>"; 
    }

    if(erro)
        document.getElementById("nome-result").innerHTML = alerta;
    else
        document.getElementById("nome-result").innerHTML = "";

    return !erro;
}

function ValidateCPF(cpf){
    var erro = false;
    
    if(cpf.length != 11)
        erro = true;
    else{        
        if(!IsNumerical(cpf))
        {
            erro - true;
        }
        else{
            cpf = cpf.replace(/\.|-/g,"");
            var soma = 0;
            var j = 10;
            for(var i=0; i<=8; i++){
                soma += cpf[i] * j;
                j--;
            }
            soma = (soma*10) % 11;
            if(soma == 10 || soma == 11)
                soma=0;
            if(soma != cpf[9])
                erro = true;
            soma = 0;
            j = 11;
            for(var i = 0; i<=9; i++){
                soma += cpf[i] * j;
                j--;
            }
            soma = (soma * 10) % 11;
            if(soma == 10 || soma == 11)
                soma = 0;
            if(soma != cpf[10])
                erro = true;
        }

    }

    if(erro)
        document.getElementById("cpf-result").innerHTML = "- CPF inv??lido";
    else
        document.getElementById("cpf-result").innerHTML = "";
    return !erro;
}

function ValidateState(estado){
    var erro = false;

    if(estado.length != 2){
        erro = true;
    }
    else{
        if(!IsLetter(estado[0]) || !IsLetter(estado[1]) || estado !== estado.toUpperCase())
        erro = true;
        else{       
            var estados = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',]
            
            if(estados.indexOf(estado) == -1)
            {
                erro = true;
            }    
        }
    
    }
    
    if(erro)
        document.getElementById("estado-result").innerHTML = "- Estado inv??lido";
    else
        document.getElementById("estado-result").innerHTML = "";
    
    return !erro;
}

function ValidatePassword(password, confirmPassword)
{
    var erro = false;

    if(password.length < 6 || password.length > 12)
    {
        document.getElementById("senha-result").innerHTML = "- Senha deve ter 6-12 caracteres";
        document.getElementById("senha-forca").innerHTML = "";
        erro = true;
    }
    else
    {        
        document.getElementById("senha-result").innerHTML = "";
    }
    
    if(password != confirmPassword)
    {
        document.getElementById("confirmasenha-result").innerHTML = "- As senhas n??o conferem.";
    }
    else
        document.getElementById("confirmasenha-result").innerHTML = "";


    return !erro;
}

function CalculaForcaSenha(senha)
{
    if(senha.length == 6)
    {
        return "fraca";
    }

    var letrasMinusculas = senha.replace(/[^a-z]/g, '');
    var letrasMaiusculas = senha.replace(/[^A-Z]/g, '');
    var numeros = senha.replace(/[^0-9]/g, '');
    var simbolos = senha.replace(/[a-zA-Z0-9]/g, '');
    console.log(senha + "\n" + letrasMaiusculas + " " + letrasMinusculas + " " + numeros + " " + simbolos + " ")

    if(simbolos.length == 0)
    {
        return "fraca";
    }

    if(simbolos.length >= 2 && letrasMaiusculas.length > 0 && letrasMinusculas.length > 0 && numeros.length > 0)
    {
        if(IsUnique(simbolos))
        {
            return "forte";
        }
    }
    return "media";
}

function AtualizaForcaSenha()
{
    var senha = document.getElementById("senha").value;
    var forca = CalculaForcaSenha(senha);
    var forca_elemento = document.getElementById("senha-forca");
    if(forca == "fraca")
    {
        forca_elemento.innerHTML = "For??a da senha: FRACA";
        forca_elemento.style.color = "red"
    }
    else if(forca == "media")
    {
        forca_elemento.innerHTML = "For??a da senha: MEDIA";        
        forca_elemento.style.color = "green"
    }
    else if(forca == "forte")
    {
        forca_elemento.innerHTML = "For??a da senha: FORTE";
        forca_elemento.style.color = "blue"
    }
    else
    {
        forca_elemento.innerHTML = "";
        document.getElementById("senha-result").innerHTML = "- Senha inv??lida!";
    }
}




function SetDateBoundaryNascimento()
{
    var date = document.getElementById("nascimento");
    date.max = new Date((new Date().getTime() - new Date().getTimezoneOffset() * 60000)).toISOString().split("T")[0];
}

function SetDateBoundaryReserva()
{
    // setando a data minima de reserva
    var dataMinEntrada = new Date((new Date().getTime() - new Date().getTimezoneOffset() * 60000)+(2*24*60*60*1000)).toISOString().split("T")[0];
    var dataMinSaida = new Date((new Date().getTime() - new Date().getTimezoneOffset() * 60000)+(4*24*60*60*1000)).toISOString().split("T")[0];

    document.getElementById("entrada").min = dataMinEntrada;
    
    var dataEntrada = document.getElementById("entrada").value;
    var dataMinSaida;
    if(dataEntrada != "")
    {
        var t_dataEntrada = dataEntrada.split('-').join('/');
        var dataEntrada_ = new Date(t_dataEntrada);
        dataMinSaida = new Date((dataEntrada_.getTime() - dataEntrada_.getTimezoneOffset() * 60000)+(2*24*60*60*1000)).toISOString().split("T")[0];
    }
    
    document.getElementById("saida").min = dataMinSaida;
}





function IsUnique(str) {
    return new Set(str).size == str.length;
  }

function IsLetter(c)
{
    return c.toLowerCase() != c.toUpperCase();
}

function IsNumerical(s)
{
    for(var i = 0; i < s.length; i++)
    {
        if(IsLetter(s))
            return false;
    }
    return true;
}

function IsLowerCase(c)
{
    return c === c.toLowerCase()
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