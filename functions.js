
var success = 0;
var muteValue = 0;
var attempts;

function setValues() {
    attempts = 0;
    sessionStorage.setItem('attempts', attempts);
    sessionStorage.setItem('sword', 'false');
    sessionStorage.setItem('shield', 'false');
    sessionStorage.setItem('easter_egg', 'false');
    sessionStorage.setItem('chestplate', 'false');
}


document.addEventListener('click', musicPlay);
function musicPlay() {
document.getElementById('player').play();
document.removeEventListener('click', musicPlay);
} 
function loadFinalChoices()
 {
    if (sessionStorage.getItem('sword') == 'true') 
    {
        document.getElementById('hasSword').style.display = 'block';
        document.getElementById('hasNoSword').style.display = 'none';
    }
    if (sessionStorage.getItem('shield') == 'true') 
    {
        document.getElementById('hasShield').style.display = 'block';
        document.getElementById('hasNoShield').style.display = 'none';
    }
}

function mute(){

console.log(muteValue);
    if (muteValue==0){
        document.getElementById("player").muted = true;
        muteValue++;
    }
    else if (muteValue==1){
        document.getElementById("player").muted = false;
        muteValue=0;
    }
}

function buttonClick() {
    var snd = new Audio("sound/UI_Quirky19.mp3")
    snd.play()
}

function doorSound() {
    var snd = new Audio("sound/Creeky-Interior-Door.mp3")
    snd.play()
}

function gainSound() {
    var snd = new Audio("sound/success-1-6297.mp3")
    snd.play()
}

function startSound() {
    var snd = new Audio("sound/game-start-6104.mp3")
    snd.play()
}

function changeTheme(mode){
    let x = document.getElementsByTagName('link')[0];
    if(mode=='light'){
        x.href = 'light.css';
    } else if(mode=='dark'){
        x.href = 'dark.css';
    }
}

function resizeText(scale){ 
    let myList = document.querySelectorAll('p');
    for(var i =0; myList.length;i++){
        size = window.getComputedStyle(myList[i],"").getPropertyValue('font-size');
        console.log(size);
        sizeFont = parseFloat(size);
        if(scale=='less'){
            myList[i].style.fontSize = (sizeFont - 2)+'px';
        } else if(scale=='more'){
            myList[i].style.fontSize = (sizeFont + 2)+'px';
        }
    }        
    let torch=document.getElementById('divTorch:before');
    size = window.getComputedStyle(torch).getPropertyValue('top');
    console.log(size);
    sizetop = parseFloat(size); 
    if(scale=='less'){
        torch.style.top = (sizeTop - 20)+'px';
    } else if(scale=='more'){
        torch.style.top = (sizeTop + 20)+'px';
    }
}
// function completeTime(time){
//     document.getElementById('timeCompleted').innerHTML = 'You completed the game in ' + time + ' seconds'; 
// }

var currentDiv='intro';
function showNextChoice(nextChoice, prevChoice) {
    document.getElementById(prevChoice).style.display = 'none'; 
    document.getElementById(nextChoice).style.display = 'block';
    currentDiv = nextChoice;
    console.log('sword ==' +sessionStorage.getItem('sword'));
}

var lifeCount = 3;
function loseLife(currentChoice, lives){
    if(lifeCount==0){
        console.log('death');
        document.getElementById(currentChoice).style.display='none';
        document.getElementById('death').style.display='block';
    }else if(lifeCount>0){
        let myList = document.querySelectorAll('.life');
        for (let i = 0; i < lives; i++) {
            myList[lifeCount-1].style.display='none';
            lifeCount--;
        }
    }
    
}

function gainLife(lives){
    let myList = document.querySelectorAll('.life');
    lifeCount++;
    for (let i=0; i < lives; i++){
        myList[lifeCount-1].style.display='inline-block';
    }
}


function send() {
    
    var myName = document.getElementById('myName').value;
    var friendName = document.getElementById('friendName').value;
    for (var i = 0; i < avatar.length; i++) {
        if (avatar[i].checked == true) {
            var avatarValue = avatar[i].value;
        }
    }
    for (var i = 0; i < friendAvatar.length; i++) {
        if (friendAvatar[i].checked == true) {
            var friendAvatarValue = friendAvatar[i].value;
        }
    }

    console.log("Avatar == " + avatarValue);
    sessionStorage.setItem('myName',myName);
    sessionStorage.setItem('friendName', friendName);
    sessionStorage.setItem('avatarValue', avatarValue);
    sessionStorage.setItem('friendAvatarValue', friendAvatarValue);
    console.log("Avatarstored == " + sessionStorage.getItem('avatarValue'));
    window.open('TextAdventureGame.html','_self');
    
}

