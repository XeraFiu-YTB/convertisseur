/////////////////////////////////////////
///// variables globales/////////////////
////////////////////////////////////////
var bit = new Array(8) // Crée une Array de 8 cases vides
var binaireValue = false

/////////////////////////////////////////
///// abonnements///////////////////////
////////////////////////////////////////


function demarrage () { 
	var down = document.getElementById('down').addEventListener('click', convertirEnDecimal)
	var up = document.getElementById('up').addEventListener('click', convertirEnBinaire)
	document.getElementById('decimalInput').addEventListener('keydown', verificationDecimal)
	for (var i = 0; i < 8; i ++){
		document.getElementById('b'+i).addEventListener('click', changeBinaire)
	}
	matrix()
	
}


////////////////////////////////////////
//////////////fonctions/////////////////
////////////////////////////////////////

function verificationDecimal(event) {
	var key = event.key
	console.log(key + ' : ' + event.keyCode)
	var acceptedKey = ['0','1','2','3','4','5','6','7','8','9']
	var otherAccepterKey = ['Backspace','Tab','ArrowLeft','ArrowRight','Delete']
	var decimalValeur = document.getElementById('decimalInput').value
	console.log(decimalValeur)
	if(acceptedKey.indexOf(key) != -1 && decimalValeur.length < 3) {
		console.log('La touche ' + key + ' est accepte !')
	} else {
		if(otherAccepterKey.indexOf(key) != -1) {'Touche de Navigation accepté'} else {
		console.log('La touche ' + key + ' est  refuse !') 		//-1 signifie que la recherche n'a pas aboutit
		event.preventDefault();
		}
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
		if(valeur >= Math.pow(2,(7-i))) {
			bit.push('1')
			valeur = valeur - Math.pow(2,(7-i))
		} else {
			bit.push('0')
		}
	console.log(`valeur:${valeur} | Seuil:${Math.pow(2,(7-i))}`)
	}
	console.log('Binaire : ' + valeur)

	for(var i=0; i < 8; i++) {
	document.getElementById('b'+i).value = bit[i]
	}
}

function convertirEnHexaDecimal() {

}

function changeBinaire() {
	var valeur = this.value
	if(valeur == 0) {valeur = 1} else {valeur = 0}
	this.value = valeur
}

////////////////////////////////////////
//////////////Esthétique////////////////
////////////////////////////////////////
function matrix() {
	var canvasLeft = document.getElementById("left");
        var ctxLeft = canvasLeft.getContext("2d");
	var canvasRight = document.getElementById("right");
        var ctxRight = canvasRight.getContext("2d");
	
        var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
	//On sépare les éléments
        matrix = matrix.split("");
	console.log(`matrix:${matrix}`)

        var font_size = 10; //
        var columns = canvasLeft.width / font_size; //le Nombre de colonnes
        var drops = [];
        for(var x = 0; x < columns; x++)
            drops[x] = 1; 

        function draw()
        {
            ctxLeft.fillStyle = "rgba(0, 0, 0, 0.04)";
            ctxLeft.fillRect(0, 0, canvasLeft.width, canvasLeft.height);

            ctxLeft.fillStyle = "#0F0"; //vert
            ctxLeft.font = font_size + "px arial";
            //looping over drops
            for( var i = 0; i < drops.length; i++ )
            {
                var text = matrix[ Math.floor( Math.random() * matrix.length ) ];
                ctxLeft.fillText(text, i * font_size, drops[i] * font_size);

                //sending the drop back to the top randomly after it has crossed the screen
                //adding a randomness to the reset to make the drops scattered on the Y axis
                if( drops[i] * font_size > canvasLeft.height && Math.random() > 0.975 )
                    drops[i] = 0;

                //incrementing Y coordinate
                drops[i]++;
            }
        }

        setInterval( draw, 35 );
}
window.addEventListener("load", demarrage); // attends le chargement complet pour démarrer
