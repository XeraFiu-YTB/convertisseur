/////////////////////////////////////////
///// variables globales/////////////////
/////////////////////////////////////////
var bit = new Array(8) // Cree une Array de 8 cases vides
var binaireValue = false
var hexaTableau = [10,'A',11,'B',12,'C',13,'D',14,'E',15,'F']
var otherAcceptedKey = ['Backspace','Tab','ArrowLeft','ArrowRight','Delete']
var newDecimalValue = 0
var newHexaDecimalValue = 0

/////////////////////////////////////////
///// abonnements///////////////////////
////////////////////////////////////////


function demarrage () {
	for (var i = 0; i < 8; i ++){
		document.getElementById('b'+i).addEventListener('click', changeBinaire)
	}
	//Verification PC ou Mobile
	if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
	    console.log("Mobile")
		document.getElementById('decimalInput').type = "button"
		document.getElementById('hexaDecimalInput').type = "button"
		document.getElementById('decimalInput').addEventListener('click', verificationDecimalMobile)
		document.getElementById('hexaDecimalInput').addEventListener('click', verificationHexaDecimalMobile)
		
	  } else {
		  console.log("PC")
		document.getElementById('decimalInput').addEventListener('keydown', verificationDecimal)
		document.getElementById('hexaDecimalInput').addEventListener('keydown', verificationHexaDecimal)
	}
	
}


////////////////////////////////////////
//////////////fonctions/////////////////
////////////////////////////////////////
function changeBinaire() {
	console.clear()
	console.log('|||||Changement Binaire|||||')
	//Si la valeur du bit est 1 alors il devient 0 et reciproquement
	if(this.value == 0) {this.value = 1} else {this.value = 0} 
	//Si il y a changement Binaire alors convertir l'octet en decimal et HexaDecimal
	convertirEnDecimal()
	convertirBinaireEnHexaDecimal()
	console.log('|||||End Convertion Binaire -> All|||||')
}

function verificationDecimalMobile() {
	var decimalValue  = prompt("Chosir un nombre entier entre 0 et 255")
	if(decimalValue <= 255) {
		document.getElementById('decimalInput').value = decimalValue
		newDecimalValue = decimalValue
		convertirEnBinaire()
		convertirBinaireEnHexaDecimal()
	} else {
		document.getElementById('decimalInput').value = 'Erreur'
	}
}
function verificationHexaDecimalMobile() {
	var acceptedKey = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
	var decimalValue  = prompt("Chosir 2 elements un chiffre en 0 et 9 ou/et une lettre entre A et F")
	decimalValue = decimalValue.toUpperCase()// Met en masjucule (ff devient FF)
	if(decimalValue.length <=2) {
		if(acceptedKey.indexOf(decimalValue) == -1) {document.getElementById('hexaDecimalInput').value = 'Erreur'}
		if(decimalValue.length == 2) {
			var separation = decimalValue.split("")
			if(acceptedKey.indexOf(separation[0]) == -1 || acceptedKey.indexOf(separation[1]) == -1) {newHexaDecimalValue = '00',document.getElementById('hexaDecimalInput').value = 'Erreur'} else {newHexaDecimalValue = decimalValue}
		}
		if(decimalValue.length == 1 ) {
			if(acceptedKey.indexOf(decimalValue) == -1) {newHexaDecimalValue = '00',document.getElementById('hexaDecimalInput').value = 'Erreur'} else {newHexaDecimalValue = `0${decimalValue}`}
		}
		if(decimalValue.length == 0) {newHexaDecimalValue = '00'}
		document.getElementById('hexaDecimalInput').value = newHexaDecimalValue
		convertirHexaDecimalEnDecimal()
		convertirEnBinaire()
	} else {document.getElementById('hexaDecimalInput').value = 'Erreur'}
}