function endImage(){
    let userAvatar = sessionStorage.getItem('avatarValue');
    let friendAvatar = sessionStorage.getItem('friendAvatarValue');
    document.getElementById("end_avatar").src = userAvatar;
    document.getElementById("end_friendAvatar").src = friendAvatar;
}


function receive() {
    let myName = sessionStorage.getItem('myName');
    let friendName = sessionStorage.getItem('friendName');
    let avatarValue = sessionStorage.getItem('avatarValue');
    document.getElementById("playerName").innerHTML = myName;
    document.getElementById("avatar_image").src = avatarValue;
    const myNameNodeList = document.querySelectorAll(".myName");
    for (let i = 0; i < myNameNodeList.length; i++) {
        myNameNodeList[i].innerHTML = myName;
    }
    const textNodeList = document.querySelectorAll(".friendName");
    for (let i = 0; i < textNodeList.length; i++) {
        textNodeList[i].innerHTML = friendName;
    }
}

function imageSelect(){
    document.div.style.cursor = 'pointer';
}

var gameTimer;
var duration = 300;
var transpChange;

function startTimer() {
    console.log("start");
    gameTimer = setInterval('countdown()', 1000);
    transpChange = 1 / duration;
}

function countdown() {
    console.log("tick");
    duration--;
    let front = document.getElementById('frontLevel');
    front.style.width = duration * transpChange * 100 + "%";

    if (duration == 0) {
        endGame(0);
    }
}

function loseTime() {
    duration = duration - 30;
    let front = document.getElementById('frontLevel');
    front.style.width = front.style.width - 30;

}

function endGame(success) {
    
    sessionStorage.setItem('duration',duration);
    sessionStorage.setItem('success',success);
    sessionStorage.setItem('lifeCount', lifeCount);
    if (success == 1) {
        sessionStorage.setItem('lifeCount', 0);
    }
    attemptsCount();
    
    console.log(sessionStorage.getItem('success'));
    clearInterval(gameTimer)
    showNextChoice('death', currentDiv);
    window.open('TextAdventureEnd.html','_self');
}

function attemptsCount() {
    console.log('The value of attempts locally == ' + attempts);
    console.log('The value of attemmpts stored == ' + sessionStorage.getItem('attempts'));
    
    let sessionAttempts = parseInt(sessionStorage.getItem('attempts'));
    // let sessionAttempts = sessionStorage.getItem('attempts');
    
    console.log('The sessionAttempts == ' + sessionAttempts);

    // attempts = sessionAttempts + 1;
    attempts = sessionAttempts + 1;
    console.log('The new attempts == ' + attempts);

    sessionStorage.setItem('attempts', attempts);
    sessionStorage.setItem('finalAttempts', attempts);
    console.log('the last attempts == ' + sessionStorage.getItem('finalAttempts'))
}



function displayEnd() {
    console.log('sword ==' +sessionStorage.getItem('sword'));
    displayInventory();
    endImage();
    console.log('displaying');
    let success = sessionStorage.getItem('success');
    console.log(success);
    var duration = sessionStorage.getItem('duration');
    console.log('duration =' + duration)


    if (success == 0) {
        document.getElementById('timeOver').style.display = 'block';
    }
    else if(success == 1) {
        document.getElementById('die').style.display = 'block'; 
    }

    else if(success == 2) {
        document.getElementById('win').style.display = 'block'; 
    }
    
    console.log("attempts == " + sessionStorage.getItem('attempts'));
    
    if (duration > 0 && success == 2) {
        document.getElementById('timeCompleted').innerHTML = 'You completed the game in ' + (300 - duration) + ' seconds.';
        document.getElementById('attempts').innerHTML = 'You attempted the game ' + sessionStorage.getItem('finalAttempts') + ' times.'; 
    }
    else if (duration > 0 && success == 1) {
        document.getElementById('timeCompleted').innerHTML = 'You died in ' + (300 - duration) + ' seconds'; 
    }

    var lifeCount = sessionStorage.getItem('lifeCount');
    console.log("lifecount==" + lifeCount);
    document.getElementById('lives').innerHTML = "You finished the game with " + lifeCount + " lives.";

}

