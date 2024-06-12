//Referencias a objetos
const ruleta = document.getElementById("ruleta");
let opcionesContainer;
let opciones = Array.from(document.getElementsByClassName("opcion"));
const root = document.documentElement;
const formContainer = document.getElementById("formContainer");
const modal = document.querySelector("dialog");
const totalElement = document.getElementById("porcentaje");
const botonCancelar = document.getElementById("cancelar");
const botonAceptar = document.getElementById("aceptar");
const botonAgregar = document.getElementById("agregar");
const ganadorTextoElement = document.getElementById("ganadorTexto");

/** Texto de la opción ganadora */
let ganador = "";
/** Para el setInterval que hace que el cartel de ganador anime los "..." */
let animacionCarga;
/** Estado actual de la ruleta true => Bloquea el mouse; */
let sorteando = false;
/** Contiene la lista de colores posibles para el gráfico */
const colores=[
	"FF00FF", "00FF00", "FF0000", "9400D3", "00FFFF", "FF7F50", "FF69B4", "20B2AA", "DAA520", "000080",
	"6A5ACD", "006400", "8B4513", "1E90FF", "FFFF00", "2F4F4F", "FFA500", "808000", "20B2AA", "FF4500"
];

/** Cambia la escala para hacer la herramienta pseudo responsive (faltaría un event listener al cambio de width para que sea bien responsive) */
//let escala = screen.width < 550 ? screen.width * 0.7 : 400;
//root.style.setProperty("--escala",escala+"px");

/** Contiene la suma actual de probabilidades en base 100 */
let suma = 0;
var probGeneral = 5;

