/////////////////////////////////////////
///// variables globales/////////////////
////////////////////////////////////////
var bit = new Array(8) // Crée une Array de 8 cases vides
var binaireValue = false

/////////////////////////////////////////
///// abonnements///////////////////////
////////////////////////////////////////


function demarrage () { 
// Ici on récupère les objets HTML dont on a besoin grâce à getElementById 
	var down = document.getElementById('down').addEventListener('click', convertirEnDecimal)
	var up = document.getElementById('up').addEventListener('click', convertirEnBinaire)
// Ici on abonne les objets dont on a besoin avec addEventListener
	for (var i = 0; i < 8; i ++){
		document.getElementById('b'+i).addEventListener('keydown', verification)
	}
	document.getElementById('decimalInput').addEventListener('keydown', verificationDecimal)
	
}


////////////////////////////////////////
//////////////fonctions/////////////////
////////////////////////////////////////

//vérification de la touche pour les binaires
function verification(event) {
	var key = event.key
	console.log(key + ' : ' + event.keyCode)
	var acceptedKey = ['1','0','Backspace','Tab'] 				//Les touches autorisées (on ne fait pas avec le keyCode car 49=& && 49=1)
	if(acceptedKey.indexOf(key) != -1) { 					//Si la recherche de la touche dans le tableau est trouvé alors la touche est accepté
		console.log('La touche ' + key + ' est accepte !')
	} else {
		console.log('La touche ' + key + ' est  refuse !') 		//-1 signifie que la recherche n'a pas aboutit
		event.preventDefault();
	}
}

function verificationDecimal(event) {
	var key = event.key
	console.log(key + ' : ' + event.keyCode)
	var acceptedKey = ['0','1','2','3','4','5','6','7','8','9','Backspace','Tab']
	var decimalValeur = document.getElementById('decimalInput').value
	console.log(decimalValeur)
	if(acceptedKey.indexOf(key) != -1 && decimalInput < 255) {
		console.log('La touche ' + key + ' est accepte !')
	} else {
		console.log('La touche ' + key + ' est  refuse !') 		
		event.preventDefault();
	}
}
////////////////////////////////////////
//////////////CORPS/////////////////////
////////////////////////////////////////
function convertirEnDecimal() {
	bit = [] //Rénitialisation de l'array
	//Récupération des valeurs données dans un tableau
	for (var i = 0; i < 8; i++){
		bit.push(document.getElementById('b'+i).value)
	}
	console.log(bit)
	//Soit bit[0] correspond à la valeur de b0 etc..
	var valeur = (bit[0]*Math.pow(2,7)) +(bit[1]*Math.pow(2,6)) + (bit[2]*Math.pow(2,5)) + (bit[3]*Math.pow(2,4)) + (bit[4]*Math.pow(2,3)) + (bit[5]*Math.pow(2,2)) + (bit[6]*Math.pow(2,1)) + (bit[7]*Math.pow(2,0))
	document.getElementById('decimalInput').value = valeur
	console.log('Decimal : ' + valeur)

}

function convertirEnBinaire() {
	bit = []
	var valeur = document.getElementById('decimalInput').value
	for(var i=0; i < 8; i++) {
		if(valeur > Math.pow(2,(7-i))) {
			bit.push('1')
			valeur = valeur - Math.pow(2,(7-i))
		} else {
			bit.push('0')
		}
	}
	console.log('Binaire : ' + valeur)

	for(var i=0; i < 8; i++) {
	document.getElementById('b'+i).value = bit[i]
	}
}

function convertirEnHexaDecimal() {

}

window.addEventListener("load", demarrage); // attends le chargement complet pour démarrer
