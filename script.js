
var plays;
var playNames;
var stories = document.getElementById("story-selection");
var xml = document.getElementsByTagName("iframe")[0];


var sensor = document.getElementById("sensor");
var sensorfy = false;

var hp = document.getElementById("hp");
var harrypotterfy = false;

var celeb = document.getElementById("celeb");
var celebrify = false;

var currentPlay = 0;

var search = document.getElementById("search");

var loading = document.getElementById("loading");

loadOptions();
resize();

window.onResize = function() {resize();};
sensor.onclick =  function(){sensorfy = !sensorfy; updateSensor(); loadScreen(0); setTimeout(sendFilters, 20); setTimeout(hideScreen, 3000);};
hp.onclick = function(){harrypotterfy = !harrypotterfy; updateHarryPotter();loadScreen(1);	setTimeout(sendFilters, 20); setTimeout(hideScreen, 4000);};
celeb.onclick = function(){celebrify = !celebrify; updateCeleb(); loadScreen(2); setTimeout(sendFilters, 20); setTimeout(hideScreen, 4000);};

search.oninput = function(){handleSearch();};
search.onsearch = function(){handleSearch();};






function loadOptions()
{
	plays = new Array();
	playNames = new Array();

	plays.push("The Tragedy of Antony and Cleopatra");
	playNames.push("a_and_c");

	plays.push("All's Well That Ends Well");
	playNames.push("all_well");

	plays.push("As You Like It");
	playNames.push("as_you");

	plays.push("The Comedy of Errors");
	playNames.push("com_err");

	plays.push("The Tragedy of Coriolanus");
	playNames.push("coriolan");

	plays.push("Cymbeline");
	playNames.push("cymbelin");

	plays.push("A Midsummer Night's Dream");
	playNames.push("dream");

	plays.push("The Tragedy of Hamlet, Prince of Denmark");
	playNames.push("hamlet");

	plays.push("The First Part of Henry the Fourth");
	playNames.push("hen_iv_1");

	plays.push("The Second Part of Henry the Fourth");
	playNames.push("hen_iv_2");

	plays.push("The Life of Henry the Fifth");
	playNames.push("hen_v");

	plays.push("The First Part of Henry the Sixth");
	playNames.push("hen_vi_1");

	plays.push("The Second Part of Henry the Sixth");
	playNames.push("hen_vi_2");

	plays.push("The Third Part of Henry the Sixth");
	playNames.push("hen_vi_3");

	plays.push("The Famous History of the Life of Henry the Eighth");
	playNames.push("hen_viii");

	plays.push("The Tragedy of Julius Caesar");
	playNames.push("j_caesar");

	plays.push("The Life and Death of King John");
	playNames.push("john");

	plays.push("The Tragedy of King Lear");
	playNames.push("lear");

	plays.push("Love's Labour's Lost");
	playNames.push("lll");

	plays.push("Measure for Measure");
	playNames.push("m_for_m");

	plays.push("The Merry Wives of Windsor");
	playNames.push("m_wives");

	plays.push("The Tragedy of Macbeth");
	playNames.push("macbeth");

	plays.push("The Merchant of Venice");
	playNames.push("merchant");

	plays.push("Much Ado about Nothing");
	playNames.push("much_ado");

	plays.push("The Tragedy of Othello, the Moor of Venice");
	playNames.push("othello");

	plays.push("Pericles, Prince of Tyre");
	playNames.push("pericles");

	plays.push("The Tragedy of Romeo and Juliet");
	playNames.push("r_and_j");

	plays.push("The Tragedy of King Richard the Second");
	playNames.push("rich_ii");

	plays.push("The Tragedy of Richard the Third");
	playNames.push("rich_iii");

	plays.push("Twelfth Night, or What You Will");
	playNames.push("t_night");

	plays.push("The Taming of the Shrew");
	playNames.push("taming");

	plays.push("The Tempest");
	playNames.push("tempest");

	plays.push("The Life of Timon of Athens");
	playNames.push("timon");

	plays.push("The Tragedy of Titus Andronicus");
	playNames.push("titus");

	plays.push("The History of Troilus and Cressida");
	playNames.push("troilus");

	plays.push("The Two Gentlemen of Verona");
	playNames.push("two_gent");

	plays.push("The Winter's Tale");
	playNames.push("win_tale");


	for (var i = 0; i < plays.length; i++)(function (i)
	{
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(plays[i]));

		if (i % 2 == 0)
		{
			li.style.color = "#002dff";
		}
		stories.appendChild(li);


		stories.children[i].onclick = function () {changeStory(i);};


	})(i);

}

function changeStory(number)
{
	xml.src = "xml/" + playNames[number] + ".xml";
	currentPlay = number;

	sensorfy = false;
	harrypotterfy = false;
	celebrify = false;



	updateSensor();
	updateHarryPotter();
	updateCeleb();

	sendFilters();	
}

function resize()
{
}

function updateSensor()
{
	if (sensorfy)
	{
		sensor.src = "img/sensor.png";
	}
	else
	{
		sensor.src = "img/sensor2.png";
		celebrify = false;
		harrypotterfy = false;
		celeb.src = "img/celeb2.jpg";
		hp.src = "img/hp2.gif";
		xml.src = "xml/" + playNames[currentPlay] + ".xml";
	}

}

function updateHarryPotter()
{
	if (harrypotterfy)
	{
		hp.src = "img/hp.gif";
		celebrify = false;
		sensorfy = false;
		celeb.src = "img/celeb2.jpg";
		sensor.src = "img/sensor2.png";


	}
	else
	{
		hp.src = "img/hp2.gif";
		xml.src = "xml/" + playNames[currentPlay] + ".xml";
	}

}

function updateCeleb()
{
	if (celebrify)
	{
		celeb.src = "img/celeb.jpg";
		harrypotterfy = false;
		sensorfy = false;
		hp.src = "img/hp2.gif";
		sensor.src = "img/sensor2.png";


	}
	else
	{
		celeb.src = "img/celeb2.jpg";
		xml.src = "xml/" + playNames[currentPlay] + ".xml";
	}

}


function handleSearch()
{
	str = search.value.toLowerCase();
	stories.innerHTML = "";
	var count = 0;

	for (var i = 0; i < plays.length; i++)(function (i)
	{
		cmp = plays[i].toLowerCase();

		if (cmp.indexOf(str) > -1)
		{
			var li = document.createElement("li");
			li.appendChild(document.createTextNode(plays[i]));

			if (count % 2 == 0)
			{
				li.style.color = "#002dff";
			}
			stories.appendChild(li);


			stories.children[count++].onclick = function () {changeStory(i);};
		}
	})(i);
}

function sendFilters()
{
	buildStr = sensorfy + ";" + harrypotterfy + ";" + celebrify;
	document.getElementsByTagName("iframe")[0].contentWindow.postMessage(buildStr, '*');
}

function loadScreen(num)
{
	switch (num)
	{
		case 0:
			if (sensorfy)
			{
				loading.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
				loading.innerHTML = "Randomly bleeping out verbs and adjectives...";
					loading.style.display = "block";

			}
			else
			{
					loading.style.display = "none";

			}
			break;
		case 1:
			if (harrypotterfy)
			{
				loading.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
				loading.innerHTML = "Changing to Harry Potter characters...";
				loading.style.display = "block";
			}
			else
			{
				loading.style.display = "none";
			}
			break;

		default:
			if (celebrify)
			{
				loading.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
				loading.innerHTML = "Changing to celebrities...";
				loading.style.display = "block";
			}
			else
			{
				loading.style.display = "none";
			}

			break;
	}

}

function hideScreen()
{
	loading.style.display = "none";
}