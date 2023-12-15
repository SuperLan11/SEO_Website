/*JS file for the shop page*/

/*global variable arrays?*/

document.addEventListener("DOMContentLoaded", placeCardsRandomly);

function checkNoResults()
{
	cardArea = document.getElementById("results");
	if(cardArea.innerHTML.length == 0)
        {
                 cardArea.innerHTML = "<p style=\"font-family: 'Bebas Neue'; font-size: 26pt; letter-spacing: 1pt; position: fixed;\"><strong>No results found</strong></p>"
        }
}

function getColorSelected()
{
	let colorSelect = "none";
        let colorSquares = document.getElementsByTagName("span");
	for(let j = 0; j < colorSquares.length; j++)
        {
                if(colorSquares[j].selected)
                        colorSelect = colorSquares[j].className;
	}
	return colorSelect;
}

function searchClick()
{
	imgArr = ["shoe2.jpg", "shoe3.jpg", "shoe4.jpg", "sprayCan1.jpeg", "sprayCan2.jpeg", "pinkShoes.jpg", "sprayCan4.jpg", "sprayShoes.jpeg", "blueSpray.jpg", "croppedneonpromononhero.png", "croppedchristmasimage.jpg", "fixedgamerpromononhero.png"];
        itemNames = ["White Spray Shoes", "Glow Spray Shoes", "Red Spray Shoes", "Black Spray Can", "Purple Spray Can", "Pink Spray Shoes", "Dark Spray Can", "Purple Spray Shoes", "Blue Spray Bottle", "Neon Lightwear", "Snowflake Sneakers", "Controller Kicks"];

	let searchInput = document.getElementsByTagName("input")[0];
	// set as active in case color filter is also active for double filter
	searchInput.activeFilter = true;
	searchText = searchInput.value;
	let lowercaseSearch = searchText.toLowerCase();

	if(searchText == "")
		searchInput.activeFilter = false;

	let colorGrid = document.getElementById("colorBoxes");
	let cardArea = document.getElementById("results");
	// if color filter is active, display only the current cards that match the search filter
	if(searchInput.activeFilter)
	{
		if(colorGrid.activeFilter)
		{
			let curCards = cardArea.innerHTML.split("div>");
                        cardArea.innerHTML = "";

			// filter by search
                        // curCards.length is 1 greater than actual card # because it has empty string at end
                        for(let i = 0; i < curCards.length-1; i++)
                        {
                                let curItem = curCards[i];
                                let curItemStr = curItem.split("h2")[1];

                                let curItemName = curItemStr.substring(1,curItemStr.length-2);
                                let indx = itemNames.indexOf(curItemName);
                                if(curItemName.toLowerCase().includes(lowercaseSearch))
                                {
                                        cardArea.innerHTML += "<div class=\"card\"><img src=\"images/" + imgArr[indx] + "\"><h2>" + itemNames[indx] + "</h2><button>View</button></div>"
                                }
                        }
		}
		// only search filter, reset cards and apply search
		else
		{
			// reset cards 
			placeCardsRandomly();
			let curCards = cardArea.innerHTML.split("div>");
                	cardArea.innerHTML = "";

			// filter by search
                	// curCards.length is 1 greater than actual card # because it has empty string at end
                	for(let i = 0; i < curCards.length-1; i++)
                	{
                        	let curItem = curCards[i];
                        	let curItemStr = curItem.split("h2")[1];

                        	let curItemName = curItemStr.substring(1,curItemStr.length-2);
				let indx = itemNames.indexOf(curItemName);
                        	if(curItemName.toLowerCase().includes(lowercaseSearch))
                        	{
                                	cardArea.innerHTML += "<div class=\"card\"><img src=\"images/" + imgArr[indx] + "\"><h2>" + itemNames[indx] + "</h2><button>View</button></div>"
                        	}
                	}
			
		}
	}
	// search filter is not active, aka empty
	else
	{
		if(colorGrid.activeFilter)
			filterColor(getColorSelected(), false);
		else
			placeCardsRandomly();
			/*cardArea = document.getElementById("results");
        		cardArea.innerHTML = "";*/
	}
	
	checkNoResults();
}

function getRandomInt(max) 
{
	return Math.floor(Math.random() * max);
}

function removeVal(arr, indx)
{
	// removes one character starting at indx
	arr.splice(indx, 1);
	let truncatedArr = [];
	for(let i = 0; i < arr.length; i++)
	{
		if(typeof(arr[i]) != 'undefined')
		{
			truncatedArr[i] = arr[i];
		}
	}
	return truncatedArr;
}

function placeCardsRandomly()
{
	imgArrPlace = ["shoe2.jpg", "shoe3.jpg", "shoe4.jpg", "sprayCan1.jpeg", "sprayCan2.jpeg", "pinkShoes.jpg", "sprayCan4.jpg", "sprayShoes.jpeg", "blueSpray.jpg", "croppedneonpromononhero.png", "croppedchristmasimage.jpg", "fixedgamerpromononhero.png"];
        itemNamesPlace = ["White Spray Shoes", "Glow Spray Shoes", "Red Spray Shoes", "Black Spray Can", "Purple Spray Can", "Pink Spray Shoes", "Dark Spray Can", "Purple Spray Shoes", "Blue Spray Bottle", "Neon Lightwear", "Snowflake Sneakers", "Controller Kicks"];

	cardArea = document.getElementById("results");
	cardArea.innerHTML = "";
	for(let itemsToPlace=12; itemsToPlace > 0; itemsToPlace--)
	{
		let randIndx = getRandomInt(itemsToPlace);
		cardArea.innerHTML += "<div class=\"card\"><img src=\"images/" + imgArrPlace[randIndx] + "\"><h2>" + itemNamesPlace[randIndx] + "</h2><button>View</button></div>";

		imgArrPlace = removeVal(imgArrPlace, randIndx);
		itemNamesPlace = removeVal(itemNamesPlace, randIndx);
	}
}

