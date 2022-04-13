// check voor javascript connectie
console.log("Start");

// variabelen voor de elementen
var pEnergyElement = document.querySelector(".energy");
var pStatusElement = document.querySelector(".status");
var pDialogueElement = document.querySelector(".dialogue");

var imgElement = document.querySelector("img");

var spanEnergyElement = document.querySelector(".span_energy");
var spanStatusElement = document.querySelector(".span_status");

// variabelen voor de buttons
var feedButtonElement = document.querySelector("#feed");
var drinkButtonElement = document.querySelector("#drink");
var adventureButtonElement = document.querySelector("#adventure");
var sleepButtonElement = document.querySelector("#sleep");

// variabelen voor de score
var energy = 0;

// variabelen voor de arrays
var statusArray = [
    "Normal", 
    "High Spirit!", 
    "Too tired", 
    "Full"
];
var dialoguArray = [
    "What should I do today?",
    "I've had enough sleep for now.",
    "I am too tired..",
    "I think I've had enough.",
    "Let's head out!",
    "..."
];

// variabelen voor de audio fragmenten
// bron: https://freesound.org/
var feedSound = new Audio("audio/eat.mp3"); 
        
// bron: https://freesound.org/
var drinkSound = new Audio("audio/drink.mp3"); 

// bron: https://www.youtube.com/watch?v=8EmmrvQwkM4
var adventureSound = new Audio("audio/walk.mov");  

// bron: https://www.youtube.com/watch?v=iUn-VruzryY
var sleepSound = new Audio("audio/sleep.mov");       

// functie voor het ophalen en laten zien huidige energie
function updateStats() {
    spanEnergyElement.textContent = energy;
}

// functie om bij het geven van eten audio afspelen, +2 bij de energie te voegen, de foto te veranderen, de achtergrond te veranderen
function giveFood() {
    if (energy < 30) {
        feedSound.play();
        energy += 2;

        // hier wordt de status in het span element gestopt
        spanStatusElement.textContent = statusArray[0]; 

        // hier wordt de dialoof in het p element gestopt
        pDialogueElement.textContent = dialoguArray[0]; 
        updateStats();

        // bron: https://vignette.wikia.nocookie.net/goblin-slayer/images/6/6f/Goblin_Slayer.jpg/revision/latest?cb=20180426153243
        document.querySelector("img").src = 'images/goblin_neutral.jpeg'; 
        
        // hier wordt de class op de body weggehaald, zo hoeft er geen classlist.remove gebruikt te worden voor elke achtergrond
        document.body.className = " ";
        // hier wordt de class op de body veranderd, zodat de achtergrond bij de actie hoort (zonder inline css)
        document.body.classList.add("give-food");
    } else {
        spanStatusElement.textContent = statusArray[3];
        pDialogueElement.textContent = dialoguArray[3];
        
        // bron: https://i.redd.it/nnygu32k41031.png
        document.querySelector("img").src = 'images/goblin_think.png'; 
    } 
}

// functie om bij het geven van drinken audio afspelen, +1 bij de energie te voegen, de foto te veranderen, de achtergrond te veranderen
function giveDrink() {
    if (energy < 30) {
        drinkSound.play();
        energy += 1;

        spanStatusElement.textContent = statusArray[0];
        pDialogueElement.textContent = dialoguArray[0];
        updateStats();

        // bron: https://www.kindpng.com/picc/m/130-1300734_goblin-slayer-anime-chibi-hd-png-download.png
        document.querySelector("img").src = 'images/goblin_satisfied.png'; 

        document.body.className = " ";
        document.body.classList.add("give-drink");
    } else {
        spanStatusElement.textContent = statusArray[3];
        pDialogueElement.textContent = dialoguArray[3];

        // bron: https://i.redd.it/nnygu32k41031.png
        document.querySelector("img").src = 'images/goblin_think.png'; 
    }
}

// functie om te kijken of er genoeg energie is (10) en als dat zo is -10 bij de energie te doen, audio afspelen, de foto te veranderen, de achtergrond veranderen
function goAdventure() {
    if (energy >= 10) {
        adventureSound.play();
        energy -= 10;

        spanStatusElement.textContent = statusArray[0];
        pDialogueElement.textContent = dialoguArray[4];
        updateStats();

        // bron: https://shortcut-test2.s3.amazonaws.com/uploads/project/attachment/76604/default_Goblin_Slayer_3_GS_Layer.png
        document.querySelector("img").src = 'images/goblin_pissed.png'; 

        document.body.className = " ";
        document.body.classList.add("go-adventure");
    } else { 
        // als er niet genoeg energie is (minder dan 10) wordt er een tekst uit het array gehaald die laat zien dat hij te moe is
        spanStatusElement.textContent = statusArray[2];
        pDialogueElement.textContent = dialoguArray[2];

        // bron: https://i.redd.it/nnygu32k41031.png
        document.querySelector("img").src = 'images/goblin_think.png'; 
    }    
}

// functie om bij het kiezen om te gaan slapen audio af te spelen, +10 bij de energie te voegen, de foto te veranderen, de achtergrond veranderen
function goSleep() {
    if (energy < 30) {
        sleepSound.play();
        energy += 10;

        spanStatusElement.textContent = statusArray[1];
        pDialogueElement.textContent = dialoguArray[5];
        updateStats();

        // bron: https://randomc.net/image/Goblin%20Slayer/Goblin%20Slayer%20-%2008%20-%20Large%2012.jpg
        document.querySelector("img").src = 'images/goblin_sleep.jpeg'; 

        // bron: https://i.imgur.com/dICQJkd.jpg
        document.body.className = " ";
        document.body.classList.add("go-sleep");
    } else {
        spanStatusElement.textContent = statusArray[2];
        pDialogueElement.textContent = dialoguArray[1];
         
        // bron: https://i.redd.it/nnygu32k41031.png
        document.querySelector("img").src = 'images/goblin_think.png'; 
    }
}

// hier heb ik EventListeners toegevoegd die bij het klikken op een van buttons een functie uitvoert
feedButtonElement.addEventListener('click', giveFood);
drinkButtonElement.addEventListener('click', giveDrink);
adventureButtonElement.addEventListener('click', goAdventure);
sleepButtonElement.addEventListener('click', goSleep);