function showOption() {
    console.log('option worked');
    document.getElementById('hasSwordDiv').style.display = 'block';
}


function validateForm() {
    console.log('called');
    let name = document.getElementById('myName');
    let nameValue = name.value;
    let fName = document.getElementById('friendName').value;
    let avatar = document.getElementsByName("avatar");
    var avatarValue = "";
    var friendAvatarValue = "";

    for (var i = 0; i < avatar.length; i++) {
        if (avatar[i].checked == true) {
            avatarValue = avatar[i].value;
        }
    }
    let friendAvatar = document.getElementsByName("friendAvatar");
    for (var i = 0; i < friendAvatar.length; i++) {
        if (friendAvatar[i].checked == true) {
            friendAvatarValue = friendAvatar[i].value;
        }
    }    
    let err = document.getElementById('error');
    let err2 = document.getElementById('error2');
    let err3 = document.getElementById('error3');   
    let err4 = document.getElementById('error4');

    err.innerHTML = ('');
    err2.innerHTML = ('');
    err3.innerHTML = ('');
    err4.innerHTML = ('');



    // ratingValue = parseInt(num);
    console.log(nameValue)
    if (nameValue == "") {
        console.log('Empty Field Error');
        err.innerHTML = ('Please enter your name');
        err.className = 'error';
    } 
    else if (fName == "") {
        console.log('Empty Field Error');
        err2.innerHTML = ("Please enter your friend's name");
        err2.className = 'error';
    }
    else if (avatarValue == "") {
        console.log('Empty Field Error');
        err3.innerHTML = ("Please select an avatar");
        err3.className = 'error';
         }
     else if (friendAvatarValue == "") {
        console.log('Empty Field Error');
        err4.innerHTML = ("Please select an avatar");
        err4.className = 'error';

    }
    else {
        console.log('No errors detected');
        send();
        return true;
    }

    return false;

}

function getItem(item) {

    if (item == 0) {
        document.getElementById('sword').style.display = 'inline-block';
        sessionStorage.setItem('sword', true);
        
        console.log('if you collect sword ==' + sessionStorage.getItem('sword'));
    }   
    else if (item == 1) {
        document.getElementById('shield').style.display = 'inline-block';
        sessionStorage.setItem('shield', true);
    }  
    else if (item == 2) {
        document.getElementById('easter_egg').style.display = 'inline-block';
        sessionStorage.setItem('easter_egg', true);
    }  
    else if  (item == 3 ) {
        document.getElementById('chestplate').style.display = 'inline-block';
        sessionStorage.setItem('chestplate', true);

    }
    else if  (item == 4 ) {
        document.getElementById('helmet').style.display = 'inline-block';
        sessionStorage.setItem('helmet', true);
    }

}


function displayInventory() {
    console.log('Inventory should display')
    console.log('sword ==' +sessionStorage.getItem('sword'));

    if (sessionStorage.getItem('sword') == 'true') {
        document.getElementById('displaySword').style.display = 'block'; 
    }
    if (sessionStorage.getItem('shield') == 'true') {
        document.getElementById('displayShield').style.display = 'block'; 
    }
    if (sessionStorage.getItem('easter_egg') == 'true') {
        document.getElementById('displayEaster_egg').style.display = 'block';
    }
    if (sessionStorage.getItem('helmet') == 'true') {
        document.getElementById('displayHelmet').style.display = 'block';
    }
    if (sessionStorage.getItem('chestplate') == 'true') {
        document.getElementById('displayChestplate').style.display = 'block';
    }
}


function playAgain(){
    document.getElementById("playAgain");
    location.href = "demo.html";
}

function exit() {
    window.open('TextAdventureStart.html','_self');
}



function updateFlashLight(e) {
    var x = (e.clientX - 600);
    var y = (e.clientY - 250);

    document.getElementById('divTorch').style.setProperty('--cursorX', x + 'px')
    document.getElementById('divTorch').style.setProperty('--cursorY', y + 'px')
}
// function flashLight(){
document.addEventListener('mousemove', updateFlashLight)
document.addEventListener('touchmove', updateFlashLight)