function clearHighlights()
{
	colorSquares = document.getElementsByTagName("span");
	for(let j = 0; j < colorSquares.length; j++)
        {
                colorSquares[j].style.boxShadow = "none";
		colorSquares[j].selected = false;
        }
}

function filterColor(colorSelect, click)
{
	imgArr = ["shoe2.jpg", "shoe3.jpg", "shoe4.jpg", "sprayCan1.jpeg", "sprayCan2.jpeg", "pinkShoes.jpg", "sprayCan4.jpg", "sprayShoes.jpeg", "blueSpray.jpg", "croppedneonpromononhero.png", "croppedchristmasimage.jpg", "fixedgamerpromononhero.png"];
        itemNames = ["White Spray Shoes", "Glow Spray Shoes", "Red Spray Shoes", "Black Spray Can", "Purple Spray Can", "Pink Spray Shoes", "Dark Spray Can", "Purple Spray Shoes", "Blue Spray Bottle", "Neon Lightwear", "Snowflake Sneakers", "Controller Kicks"];

	itemColors = ["white", "green", "red", "black", "purple", "pink", "black", "purple", "blue", "any", "blue", "blue"];

	cardArea = document.getElementById("results");
	colorGrid = document.getElementById("colorBoxes");
	colorGrid.activeFilter = true;
	searchInput = document.getElementsByTagName("input")[0];

	if(click)
        {
                selectedColor = document.getElementsByClassName(colorSelect)[0];
                let hasShadow = (selectedColor.style.boxShadow != "none" && selectedColor.style.boxShadow != "");
                // if selected color is already highlighted, remove highlight
                if(hasShadow)
                {
                        colorGrid.activeFilter = false;
                        clearHighlights();
                        if(searchInput.activeFilter)
                        {
                                searchClick();
                        }
                        else
                        {
                                placeCardsRandomly();
                        }
                }
                // if selected color is not highlighted, remove current highlight and highlight new color
                else
                {
                        clearHighlights();
                        selectedColor.style.boxShadow = "0px 0px 20px yellow";
                        selectedColor.selected = true;
                }
        }
	
	// if search filter is active, keep results and remove those without filtered color
	if(colorGrid.activeFilter)
	{
		if(searchInput.activeFilter)
		{	
			// reset cards
			placeCardsRandomly();

			let curCards = cardArea.innerHTML.split("div>");
			cardArea.innerHTML = "";

			// filter by color
			// curCards.length is 1 greater than actual card # because it has empty string at end
			for(let i = 0; i < curCards.length-1; i++)
			{
				let curItem = curCards[i];
				// split removes string parameter from resulting list
				let curItemStr = curItem.split("h2")[1];
				
				let curItemName = curItemStr.substring(1,curItemStr.length-2);
				let indx = itemNames.indexOf(curItemName);
				if(itemColors[indx] == colorSelect || itemColors[indx] == "any")
				{
					cardArea.innerHTML += "<div class=\"card\"><img src=\"images/" + imgArr[indx] + "\"><h2>" + itemNames[indx] + "</h2><button>View</button></div>"
				}
			}
			// filter by search
			searchClick();
		}
		// only color filter is active
		else
		{
			// reset cards
			placeCardsRandomly();

			let curCards = cardArea.innerHTML.split("div>");
                        cardArea.innerHTML = "";

                        // filter by color
                        // curCards.length is 1 greater than actual card # because it has empty string at end
                        for(let i = 0; i < curCards.length-1; i++)
                        {
                                let curItem = curCards[i];
                                // split removes string parameter from resulting list
                                let curItemStr = curItem.split("h2")[1];

                                let curItemName = curItemStr.substring(1,curItemStr.length-2);
                                let indx = itemNames.indexOf(curItemName);
                                if(itemColors[indx] == colorSelect || itemColors[indx] == "any")
                                {
                                        cardArea.innerHTML += "<div class=\"card\"><img src=\"images/" + imgArr[indx] + "\"><h2>" + itemNames[indx] + "</h2><button>View</button></div>"
                                }
                        }
		}
	}
	// color filter is inactive, so color was deselected
	else
	{
		placeCardsRandomly();

		if(searchInput.activeFilter)
		{
			// filter by search
			searchClick();
		}
	}
	checkNoResults();
}

function clearFilters()
{
	console.log("Screen width is " + screen.width);
	// deactivate filters
	let textInput = document.getElementsByTagName("input")[0];
        textInput.activeFilter = false;
	let colorGrid = document.getElementById("results");
	colorGrid.activeFilter = false;

	// remove any highlights
	colorSquares = document.getElementsByTagName("span");
        for(let j = 0; j < colorSquares.length; j++)
        {
                colorSquares[j].style.boxShadow = "none";
        }
	// clear search box
	searchBox = document.getElementsByTagName("input")[0];
	searchBox.value = "";

	placeCardsRandomly();
}
