
export function valida(input){
	const tipo = input.dataset.tipo
	if(validadores[tipo]){
		validadores[tipo](input)
	}
	if(input.validity.valid){
		input.parentElement.classList.remove('input-container--invalido')
		input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ''
	}else{
		input.parentElement.classList.add('input-container--invalido')
		input.parentElement.querySelector('.input-mensagem-erro').innerHTML = Erro(tipo,input)
	}
}

const tiposDErro = [
	'valueMissing',
	'typeMismatch',
	'patternMismatch',
	'customError'
]

const validadores = {
	dataNascimento:input=>validaDataNascimento(input),
	cpf:input=>validaCPF(input),
	cep:input=>RecuperarCEP(input)
}

const mensagensDErro = {
	nome:{
		valueMissing:'O campo nome não pode está vazio'
	},
	email:{
		valueMissing:'O campo email não pode está vazio',
		typeMismatch:'O email é invalido'
	},
	senha:{
		valueMissing:'O campo senha não pode está vazio',
		patternMismatch:'A senha deve conter pelo menos: um número, uma letra maiúscula, uma letra minúscula; não conter caractere special; possuir entre 6 e 12 caracteres'
	},
	dataNascimento: {
		valueMissing:'O campo data não pode está vazio',
		customError:'Deve ser maior de 18 anos para se cadastrar'
	},
	cpf:{
		valueMissing:'O campo cpf não pode está vazio',
		customError:'O cpf é invalido'
	},
	cep:{
		valueMissing:'O campo cep não pode está vazio',
		patternMismatch:'O cep é invalido',
		customError:'Não foi possível buscar o CEP'
	},
	logradouro:{
		valueMissing:'O campo logradouro não pode está vazio'
	},
	cidade:{
		valueMissing:'O campo cidade não pode está vazio'
	},
	estado:{
		valueMissing:'O campo estado não pode está vazio'
	},
	preco:{
		valueMissing:'O campo preço não pode está vazio'
	}
}

function Erro(tipo,input){
	let mensagem = ''
	tiposDErro.forEach(erro=>{
		if(input.validity[erro]){
			mensagem = mensagensDErro[tipo][erro]
		}
		})
	return mensagem
}

function validaDataNascimento(input){
	const dataNascimento = new Date(input.value)
	let mensagem = ''
	if(!maiorQ18(dataNascimento)){
		mensagem = 'tem q ser maior que 18 anos'
	}
	input.setCustomValidity(mensagem)


}
function maiorQ18(data){
	const hoje = new Date()
	const maiorIdadeData = new Date(data.getUTCFullYear()+18,data.getUTCMonth(),data.getUTCDate())

	return maiorIdadeData <= hoje
}
function validaCPF(input){
	const cpfFormatado = input.value.replace(/\D/g,'')
	let mensagem = ''
	if(!checaCPFRepetido(cpfFormatado)||!checarEstruturaCPF(cpfFormatado)){
		mensagem = 'O cpf é invalido'
	}
	input.setCustomValidity(mensagem)
}

function checaCPFRepetido(cpf){
	const valoresRepetidos = [
		'00000000000',
		'11111111111',
		'22222222222',
		'33333333333',
		'44444444444',
		'55555555555',
		'66666666666',
		'77777777777',
		'88888888888',
		'99999999999'
	]
	let cpfValido = true
	valoresRepetidos.forEach(valor=>{
		if(valor==cpf){
			cpfValido = false
		}
	})
	return cpfValido
}
function checarEstruturaCPF(cpf){
	const multiplicador = 10

	return checaDigitoVerificador(cpf,multiplicador)
}
function checaDigitoVerificador(cpf,mult){
	if (mult>=12){
		return true
	}
	let soma = 0
	let multParcial = mult
	const cpfSemDigitos = cpf.substr(0,mult-1).split('')
	const digitoVerificador = cpf[mult-1]
	for(let cont = 0 ; multParcial > 1; multParcial--){
		soma += cpfSemDigitos[cont]*multParcial
		cont++
	}
	
	if(digitoVerificador==confirmaDigito(soma)){
		return checaDigitoVerificador(cpf,mult+1)
	}
	return false
	
}
function confirmaDigito(soma){
	return 11 - (soma%11)
}
function RecuperarCEP(input){
	const cep = input.value.replace(/\D/g,'')
	const url = `https://viacep.com.br/ws/${cep}/json/`
	const options = {
		method: 'GET',
		mode:'cors',
		headers: {
			'content-type': 'application/json;charset=utf-8'
		}
	}
	if(!input.validity.patternMismatch && !input.validity.valueMissing){
		fetch(url,options).then(
			response => response.json()
		).then(
			data=>{
				if(data.erro){
					input.setCustomValidity('Não foi possível buscar o CEP.')
					return
				}
				input.setCustomValidity('')
				preencherComCEP(data)

			}
		)
	}
}
function preencherComCEP(data){
	const logradouro = document.querySelector('[data-tipo="logradouro"]')
	const cidade = document.querySelector('[data-tipo="cidade"]')
	const estado = document.querySelector('[data-tipo="estado"]')
	logradouro.value = data.logradouro
	cidade.value = data.localidade
	estado.value = data.uf
}