function updateFlashLight2(e) {
    var x = (e.clientX - 600);
    var y = (e.clientY - 250);

    document.getElementById('divTorch2').style.setProperty('--cursorX', x + 'px')
    document.getElementById('divTorch2').style.setProperty('--cursorY', y + 'px')
}
// function flashLight(){
document.addEventListener('mousemove', updateFlashLight2)
document.addEventListener('touchmove', updateFlashLight2)

// }

var count = 0;
var time = 0;
var minigameTimer;
var timerBar;
var miniGameDuration = 15;
var miniGameBar;
var boxFail = false;

function miniGameStartTimer() 
{
    minigameTimer = setInterval(Increment, 1000);
    miniGameBar = 1 / miniGameDuration;
    document.getElementById('box').style.display = 'block';
    document.getElementById('box_image').src = 'images/rock.png';
}

function Increment()
{
    document.getElementById('box').style.display = 'block';
    miniGameDuration--;
    let front = document.getElementById('miniGameFrontLevel');
    console.log('Minigameduration, minigamebar ===' + miniGameDuration + "  " + miniGameBar)
;    console.log('front == ' + front);
    console.log('front.style.width == ' + front.style.width);
    front.style.width = miniGameDuration * miniGameBar * 100 + "%";
    if (miniGameDuration == 0)
    {
        console.log('Timer if statement');
        console.log("LOSE LIFE 2");
        clearInterval(minigameTimer);
        showNextChoice('1.2.1','game1');loseLife('1.2.1', 1);
    }
    console.log('Timer if passed')
    time++;
}

function Action()
{
    // if (document.getElementById("box_image").src == 'images/bat.png')
    console.log('boxFail == ' + boxFail)
    if (boxFail == true)
    {
        clearInterval(minigameTimer);
        showNextChoice('1.2.1','game1');loseLife('1.2.1', 1)
    }

    time = 0;
    count++;
    if (count >= 10)
    {
        clearInterval(minigameTimer)
        showNextChoice('1.2.success','game1');    }

    var blue = Math.floor(Math.random() * 3);
    if (blue == 2)
    {
        // document.getElementById('box').style.backgroundColor = 'blue';
        boxFail = true;
        document.getElementById("box_image").src = 'images/bat.png';
        ChangePosition();
        setTimeout(ResetColour, 1500);
    }
    else
    {
        // document.getElementById('box').style.backgroundColor = 'red';
        document.getElementById("box_image").src = 'images/rock.png';

        ChangePosition();
    }
}

function ResetColour()
{
    // document.getElementById('box').style.backgroundColor = 'red';
    boxFail = false;
    document.getElementById("box_image").src = 'images/rock.png';
}

function ChangePosition() 
{
    // The width and height values are equal to those from the CSS for the box
    let width = 900;
    let height = 600;

    // This prints the height and width in the console
    console.log('Width == ' + width);
    console.log('Height == ' + height);

    // The widthSide value represents the width of the column at the side of the game (containing inventory, lives etc.)
    let widthSide = document.getElementById("column").offsetWidth;

    // The heightHeader value represents the height of the header at the top of the game
    let heightHeader = document.getElementById("header").offsetHeight;

    // These values are printed in the console
    console.log('WidthSide == ' + widthSide);
    console.log('HeightHeader == ' + heightHeader);

    // The heightGame value is set equal to the height of the div which contains the main game
    let heightGame = document.getElementById("game_div").offsetHeight;
    console.log('HeightGame == ' + heightGame);

    // The heightGame value is then set to be equal to the space in the game div which 
    heightGame = heightGame - height;
    let widthGame = document.getElementById("game_div").offsetWidth;
    widthGame = widthGame - width;
    console.log('HeightGame == ' + heightGame);
    console.log('WidthGame == ' + widthGame);

    // var x = Math.floor(Math.random() * (width - 50)) + widthSide - 200;
    // var y = Math.floor(Math.random() * (height - 50)) + (heightGame + heightHeader - 250);
    var x = Math.floor(Math.random() * (width - 50));
    var y = Math.floor(Math.random() * (height - 50));
   
    console.log('x == ' + x);
    console.log('y == ' + y);

    document.getElementById('box').style.left = x + "px";
    document.getElementById('box').style.top = y + "px";

}


function StartTimer2() 
{
    minigameTimer = setInterval(Increment2, 1000);
    miniGameBar = 1 / miniGameDuration;
    document.getElementById('box2').style.display = 'block';
    document.getElementById('box_image2').src = 'images/rock.png';
}