/** Instancias de conceptos que se cargan al iniciar la app */
const uno = { nombre: "Kenny", nombreCompleto: "Pautas de Crianza Positiva", url: "https://drive.google.com/file/d/1zxImhGJdZGV4-xhM6aOjLQIyCpq_ce0E/view?usp=sharing", probabilidad: probGeneral }
const dos = {nombre: "Elkin", nombreCompleto: "Ecotips para el cuidado del medio ambiente", url: "https://drive.google.com/file/d/1Mg-wFKdYXdAz08_T40REhrCrTfPPVnhx/view?usp=sharing", probabilidad: probGeneral }
const tres = { nombre: "Erica", nombreCompleto: "Juegos con sabor a tradición", url: "https://drive.google.com/file/d/1qWD1MgwfLRyjbyGrJr9qN77aTXNd1ZqO/view?usp=sharing", probabilidad: probGeneral }
const cuatro = { nombre: "Gina", nombreCompleto: "Rincones magicos de la lectura familiar", url: "https://drive.google.com/file/d/17MBl8K5CAADmVAvvq-5nkzmM5MTRmbRP/view?usp=sharing", probabilidad: probGeneral }
const cinco = { nombre: "Johanna", nombreCompleto: "Teatro de sombras", url: "https://drive.google.com/file/d/1QLa1OVYE4CGgO7n_H9lK2iw_Iqv9AxLq/view?usp=sharing", probabilidad: probGeneral }
const seis = { nombre: "Keisy", nombreCompleto: "Caza del tesoro", url: "https://drive.google.com/file/d/1VheA7PrX9JkV9-RyVOfUBQBLCjeMUtHW/view?usp=sharing", probabilidad: probGeneral }
const siete = { nombre: "Dilia", nombreCompleto: "Huerta de colores", url: "https://drive.google.com/file/d/11hx6EFNYhggJyGtG7TCNT83WeuszJRJU/view?usp=drive_link", probabilidad: probGeneral }
const ocho = { nombre: "Ladys", nombreCompleto: "Desayunos divertidos y saludables para crecer fuertes", url: "https://drive.google.com/file/d/1pz2Im7qBXtOPMK-Kf1fODXpFJrfPeMUX/view?usp=sharing", probabilidad: probGeneral }
const nueve = { nombre: "Lina", nombreCompleto: "Expresando mis emociones", url: "https://drive.google.com/file/d/19j-uB0WunuFVERVrOvsJ8uw-b_N9O1xK/view?usp=sharing", probabilidad: probGeneral }
const diez = { nombre: "Lizbey", nombreCompleto: "Desinfectando superficies... Una aventura en casa", url: "https://drive.google.com/file/d/1F3H0Sgc4NHRfHa7ZJkXc86dKKLPXGt3A/view?usp=sharing", probabilidad: probGeneral }
const once = { nombre: "Luz Maria", nombreCompleto: "Explorando sonidos", url: "https://drive.google.com/file/d/1sYScBOVjdCbieOEGF0yCRAAg5dNdwXT7/view?usp=sharing", probabilidad: probGeneral }
const doce = { nombre: "Maria", nombreCompleto: "Aventuras de limpieza en el hogar", url: "https://drive.google.com/file/d/1LHN_j_I-FnCnLb66MV58av3MGyPizWGj/view?usp=sharing", probabilidad: probGeneral }
const trece = { nombre: "Monica A", nombreCompleto: "Soplare, soplare y en familia me divertiré", url: "https://drive.google.com/file/d/15gBrWsd0lsu7VA3PrbZMCb66SNlW1grT/view?usp=sharing", probabilidad: probGeneral }
const catorce = { nombre: "Monica B", nombreCompleto: "Guarda y disfruta estrategias eficaces de almacenamiento de alimentos", url: "https://drive.google.com/file/d/1RTxLME2eQidz1C_Okm4u1R6AjAxj62Oq/view?usp=sharing", probabilidad: probGeneral }
const quince = { nombre: "Nimia", nombreCompleto: "¡Nutrición en Polvo!: La Magia de Preparar tu Propia Bienestarina", url: "https://drive.google.com/file/d/1sDB3sKkJL6rDLiRX-Hqxq4P4W_1JKaGl/view?usp=sharing", probabilidad: probGeneral }
const dieciseis = { nombre: "Thianny", nombreCompleto: "Jugando en familia", url: "https://drive.google.com/file/d/1rSBYhJVyOq4jbfBRwwVTO5WKHcwVX7aj/view?usp=sharing", probabilidad: probGeneral }
const diecisiete = { nombre: "Yajhaira", nombreCompleto: "Mis amigas las verduras", url: "https://drive.google.com/file/d/1Kz6tAkQRq2_IFEIZG-L3MWGNB0ychwCq/view?usp=sharing", probabilidad: probGeneral }
const dieciocho = { nombre: "Yesenia", nombreCompleto: "Juntos en casa, juntos en seguridad", url: "https://drive.google.com/file/d/15W2KylwyiGIYVWqE5U_cGpYx5injQfPR/view?usp=sharing", probabilidad: probGeneral }
const diecinueve = { nombre: "Angelica", nombreCompleto: "El corazón de un artista", url: "https://drive.google.com/file/d/1kXWy6W_NR3TBhJGF_ScNafEAPT907dKc/view?usp=sharing", probabilidad: probGeneral }
const veinte = { nombre: "Kevin", nombreCompleto: "Aventuras de las emociones en familia", url: "https://drive.google.com/file/d/1BvAvWLe5HZePbuc5FKR1Okx2ifQ94Y24/view?usp=sharing", probabilidad: probGeneral }


let conceptos = [uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez, once, doce,
	trece, catorce, quince, dieciseis, diecisiete, dieciocho, diecinueve, veinte];


/** Pone a girar la ruleta y hace el sorteo del resultado */
function sortear(){
	sorteando = true;
	ganadorTextoElement.textContent = ".";
	animacionCarga = setInterval(()=>{
		switch( ganadorTextoElement.textContent){
			case ".":
				ganadorTextoElement.textContent = ".."
				break;
			case "..":
				ganadorTextoElement.textContent = "..."
				break;
			default:
				ganadorTextoElement.textContent = "."
				break;
		}
	} ,500)
	/** Numero del 0 al 1 que contiene al ganador del sorteo */
	const nSorteo = Math.random();
	/** Cantidad de grados que debe girar la ruleta */
	const giroRuleta = (1-nSorteo)*360 + 360*10; //10 vueltas + lo aleatorio;
	root.style.setProperty('--giroRuleta', giroRuleta + "deg");
	ruleta.classList.toggle("girar",true)
	/** Acumulador de probabilidad para calcular cuando una probabilidad fue ganadora */
	let pAcumulada = 0;
	conceptos.forEach(concepto => {
		if (nSorteo * 100 > pAcumulada && nSorteo * 100 <= pAcumulada + concepto.probabilidad) {
			ganador = 'Actividad Ganadora: ' + concepto.nombreCompleto;
			setTimeout(function () {
				window.open(concepto.url,"_self");
			}, 6500);
			//console.log("Ganador", nSorteo*100, concepto.nombre, "porque está entre ",pAcumulada, "y",pAcumulada+concepto.probabilidad)
		};
		pAcumulada +=concepto.probabilidad;
	})
}

