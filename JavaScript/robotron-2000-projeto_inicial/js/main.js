const elementos = document.querySelectorAll("[data-controle]")
const statu = document.querySelectorAll(`[data-estatistica]`)
const pecas = {
	"bracos": {
		 "forca": 29,
		 "poder": 35,
		 "energia": -21,
		 "velocidade": -5
	},

	"blindagem": {
		 "forca": 41,
		 "poder": 20,
		 "energia": 0,
		 "velocidade": -20
	},
	"nucleos":{
		 "forca": 0,
		 "poder": 7,
		 "energia": 48,
		 "velocidade": -24
	},
	"pernas":{
		 "forca": 27,
		 "poder": 21,
		 "energia": -32,
		 "velocidade": 42
	},
	"foguetes":{
		 "forca": 0,
		 "poder": 28,
		 "energia": 0,
		 "velocidade": -2
	}
}
elementos.forEach(element => {
	element.addEventListener("click",(evento)=>{
		mudarValor(evento.target.dataset.controle, evento.target.parentNode)
		atualizarParametros()
		//console.log(Object.keys(pecas))
	})});

function mudarValor (operacao,parent){
	var contador = parent.querySelector("[data-contador]")
	if(operacao == "+"){
		contador.value = parseInt(contador.value) + 1
	}else{
		contador.value = parseInt(contador.value) - 1
	}
	
}
function atualizarParametros(){
	statu.forEach( (element) => {
		var v = 0
		const est = element.dataset.estatistica
		Object.keys(pecas).forEach( (peca) =>{
			const o = document.querySelector(`[data-contador='${peca}']`)
			var quanti = parseInt(o.value)	
			v += pecas[peca][est]*quanti 
		})
		element.innerHTML = v
	})
}