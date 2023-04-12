 
class User {
  #nome
  #sobrenome
  constructor (nome, sobrenome) {
   this.#nome = nome
   this.#sobrenome = sobrenome
  }
  set nome(novoNome) {
   if (novoNome === '') {
     throw new Error('formato não válido')
   }
   let [nome, ...sobrenome] = novoNome.split(" ")
	console.log(sobrenome)
   sobrenome = sobrenome.join(' ')
   this.#nome = nome
   this.#sobrenome = sobrenome
  }
  get nome() {
   return this.#nome
 }
 get nome2() {
   return `${this.#nome} ${this.#sobrenome}`
 }
 get sobrenome() {
   return this.#sobrenome
 }
}
console.log(' ')
const novoUser = new User('Juliana', 'Souza')
console.log(novoUser.nome2) //'Juliana'
novoUser.nome = 'Juliana Silva Souza'
console.log(novoUser.nome2) //'Juliana'
console.log(novoUser.nome) //'Juliana'
console.log(novoUser.sobrenome) //'Silva Souza'
console.log(' ')
console.log(...novoUser.nome2.split(" "))


class User2 {
	#nome
	#email
	#cpf
	 constructor(nome, email, cpf) {
	  this.#nome = nome
	  this.#email = email
	  this.#cpf = cpf
	}
  
	get nome() {
	  return this.nome
	}
  }
  const novoUser2 = new User2('Carol', 'c@c.com', '12312312312')
console.log(novoUser2.nome)