function verificationDecimal(event) {
	console.clear()
	console.log('|||||Verification Decimal|||||')
	var key = event.key
	console.log(key + ' : ' + event.keyCode)
	var acceptedKey = ['0','1','2','3','4','5','6','7','8','9']
	var decimalValeur = document.getElementById('decimalInput').value
	var separation = decimalValeur.split("") 
	console.log(`separation:${separation}`)
	console.log(`longueur de decimal : ${decimalValeur.length}`)
	var acceptPassage = false
		if(acceptedKey.indexOf(key) != -1 && decimalValeur.length <= 2) {  //On verifie avant si key est un chiffre
			newDecimalValue = `${decimalValeur}${key}` //newDecimalValue Prend la valeur actuelle `${25}${5}` donne 255 (Car JavaScript respecte le standart ECMAScript)
				if(newDecimalValue <= 255) {
					console.log('La touche ' + key + ' est accepte !')
					convertirEnBinaire()
					convertirBinaireEnHexaDecimal()
					acceptPassage = true
				} else {
					console.log('La touche ' + key + ' est refuse !')
					document.getElementById('decimalInput').value = 255
					event.preventDefault()
				}
		} 
		if(otherAcceptedKey.indexOf(key) != -1) {
			console.log('La touche ' + key + ' est accepte')
			acceptPassage = true
		}
		if(key == 'Backspace'){
			console.log('Suppression')
			if(decimalValeur.length == 3) {newDecimalValue = `${separation[0]}${separation[1]}`} //On supprime le dernier terme
			if(decimalValeur.length == 2) {newDecimalValue = separation[0]} //On garde le premier terme
			if(decimalValeur.length <= 1) {newDecimalValue = 0}
			console.log(`Longueur = ${newDecimalValue.length} | Valeur = ${newDecimalValue}`)
			convertirEnBinaire()
			convertirBinaireEnHexaDecimal()
			acceptPassage = true
		}
		if((otherAcceptedKey.indexOf(key) == -1 && acceptedKey.indexOf(key) == -1) || decimalValeur.length >= 3 && acceptPassage == false) {
			event.preventDefault()
			console.log('Touche Refuse')
		}
		console.log('|||||End Convertion Decimal -> All|||||')
}

function verificationHexaDecimal(event) {
	console.clear()
	console.log('|||||Verification HexaDecimalInput|||||')
	var key = event.key
	console.log(key + ' : ' + event.keyCode)
	var acceptedKey = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F']
	var hexaValeur = document.getElementById('hexaDecimalInput').value
	hexaValeur = hexaValeur.toUpperCase()
	keyUP = key.toUpperCase()
	var separation = hexaValeur.split("")
	var acceptPassage = false
		if(acceptedKey.indexOf(keyUP) != -1 && hexaValeur.length < 1) {
			console.log(`hexaValeur:${hexaValeur} | longueur:${hexaValeur.length}`)
			if(hexaValeur.length == 1) {newHexaDecimalValue = `${hexaValeur}${keyUP}`} else {newHexaDecimalValue = `0${keyUP}`}
			console.log(`newHexaDecimalValue:${newHexaDecimalValue}`)
			convertirHexaDecimalEnDecimal()
			convertirEnBinaire()
			acceptPassage = true
		}
		if(otherAcceptedKey.indexOf(key) != -1) {
			console.log('La touche ' + key + ' est accepte')
			acceptPassage = true
		}
		if(key == 'Backspace'){
			console.log('Suppression')
			if(hexaValeur.length == 2) {newHexaDecimalValue = `0${separation[0]}`}
			if(hexaValeur.length <= 1) {newHexaDecimalValue = '00'} //double 0 sinon erreur pour split dans convertirHexaDecimalEnDecimal()
			convertirHexaDecimalEnDecimal()
			convertirEnBinaire()
			acceptPassage = true
		}
		if((otherAcceptedKey.indexOf(key) == -1 && acceptedKey.indexOf(keyUP) == -1) || hexaValeur.length >= 2 && acceptPassage == false) {
			event.preventDefault()
			console.log('Touche Refuse')
		}

console.log(`newHexaDecimalValue : ${newHexaDecimalValue}`)
console.log('|||||End Convertion Hexa -> All|||||')
}