/** Desacopla lo que ocurre al terminar de girar la ruleta de la función girar */
ruleta.addEventListener("animationend", ()=>{
	ruleta.style.transform = "rotate("+getCurrentRotation(ruleta)+"deg)";
		ruleta.classList.toggle("girar",false)
		sorteando=false;
		ganadorTextoElement.textContent = ganador;
		clearInterval(animacionCarga);
})


/** Crea todas las partes del elemento ruleta según la lista de conceptos */
function ajustarRuleta (){
	// Primero borro la ruleta anterior y creo una nueva.
	if(opcionesContainer)	ruleta.removeChild(opcionesContainer)
	opcionesContainer = document.createElement("div");
	opcionesContainer.id = "opcionesContainer";
	ruleta.appendChild(opcionesContainer);
	let pAcumulada = 0
	conceptos.forEach((concepto, i) => {
		//Creo triangulos de colores
		const opcionElement = document.createElement("div");
		opcionElement.classList.toggle("opcion",true);
		opcionElement.style = `
			--color: #${colores[i%colores.length]};
			--deg:${probabilidadAGrados(pAcumulada)}deg;
			${getPosicionParaProbabilidad(concepto.probabilidad)}`
		//opcionElement.addEventListener("click", ()=> onOpcionClicked(i))
		opcionesContainer.appendChild(opcionElement);
		//Creo textos
		const nombreElement = document.createElement("p");
		nombreElement.textContent = concepto.nombre;
		nombreElement.classList.add("nombre");
		nombreElement.style = `width : calc(${concepto.probabilidad} * var(--escala) * 1.5 / 80);
			transform: rotate(${probabilidadAGrados(concepto.probabilidad)/2+probabilidadAGrados(pAcumulada)}deg)`
		opcionesContainer.appendChild(nombreElement);
		//Creo separadores
		const separadorElement = document.createElement("div");
		separadorElement.style = `transform: rotate(${probabilidadAGrados(pAcumulada)}deg)`
		separadorElement.classList.add("separador");
		opcionesContainer.appendChild(separadorElement);
		pAcumulada += concepto.probabilidad;
		//Reseteo la posición y el cartel
		ruleta.style.transform = "rotate(0deg)";
		ganadorTextoElement.textContent = "¡Click en Girar para iniciar!";
	})
}


//Eventos de botones

document.getElementById("sortear").addEventListener("click", () => {
	if(!sorteando) sortear()
})

//function onOpcionClicked(i){
//	// Borro los elementos de la lista
//	Array.from(formContainer.children).forEach(element => formContainer.removeChild(element))
//	// Creo items de lista para cada probabilidad
//	conceptos.forEach(concepto =>{
//		agregarConfiguracionProbabilidad(concepto);
//	})
//	modal.showModal();
//	verificarValidezFormulario()
//}

botonAceptar.addEventListener("click",()=> {
	conceptos = Array.from(formContainer.children).map(opcion =>
		nuevaProbabilidad = {
			nombre: opcion.children[0].tagName==="LABEL" ? opcion.children[0].textContent : opcion.children[0].value,
			pInicial: 0,
			probabilidad: parseFloat(opcion.children[1].value)
		})
		ajustarRuleta()
		modal.close()
	});

	botonCancelar.addEventListener("click",()=> {
		modal.close();
	});


/** Revisa si  los porcentajes de probabilidades suman a 100% */
function verificarValidezFormulario(){
	suma=0;
	Array.from(formContainer.children).forEach(opcion =>{
		suma += parseFloat(opcion.children[1].value);
	})
	botonAceptar.disabled = suma !== 100; // Deshabilito el botón aceptar si la suma es distinto de 100
	totalElement.textContent = suma.toString();
	
}

// Botón "+" en el formulario de probabilidades
document.getElementById("agregar").addEventListener("click",() =>{
	agregarConfiguracionProbabilidad();
})

