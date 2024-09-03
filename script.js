

function submitClicked() {

    event.preventDefault();
    var poke = getHTMLInfo();
    console.log(poke);

    if (isNaN(poke)) {
        console.log("that is NOT a number.");
        poke = poke.toLowerCase();

        findPokeInfo(poke);

    } else {

        if (poke > 721 || poke < 1) {
            document.getElementById("entry").classList.replace("entryShow","entryHide");
            document.getElementById("noEntry").classList.replace("entryHide", "entryShow");
            console.log("INVALID");
        } else {

            findPokeInfo(poke);


        }


    }


}





function getHTMLInfo() {
    var pokeName = document.getElementById("inputBox").value;
    document.getElementById("inputBox").value = "";
    return pokeName;
}




function findPokeInfo(poke) {

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {


            var pokemon = JSON.parse(this.responseText);
            console.log(pokemon);


            updateHTML(pokemon);

        } else if (this.readyState == 4) {

            console.log(this.responseText);
            document.getElementById("entry").classList.replace("entryShow","entryHide");
            document.getElementById("noEntry").classList.replace("entryHide", "entryShow");
            console.log("Hmmm.... Looks like that's not a valid pokemon. Sorry!");

        }
    };
    xhttp2.open("GET", "https://pokeapi.co/api/v2/pokemon/" + poke, true);
    xhttp2.setRequestHeader("Content-type", "application/json");

    xhttp2.send();


}

function updateHTML(pokemon) {

    var numberId = pokemon.id;
    console.log("THE NUMBER ID IS")
    console.log(numberId);

    document.getElementById("pokePic").src = "pokemon/" + numberId + ".png";


    document.getElementById("pokeName").innerHTML = "Name: " + capital(pokemon.name);
    document.getElementById("pokeNum").innerHTML = "Number: " + pokemon.id;
    document.getElementById("pokeHeight").innerHTML = "Height: " + pokemon.height;
    document.getElementById("pokeWeight").innerHTML = "Weight: " + pokemon.weight;

    var typeArray = pokemon.types;
    var typeString = "";
    for (var i = 0; i < typeArray.length; i++) {

        typeString = typeString + capital(((typeArray[i]).type).name) + " ";

    }

    document.getElementById("pokeType").innerHTML = "Type: " + typeString;

    setFlavText(pokemon.id);

    document.getElementById("noEntry").classList.replace("entryShow","entryHide",);
    document.getElementById("entry").classList.replace("entryHide", "entryShow");
    document.getElementById("entry").classList.add("child");

}

function setFlavText(pokeNum) {


    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

           
            var pokemon = JSON.parse(this.responseText);
            console.log(pokemon);
            
            var flavEntry= (pokemon.flavor_text_entries)[0];

            var i = 1;

            while((flavEntry.language).name !== 'en'){

                flavEntry = (pokemon.flavor_text_entries)[i];
                i++;
            }

            var flavText = flavEntry.flavor_text;

            flavText = flavText.replace("\f", " ");
            flavText = flavText.replace("POKéMON", "pokémon");
            
            document.getElementById("pokeFlavText").innerHTML = flavText;

        } else if (this.readyState == 4) {

            console.log(this.responseText);
            console.log("Hmmm.... Looks like that's not a valid pokemon. Sorry!");

        }
    };
    xhttp2.open("GET", "https://pokeapi.co/api/v2/pokemon-species/" + pokeNum, true);
    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send();


}

function capital(word) {
    const low = word.toLowerCase();
    return low.charAt(0).toUpperCase() + low.slice(1);
  }


document.getElementById("submit").addEventListener("click", submitClicked);