////////////////////////////////////////
//////////////CORPS/////////////////////
////////////////////////////////////////
//Convertit Binaire en Decimal
function convertirEnDecimal() {
	console.log('|||||Binaire -> Decimal|||||')
	//ordre des cases Binaires|7|7-1|7-2|7-3|7-4|7-5|7-6|7-7|
	var decimal = 0	
	for( var i = 0; i < 8; i++){
		var binaire =  document.getElementById('b'+i) //Recupère l'element binaire
		var valeur = binaire.value * Math.pow (2,7-i) // (0|1) * 2^7-i 
		decimal = valeur + decimal //On ajoute la valeur 
	}
	document.getElementById("decimalInput").value = decimal
	console.log('Decimal : ' + valeur)
	console.log('|||||End Binaire -> Decimal|||||')
}
//Convertir Decimal en Binaire
function convertirEnBinaire() {
	console.log('|||||Decimal -> Binaire|||||')
	//Reinitialisation du Tableau Bit
	bit = []
	var valeur = newDecimalValue
	for(var i=0; i < 8; i++) {
		//Si valeur >= à 2^(7-i) alors le bit vaut 1 et on soustrait 2^(7-i) à la valeur
		if(valeur >= Math.pow(2,(7-i))) {
			bit.push('1')
			valeur = valeur - Math.pow(2,(7-i))
		//Sinon le bit vaut 0
		} else {
			bit.push('0')
		}
	console.log(`valeur:${valeur} | Seuil:${Math.pow(2,(7-i))}`)
	}
	console.log('Binaire : ' + valeur)
	//
	for(var i=0; i < 8; i++) {
		document.getElementById('b'+i).value = bit[i]
	}
	console.log('|||||End Decimal -> Binaire|||||')
}
//Convertit Binaire en HexaDecimal
function convertirBinaireEnHexaDecimal() {
	console.log('|||||Binaire -> HexaDecimal|||||')
	var first4Bits = 0
	var second4Bits = 0
	for(var i=0; i < 4; i++) { //Calcul le decimal des 4 premiers Bits et des 4 derniers
		first4Bits = first4Bits + (document.getElementById('b'+i).value)*Math.pow(2,3-i)
		second4Bits = second4Bits + (document.getElementById('b'+(i+4)).value)*Math.pow(2,3-i)
	}
	if(first4Bits > 9) {//Si le decimal des 4 premiers Bits et > 9 alors c'est une lettre, on regarde donc dans le tableau à quoi le decimal correspond
		let position = hexaTableau.indexOf(first4Bits) + 1
		first4Bits = hexaTableau[position]
	}
	if(second4Bits > 9) {//Si le decimal des 4 derniers Bits et > 9 alors c'est une lettre, on regarde donc dans le tableau à quoi le decimal correspond
		let position = hexaTableau.indexOf(second4Bits) + 1
		second4Bits = hexaTableau[position]
	}
	console.log(`first4Bits : ${first4Bits} | second4Bits : ${second4Bits}`)
	document.getElementById('hexaDecimalInput').value = `${first4Bits}${second4Bits}`
	console.log('|||||End Binaire -> HexaDecimal|||||')
}
//Convertir HexaDecimal en Decimal
function convertirHexaDecimalEnDecimal() {
	console.log('|||||HexaDecimal -> Decimal|||||')
	var hexa = newHexaDecimalValue.split("") //Separe les lettres|chiffres
	console.log(`hexa:${hexa}`)
	var valeur = 0
	for(var i=0; i<2; i++) {
		if(hexaTableau.indexOf(hexa[i]) == -1) {//Si hexa[i] ne correspond pas à une lettre (donc c'est un chiffre)
			console.log('Chiffre')
			valeur = valeur + (hexa[i]*Math.pow(16,1-i)) // 9 -> 9*16^1 ou 9 -> 9*16^0
		} else { //Si hexa[i] est une lettre alors on prend la valeur correspondante dans le tableau
			console.log('Lettre')
			valeur = valeur + (hexaTableau[hexaTableau.indexOf(hexa[i]) - 1] * Math.pow(16,1-i))
		}
	}
	document.getElementById('decimalInput').value = valeur
	newDecimalValue = valeur //permet la convertion Decimal -> Binaire
	console.log('|||||End HexaDecimal -> Decimal|||||')
}

window.addEventListener("load", demarrage); // attends le chargement complet pour d�marrer