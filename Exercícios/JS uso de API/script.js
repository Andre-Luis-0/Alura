async function buscarEndereco(cep){
	const ElementMensagemDErro = document.getElementById('erro')
	try{
	const endrerecoBruto = await fetch(`http://viacep.com.br/ws/${cep}/json/`)
	const endereco = await endrerecoBruto.json()
	if(endereco.erro){
		throw Error ('Errou')
	}
	console.log(endereco)
	let elementoCidade = document.getElementById('cidade')
	let elementoLogradouro = document.getElementById('endereco')
	let elementoEstado = document.getElementById('estado')
	elementoCidade.value = endereco.localidade
	elementoLogradouro.value = endereco.logradouro
	elementoEstado.value = endereco.uf
	ElementMensagemDErro.innerHTML = ''
	return endereco
	} catch(erro) {
		console.log(erro)
		ElementMensagemDErro.innerHTML = 'CEP inválido'
	}

}

const elementoCEP = document.getElementById('cep')
elementoCEP.addEventListener('focusout',()=>buscarEndereco(elementoCEP.value))

/* const ceps = ['01001000','01301001']
const Cceps = ceps.map(cep=>buscarEndereco(cep))
console.log(Cceps)
Promise.all(Cceps).then(r=>console.log(r)) */