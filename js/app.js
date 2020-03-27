import { CARDINFO } from './cards/cardinfo.js';


console.log(CARDINFO);


let cards = [];

async function getResource(cardInfo){
	// let counter = 0;
	const response = await fetch(cardInfo.houseUrl);
	const houses = await response.json();
	const response2 = await fetch(cardInfo.caracterUrl);
	const characters = await response2.json();




	//sorting ids
	// let ids = cardInfo.character.id.sort((a, b) => a - b);
	//adding charachters to the cards array
	// console.log(ids)

	test(characters, cardInfo);


	//adding alliencies from the houses to the card array,
	// for (var i = 0; i < cards.length; i++) {
	// 	for (var j = 0; j < cards[i].Allegiances.length; j++) {
	// 		cards[i].Allegiances[j] = houses[cards[i].Allegiances[j]-1];
	// 	}
	// }



}


function test(characters, cardInfo){
	let counter = 0;


	console.log(characters);
	console.log(cardInfo)
	for (let i = 0; i < characters.length; i++) {

		if (characters[i].Id === cardInfo.caracter[counter].id) {

		console.log('sdf')
		// 	cards.push(characters[i]);
		 	counter++;

		// }
	}
}
}


getResource(CARDINFO);