function agregarConfiguracionProbabilidad(probabilidad = undefined){
	const opcionContainer = document.createElement("div");
	let opcionLabel;
	const opcionInput = document.createElement("input");
	const eliminarBoton = document.createElement("button");
	if(probabilidad){
		opcionLabel = document.createElement("label");
		opcionLabel.textContent = probabilidad.nombre;
		opcionLabel.for = probabilidad.nombre;
		opcionInput.value = probabilidad.probabilidad;
		opcionLabel.type = "text";
	}
	else {
		opcionLabel = document.createElement("input");
	}
	opcionInput.type = "number";
	eliminarBoton.textContent = "X"
	opcionInput.addEventListener("change", ()=> verificarValidezFormulario())
	opcionContainer.appendChild(opcionLabel);
	opcionContainer.appendChild(opcionInput);
	opcionContainer.appendChild(eliminarBoton);
	formContainer.appendChild(opcionContainer);
	eliminarBoton.addEventListener("click",(event)=>{
		event.target.parentNode.parentNode.removeChild(event.target.parentNode); //También puede ser formContainer.removeChild(event.target.parentNode)
		verificarValidezFormulario();
	})
}


//Heptágono en Clippy https://bennettfeely.com/clippy/
//100% 360º - clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0, 50% 50%)
//87.5 315º - clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0, 0 0, 50% 50%)
//75% 270º - clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 50%, 50% 50%)
//62.5% 225º - clip-path: polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 100%, 50% 50%)
//50%	180º - clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%, 50% 50%)
//37.5%	135º - clip-path: polygon(50% 0, 100% 0, 100% 100%, 100% 100%, 50% 50%)
//25%	90º - clip-path: polygon(50% 0, 100% 0, 100% 49%, 50% 50%)
//12.5%	45º - clip-path: polygon(50% 0, 100% 0, 100% 6%, 50% 50%)
//1%	3.6º - clip-path: polygon(50% 0, 51% 0, 50% 50%);
//0%	3.6º - clip-path: polygon(50% 0, 50% 0, 50% 50%);

/** Desde una probabilidad en % devuelve un clip-path que forma el ángulo correspondiente a esa probabilidad */
function getPosicionParaProbabilidad(probabilidad){
	if(probabilidad === 100){
		return ''
	}
	if(probabilidad >= 87.5){
		const x5 = Math.tan(probabilidadARadianes(probabilidad))*50+50;
		return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0, ${x5}% 0, 50% 50%)`
	}
	if(probabilidad >= 75){
		const y5 = 100 - (Math.tan(probabilidadARadianes(probabilidad-75))*50+50);
		return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% ${y5}%, 50% 50%)`
	}
	if(probabilidad >= 62.5){
		const y5 = 100 - (0.5 - (0.5/ Math.tan(probabilidadARadianes(probabilidad))))*100;
		return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% ${y5}%, 50% 50%)`
	}
	if(probabilidad >= 50){
		const x4 = 100 - (Math.tan(probabilidadARadianes(probabilidad))*50+50);
		return `clip-path: polygon(50% 0, 100% 0, 100% 100%, ${x4}% 100%, 50% 50%)`
	}
	if(probabilidad >= 37.5){
		const x4 = 100 - (Math.tan(probabilidadARadianes(probabilidad))*50+50);
		return `clip-path: polygon(50% 0, 100% 0, 100% 100%, ${x4}% 100%, 50% 50%)`
	}
	if(probabilidad >= 25){
		const y3 = Math.tan(probabilidadARadianes(probabilidad-25))*50+50;
		return `clip-path: polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`
	}
	if(probabilidad >= 12.5){
		const y3 = (0.5 - (0.5/ Math.tan(probabilidadARadianes(probabilidad))))*100;
		return `clip-path: polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`
	}
	if(probabilidad >= 0){
		const x2 = Math.tan(probabilidadARadianes(probabilidad))*50 + 50;
		return `clip-path: polygon(50% 0, ${x2}% 0, 50% 50%)`
	}
}


/** Inicia ejecución */
ajustarRuleta();

/** Cómo dibujar ángulos en CSS */
// Al final no lo usé.
// https://stackoverflow.com/questions/21205652/how-to-draw-a-circle-sector-in-css
// x = cx + r * cos(a)
// y = cy + r * sin(a)
