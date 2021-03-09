export function clearContainer(container) {
    container.innerHTML = "";
}

export function clearInput(input) {
    input.value = "";
}

//provided by:
//https://jsfiddle.net/stbh1g54/11/
export function lightenDarkenColor (col, amt) {
	var usePound = false;
	if (col[0] == "#") {
		col = col.slice(1);
		usePound = true;
	}
	var num = parseInt(col, 16);
	var r = (num >> 16) + amt;
	if (r > 255) {
		r = 255;
	} else if (r < 0) {
		r = 0;
	}
	var b = ((num >> 8) & 0x00FF) + amt;
	if (b > 255) {
		b = 255;
	} else if (b < 0) {
		b = 0;
	}
	var g = (num & 0x0000FF) + amt;
	if (g > 255) {
		g = 255;
	} else if (g < 0) {
		g = 0;
	}
	return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

export function errorHandler(name, color, playerExistance) {
	if(name.length > 10 || name.length < 4) return "choose a name between 4 and 10 letters"
	if(name === "" && color === undefined) return "No player name and no color chosen!"
	if(name === "") return "No player name!";
	if(!color) return "No color chosen!";
	if(!playerExistance) return "This player already exists!";

	//do opracowania własna walidacja inputa. (za krótka/długa nazwa)
}