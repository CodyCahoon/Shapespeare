var sensorfy = false;
var hpfy = false;
var celebrify = false;

var preS = false;
var preH = false;
var preC = false;

var bool = false;

var hpChars = [
"Harry Potter",
"Hermione Granger",
"Ronald Weasley",
"Lord Voldemort",
"Draco Malfoy",
"Albus Dumbledore",
"Severus Snape",
"Ginny Weasley",
"Neville Longbottom",
"Rubeus Hagrid",
"Luna Lovegood",
"Sirius Black",
"Dobby the House Elf",
"Professor Minerva McGonagall",
"Cho Chang",
"Peeves",
"Hedwig",
"The Snitch",
"Viktor Krum",
"Lucius Malfoy",
"Dudley Dursley",
"Nagini",
"Vernon Dursley",
"Nimbus 2000",
"Basilisk",
"Tom Riddle",
"Fleur Delacour",
"Petunia Dursley",
"Argus Filch",
"Argus Filch's cat",
"Cornelius Fudge",
"Gregory Goyle",
"Godric Gryffindor",
"Sorting Hat",
"Helga Hufflepuff",
"Rowena Ravenclaw",
"Newt Scamander",
"Salazar Slytherin",
"Draco's mom",
"Dobby's sock",
"Norbert, the Norwegian Ridgeback",
"Harry's Scar",
"The Flying Car"
];

var celebs = [
"Barack Obama",
"Angelina Jolie",
"Brad Pitt",
"U2",
"Miley Cyrus",
"Hannah Montana",
"Kim Kardashian",
"Kanye",
"Justin Timberlake",
"Jimmy Fallon",
"The Hulk",
"Captain America",
"Spiderman",
"Chevy Chase",
"Bruce Wayne",
"Natalie Portman",
"Amy Poehler",
"Tina Fey",
"Ronda Roussey",
"James Bond",
"Arnold Schwarzenegger",
"Ellen Page",
"Donald Glover",
"Mr. Incredible",
"Will Smith",
"Jaden Smith",
"Jennifer Aniston",
"Jessica Alba",
"Jack Sparrow",
"Johnny Depp",
"Orlando Bloom",
"Colbert",
"John Stewart",
"Fetty Wap",
"Silento",
"The Weeknd",
"A$AP",
"Dr. Dre",
"Tom Brady",
"Jay-Z",
"One Direction",
"Dwayne 'The Rock' Johnson",
"Macklemore",
"Eminem",
"Lady Gaga"
];

var lookup = [];

var origPeople = [];

var changewords = [
"remove",
"draw",
"moved",
"move",
"give",
"stir",
"hear",
"pay",
"swung",
"admit",
"confiscate",
"lived",
"came",
"disposed",
"Fixing",
"encounterd",
"splitted",
"reft",
"warrant",
"gave",
"crown",
"released",
"delivered",
"struck",
"thank",
"Studied",
"cancelling",
"weeps",
"match",
"got",
"Bewitch",
"Clapping",
"fear",
"found",
"went",
"Swear",
"won",
"grew",
"Attend",
"crawl",
"make"
];


var mixed = [
"<SENSOR>%!@%</SENSOR>",
"<SENSOR>!#@$%</SENSOR>",
"<SENSOR>#%$@!</SENSOR>",
"<SENSOR>$^$@</SENSOR>",
"<SENSOR>@$!@^$%</SENSOR>",
"<SENSOR>**%*$</SENSOR>",
"<SENSOR>****</SENSOR>",
"<SENSOR>*****</SENSOR>",
"<SENSOR>******</SENSOR>"
];

window.onmessage = function(e){
	strings = e.data.split(";");

	preS = sensorfy;
	preH = hpfy;
	preC = celebrify;

	sensorfy = strings[0] === "true" ? true : false;
	hpfy = strings[1] === "true" ? true : false;
	celebrify = strings[2] === "true" ? true : false;
	
	updateStory();
};