function Increment2()
{
    document.getElementById('box2').style.display = 'block';
    miniGameDuration--;
    let front = document.getElementById('miniGameFrontLevel2');
    front.style.width = miniGameDuration * miniGameBar * 100 + "%";
    if (miniGameDuration == 0)
    {
        console.log('Timer if statement');
        console.log("LOSE LIFE 2");
        clearInterval(minigameTimer);
        showNextChoice('1.1.3.death','game2');loseLife('1.2.1', 1);
    }
    console.log('Timer if passed')
    time++;
}

function Action2()
{
    console.log('Box image ==' + document.getElementById("box_image2").src)
    // if (document.getElementById("box_image2").src == 'images/bird.png' )
    if (boxFail == true)
    {
        clearInterval(minigameTimer);
        showNextChoice('1.1.3.death','game2');loseLife('1.2.1', 1);
    }

    time = 0;
    count++;
    if (count >= 10)
    {
        clearInterval(minigameTimer)
        showNextChoice('game2.win','game2');    }

    var blue = Math.floor(Math.random() * 3);
    if (blue == 2)
    {
        document.getElementById("box_image2").src = 'images/bird.png';
        ChangePosition2();
        setTimeout(ResetColour2, 1500);
        boxFail = true;
    }
    else
    {
        document.getElementById("box_image2").src = 'images/rock.png';
        ChangePosition2();
    }
}

function ChangePosition2() 
{
    // The width and height values are equal to those from the CSS for the box
    let width = 900;
    let height = 600;

    // This prints the height and width in the console
    console.log('Width == ' + width);
    console.log('Height == ' + height);

    // The widthSide value represents the width of the column at the side of the game (containing inventory, lives etc.)
    let widthSide = document.getElementById("column").offsetWidth;

    // The heightHeader value represents the height of the header at the top of the game
    let heightHeader = document.getElementById("header").offsetHeight;

    // These values are printed in the console
    console.log('WidthSide == ' + widthSide);
    console.log('HeightHeader == ' + heightHeader);

    // The heightGame value is set equal to the height of the div which contains the main game
    let heightGame = document.getElementById("game_div").offsetHeight;
    console.log('HeightGame == ' + heightGame);

    // The heightGame value is then set to be equal to the space in the game div which 
    heightGame = heightGame - height;
    let widthGame = document.getElementById("game_div").offsetWidth;
    widthGame = widthGame - width;
    console.log('HeightGame == ' + heightGame);
    console.log('WidthGame == ' + widthGame);

    // var x = Math.floor(Math.random() * (width - 50)) + widthSide - 200;
    // var y = Math.floor(Math.random() * (height - 50)) + (heightGame + heightHeader - 250);
    var x = Math.floor(Math.random() * (width - 50));
    var y = Math.floor(Math.random() * (height - 50));
   
    console.log('x == ' + x);
    console.log('y == ' + y);

    document.getElementById('box2').style.left = x + "px";
    document.getElementById('box2').style.top = y + "px";

}

function ResetColour2()
{
    document.getElementById("box_image2").src = 'images/rock.png';
    boxFail = false;
}

//Lockpicking Minigame

var pickCount = 0;
const lockWords = ['Search', 'Twist', 'Shimmy', 'Open'];
function ChangeCoord()
{
    //Getting current x co-ordinate so can validate
    //the next position is not too close
    var currentCoords = document.getElementById('lockpickArea').getAttribute('coords').split(',');
    var currentX = currentCoords[0];
    var passed = false;

    //Generating new position
    do{
        //min and max of gold lock area
        var maxX = 180;
        var minX = 10;
        var maxY = 250;
        var minY = 90;
        var x = Math.floor(Math.random() * (maxX-minX+1)+minX);//x within min and max area
        var y = Math.floor(Math.random() * (maxY-minY+1)+minY);//y within min and max area
        //defines clickable area - 20 by 20 pixels
        var x2 = x + 20;
        var y2 = y + 20;
        passed = true;
        document.getElementById('lockpickArea').setAttribute('coords',x + "," + y + "," + x2 + "," + y2);
        document.getElementById('lockpickArea').setAttribute('title', lockWords[pickCount]);
        document.getElementById('coordDisplay').innerHTML=x+","+y+","+x2+","+y2;
        pickCount++;
       
    } while (!passed)

    if (pickCount == 5){
        showNextChoice('game3.win','game3');
    }
}

