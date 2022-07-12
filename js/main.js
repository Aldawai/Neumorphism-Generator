
const text = document.getElementById('color_code'),
background = document.getElementById('background'),
border_radius = document.getElementById('border_radius'),
border_radius_unit = document.getElementById('border_radius_unit'),
distance_value = document.querySelectorAll('#distance_value'),
blur_id = document.querySelectorAll('#blur_id'),
color = document.getElementById('color'),
btmShadow = document.getElementById('bottom-shadow'),
topShadow = document.getElementById('top-shadow'),
size = document.getElementById('size'),
radius = document.getElementById('radius'),
distance = document.getElementById('distance'),
blur = document.getElementById('blur'),
intensity = document.getElementById('intensity'),
button = document.getElementById('copy'),
code_container = document.getElementById('code-container'),
param = document.getElementById('param'),
elem = document.getElementById('elem');

top_couleur = "#5f5d5d";
bottom_couleur = "#ffffff";
let couleur;

let shad,
intensi = intensity.value;

let initial_color = '#e0e0e0';
bottom_couleur = Spliter(color.value.replace('#', ''), -intensi);
top_couleur = Spliter(color.value.replace('#', ''), intensi);
color.value = initial_color;
text.value = initial_color;
size.style.backgroundColor = initial_color;
elem.style.backgroundColor = initial_color;
param.style.backgroundColor = initial_color;
document.body.style.backgroundColor = initial_color;
elem.style.height = size.value+"px";
elem.style.width = size.value+"px";
elem.style.borderRadius = radius.value+"px";
elem.style.boxShadow = distance.value+"px "+distance.value+"px "+blur.value+"px "+top_couleur+","+(-distance.value)+"px "+(-distance.value)+"px "+blur.value+"px "+bottom_couleur;
document.getElementById('volet_size').innerHTML = size.value;
document.getElementById('volet_distance').innerHTML = distance.value;
document.getElementById('volet_radius').innerHTML = radius.value;
document.getElementById('volet_blur').innerHTML = blur.value;
document.getElementById('volet_intensity').innerHTML = intensity.value;

distance_value.forEach((distanceValue)=>{
	distanceValue.innerHTML = distance.value;
});

blur_id.forEach((bId)=>{
	bId.innerHTML = blur.value;
});

param.style.borderRadius = 50+"px";
param.style.boxShadow = distance.value+"px "+distance.value+"px "+blur.value+"px "+top_couleur+","+(-distance.value)+"px "+(-distance.value)+"px "+blur.value+"px "+bottom_couleur;
size.addEventListener('input',function () {
	document.getElementById('volet_size').innerHTML = size.value;
	elem.style.height = size.value+"px";
	elem.style.width = size.value+"px";
	radius.max = size.value / 2;
	elem.style.borderRadius = radius.value+"px";
});

radius.addEventListener('input', function () {
	document.getElementById('volet_radius').innerHTML = radius.value;
	if (radius.value == radius.max) {
		border_radius.innerHTML = 50;
		border_radius_unit.innerHTML = "%";
	}else{
		border_radius.innerHTML = radius.value;
		border_radius_unit.innerHTML = "px";
	}
	elem.style.borderRadius = radius.value+"px";
});

distance.addEventListener('input', function () {
	document.getElementById('volet_distance').innerHTML = distance.value;
	distance_value.forEach((distanceValue)=>{
	distanceValue.innerHTML = distance.value;
});
	blur.value = distance.value * 2;
	Shadow();
});

blur.addEventListener('input', function () {
	document.getElementById('volet_blur').innerHTML = blur.value;
	blur_id.forEach((bId)=>{
		bId.innerHTML = blur.value;
	});
	Shadow();
});

color.addEventListener('input', function () {
	couleur = color.value;
	text.value = couleur;
	background.innerHTML = couleur;
	size.style.backgroundColor = couleur;
	elem.style.backgroundColor = couleur;
	document.body.style.backgroundColor = couleur;;
	top_couleur = Spliter(color.value.replace('#', ''), -intensi);
	bottom_couleur = Spliter(color.value.replace('#', ''), intensi);
	Shadow();
});

text.addEventListener('input',function () {
	txt = text.value;
	color.value = txt;
	background.innerHTML = txt;
	size.style.backgroundColor = txt;
	elem.style.backgroundColor = txt;
	document.body.style.backgroundColor = txt;
});

intensity.addEventListener('input', ()=>{
		intensi = intensity.value;
		document.getElementById('volet_intensity').innerHTML = intensity.value;
		bottom_couleur = Spliter(color.value.replace('#', ''), intensi);
		top_couleur = Spliter(color.value.replace('#', ''), -intensi);
		Shadow();
});

function Spliter(text, val) {
		let last;
		let table = [];
		let txt = text.split('');
		for (var i = 1; i <= txt.length; i++) {
			if (i % 2 === 0) {
				table.push(last + '' +txt[i - 1]);
			}else{
				last = txt[i - 1]
			}
		}
		let count = 1;
		console.log(table);
		console.log(ret());
		function ret() {
			return "#"+table.map((e)=>{
				if (count === 1 || count === 3) {
					if (parseInt(e, 16) < (val*2)) {
						return '00';
					}else{
						// return e.toString(16) < 10 ? e.replaceAll('-','') : e.replaceAll('-','');
						if ((parseInt(e,16) + (val*2)).toString(16).length < 2) {
							return "0"+(parseInt(e, 16) + (val*2)).toString(16).replaceAll('-','');
						}else if ((parseInt(e,16) + (val*2)).toString(16).length === 2) {
							return (parseInt(e, 16) + (val*2)).toString(16).replaceAll('-','0');
						}
					}
				}else{
					if (parseInt(e, 16) < (val*2)+10) {
						return '00';
					}else{
						if ((parseInt(e,16) + (val*2)).toString(16).length < 2) {
							return "0"+(parseInt(e, 16) + (val*2) + 10).toString(16).replaceAll('-','');
						}else if ((parseInt(e,16) + (val*2)).toString(16).length === 2) {
							return (parseInt(e, 16) + (val*2) + 10).toString(16).replaceAll('-','0');
						}
						// return (parseInt(e,16) + (val*2) + 10).toString(16);
					}
				}
				count++;
			}).join('');
		}
		function nouveau() {
			console.log("#"+(parseInt(text, 16)));
			let moe = parseInt(text, 16) + val;
			return "#"+moe.toString(16);
		}
		return ret();
		// return nouveau();
	}

function Shadow() {
	btmShadow.innerText = top_couleur;
	topShadow.innerText = bottom_couleur;
	elem.style.boxShadow = distance.value+"px "+distance.value+"px "+blur.value+"px "+top_couleur+","+(-distance.value)+"px "+(-distance.value)+"px "+blur.value+"px "+bottom_couleur;
	param.style.boxShadow = distance.value+"px "+distance.value+"px "+blur.value+"px "+top_couleur+","+(-distance.value)+"px "+(-distance.value)+"px "+blur.value+"px "+bottom_couleur;
}

function copy() {
	code = document.getElementById('code').innerText;
	code_container.innerText = code;
	code_container.select();
	navigator.clipboard.writeText(code_container.value);
    // document.execCommand('copy');
}