function updateStory()
{
	var run = true;
	if (hpfy && !preH)
	{
		mapToHP();
	}
	else if (celebrify && !preC)
	{
		mapToCelebs();
	}
	else if (sensorfy)
	{

		var lines = document.getElementsByTagName("LINE");
		var lineslength = lines.length;
		var changelength = changewords.length;

		//Look through lines
		for (var i = 0; i < lineslength; i++)
		{				
			for (var j = 0; j < changelength; j++)
			{
				//checks single names
				var searchMask = changewords[j];
				var regEx = new RegExp(searchMask, "ig");

				var rand = parseInt(Math.random() * mixed.length);
				var replaceMask = mixed[rand];
				var result = lines[i].innerHTML.replace(regEx, replaceMask);
				lines[i].innerHTML = result;
			}

		}
		run = false;
	}
	else
	{
		run = false;
	}


	if (!run)
	{
		return;
	}

	var speakers = document.getElementsByTagName("SPEAKER");
	var people = document.getElementsByTagName("PERSONA");
	var title = document.getElementsByTagName("TITLE");
	var lines = document.getElementsByTagName("LINE");
	var stages = document.getElementsByTagName("STAGEDIR");
	var descrp = document.getElementsByTagName("PLAYSUBT");

	var llength = lookup.length;
	var tlength = title.length;
	var slength = speakers.length;
	var lineslength = lines.length;
	var stageslength = stages.length;
	var dlength = descrp.length;
	var changelength = changewords.length;

	//Look through titles
	for (var i = 0; i < tlength; i++)
	{
		for (var j = 0; j < llength; j++)
		{
			//checks single names
			lookup[j] = lookup[j].split(",")[0];
			var searchMask = lookup[j];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = title[i].innerHTML.replace(regEx, replaceMask);
			title[i].innerHTML = result;


			//checks last name
			var searchMask = searchMask.split(" ");
			if (searchMask.length == 2)
				searchMask = searchMask[1];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = title[i].innerHTML.replace(regEx, replaceMask);
			title[i].innerHTML = result;
		}

	}

	//Look through lines
	for (var i = 0; i < lineslength; i++)
	{
		for (var j = 0; j < llength; j++)
		{
			//checks single names
			var searchMask = lookup[j];//.split(",")[0];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = lines[i].innerHTML.replace(regEx, replaceMask);
			lines[i].innerHTML = result;


			//checks last name
			var searchMask = searchMask.split(" ");
			if (searchMask.length == 2)
				searchMask = searchMask[1];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = lines[i].innerHTML.replace(regEx, replaceMask);
			lines[i].innerHTML = result;
		}

	}

	//Look through speakers
	for (var i = 0; i < slength; i++)
	{
		var temp = speakers[i].innerHTML;
		for (var j = 0; j < llength; j++)
		{
			//checks single names
			var searchMask = lookup[j];//.split(",")[0];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = speakers[i].innerHTML.replace(regEx, replaceMask);
			speakers[i].innerHTML = result;


			//checks last name
			var searchMask = searchMask.split(" ");
			if (searchMask.length == 2)
				searchMask = searchMask[1];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = speakers[i].innerHTML.replace(regEx, replaceMask);
			speakers[i].innerHTML = result;

			if (temp !== speakers[i].innerHTML)
			{
				break;
			}
		}

	}

	//Look through stage directions
	for (var i = 0; i < stageslength; i++)
	{
		for (var j = 0; j < llength; j++)
		{
			//checks single names
			var searchMask = lookup[j];//.split(",")[0];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = stages[i].innerHTML.replace(regEx, replaceMask);
			stages[i].innerHTML = result;


			//checks last name
			var searchMask = searchMask.split(" ");
			if (searchMask.length == 2)
				searchMask = searchMask[1];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = stages[i].innerHTML.replace(regEx, replaceMask);
			stages[i].innerHTML = result;
		}

	}

	//Look through titles
	for (var i = 0; i < dlength; i++)
	{
		for (var j = 0; j < llength; j++)
		{
			//checks single names
			var searchMask = lookup[j];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = descrp[i].innerHTML.replace(regEx, replaceMask);
			descrp[i].innerHTML = result;


			//checks last name
			var searchMask = searchMask.split(" ");
			if (searchMask.length == 2)
				searchMask = searchMask[1];
			var regEx = new RegExp(searchMask, "ig");
			var replaceMask = people[j].innerHTML.split(",")[0];
			var result = descrp[i].innerHTML.replace(regEx, replaceMask);
			descrp[i].innerHTML = result;
		}

	}

}

function mapToHP()
{
	window.origPeople = document.getElementsByTagName("PERSONA");
	var people = document.getElementsByTagName("PERSONA");
	var count = people.length;
	var size = count;
	lookup = [];
	for (var i = 0; i < size; i++)
	{
		lookup.push("");
	}
	usedNumbers = [];
	while (count > 0)
	{
		var index = parseInt(Math.random() * size);
		var bool = true;
		for (var i = 0; i < usedNumbers.length; i++)
		{
			if (usedNumbers[i] === index)
			{
				bool = false;
				break;
			}
		}
		
		if (bool)
		{
			usedNumbers.push(index);
			count--;
		}
	}

	for (var i = 0; i < size; i++)(function (i)
	{
		lookup[i] = people[i].innerHTML;
		strsplit = people[i].innerHTML.split(",");


		if (strsplit.length > 1)
		{
			oldStr = "";
			for (var j = 1; j < strsplit.length; j++)
			{
				oldStr += "," + strsplit[j];
			}
			people[i].innerHTML = hpChars[usedNumbers[i]] + oldStr;
		}
		else
		{
			people[i].innerHTML = hpChars[usedNumbers[i]];
		}

	})(i);

}

function mapToCelebs()
{
	window.origPeople = document.getElementsByTagName("PERSONA");
	var people = document.getElementsByTagName("PERSONA");
	var count = people.length;
	var size = count;
	lookup = [];
	for (var i = 0; i < size; i++)
	{
		lookup.push("");
	}
	usedNumbers = [];
	while (count > 0)
	{
		var index = parseInt(Math.random() * size);
		var bool = true;
		for (var i = 0; i < usedNumbers.length; i++)
		{
			if (usedNumbers[i] === index)
			{
				bool = false;
				break;
			}
		}
		
		if (bool)
		{
			usedNumbers.push(index);
			count--;
		}
	}

	for (var i = 0; i < size; i++)(function (i)
	{
		lookup[i] = people[i].innerHTML;
		strsplit = people[i].innerHTML.split(",");


		if (strsplit.length > 1)
		{
			oldStr = "";
			for (var j = 1; j < strsplit.length; j++)
			{
				oldStr += "," + strsplit[j];
			}
			people[i].innerHTML = celebs[usedNumbers[i]] + oldStr;
		}
		else
		{
			people[i].innerHTML = celebs[usedNumbers[i]];
		}


	})(i);

}