import { CARDINFO } from './cards/cardinfo.js';

let cards = [];

async function getResource(cardInfo){
	const response = await fetch(cardInfo.houseUrl);
	const houses = await response.json();
	const response2 = await fetch(cardInfo.caracterUrl);
	const characters = await response2.json();
	createCards(characters,houses,cardInfo);
	populate();
	console.log(cards);
}


function createCards(characters,houses,cardInfo){
	let counter = 0;
	
	//Looping over characters and adding characters that matches cardinfo to cards array.
	for (let i = 0; i < characters.length; i++) {

		if (counter < cardInfo.caracter.length ){
			if (characters[i].Id === cardInfo.caracter[counter].id) {
						cards.push(characters[i]);
						cards[counter].fromcardinfo = cardInfo.caracter[counter];
					 	counter++;
			}
		}
	}
	//looping over cards array and adding houses to the allegiances section
	//(before it was just a number here refering to the houses.json).
	for (let i = 0; i < cards.length; i++) {
		for (let j = 0; j < cards[i].Allegiances.length; j++) {
			cards[i].Allegiances[j] = houses[cards[i].Allegiances[j]-1];
		}
	}
}

function populate(){

	let template = [];
	let gender;
	let text;
	let allegiances;

	for (let i = 0; i < cards.length; i++){

		if(cards[i].IsFemale==false){
			gender="mars";
			}
		else
			gender="venus";
			
		if (typeof cards[i].Allegiances[0] == "undefined") {
 			text = "The free folk are a race of people who live beyond the Wall in northern Westeros. They are more commonly referred to as 'wildlings' everywhere south of the Wall."
			allegiances = "Free Folk"	
			}
		else{
			text = `Seats: ${cards[i].Allegiances[0].Seats[0]}<br>
			Region: ${cards[i].Allegiances[0].Region}<br>
			AncestralWeapon: ${cards[i].Allegiances[0].AncestralWeapons[0]}<br>
			Words: ${cards[i].Allegiances[0].Words}`
			allegiances = cards[i].Allegiances[0].Name;
		}
				
		template[i] = `
			
				<div class="card hover" data-cardnumber="${cards[i].id}" style="background:${cards[i].fromcardinfo.color} ; border: 8px solid ${cards[i].fromcardinfo.color}; opacity: 1;">
					<div class="card__name">
						<h3>${cards[i].Name}</h3>
					</div>
					<div class="card__img">
						<img class="card__img-char" src="${cards[i].fromcardinfo.imgUrl}" style="width: 300px;">
					</div>
					<div class="card__faction">
						<h3>${allegiances}</h3>
					</div>
					<div class="card__text">
						<p> 
							${text}
						</p>
					</div>
					<div class="card__stats">
						<div class="card__stats-gender">
							<i class="fas fa-${gender}"></i>
							<div class="type">Gender</div>
						</div>
						<div class="card__stats-text">
							<div class="value">${cards[i].fromcardinfo.trimborn}</div>
							<div class="type">Born</div>
						</div><div class="card__stats-symbol">
							<img class="card__stats-img" src="${cards[i].fromcardinfo.symbol[0]}">
							<div class="type">Symbol</div>
						</div>
					</div>
				</div>`;
				
		document.querySelector('.flex-container').innerHTML += template[i];
	}
}

getResource(CARDINFO);
