function debugOn(){
    if (typeof console  != "undefined")
      if (typeof console.log != 'undefined')
	console.olog = console.log;
    else
      console.olog = function() {};

    console.log = function(message) {
	console.olog(message);
	var debugDiv = document.getElementById('debugDiv');
	var statement = document.createElement('p');
	statement.innerHTML = '<p>' + message + '</p>'
	debugDiv.appendChild(statement);
    };
    console.error = console.debug = console.info =  console.log
}
var die1 = {
    'name' : 'cheese',
    'move' : 1,
    'cheese' : true,
    'crit' : false,
    'melee' : false,
    'ranged' : false,
    'defence' : false,
    'spritespot' : 0
}
var die2 = {
    'name' : 'melee',
    'move' : 2,
    'cheese' : false,
    'crit' : true,
    'melee' : true,
    'ranged' : false,
    'defence' : false,
    'spritespot' : 20
}
var die3 = {
    'name' : 'melee-defence',
    'move' : 3,
    'cheese' : false,
    'crit' : false,
    'melee' : true,
    'ranged' : false,
    'defence' : true,
    'spritespot' : 40
}
var die4 = {
    'name' : 'ranged',
    'move' : 2,
    'cheese' : false,
    'crit' : false,
    'melee' : false,
    'ranged' : true,
    'defence' : false,
    'spritespot' : 60
}
var die5 = {
    'name' : 'melee-defence-crit',
    'move' : 3,
    'cheese' : false,
    'crit' : true,
    'melee' : true,
    'ranged' : false,
    'defence' : true,
    'spritespot' : 100
}
var die6 = {
    'name' : 'ranged-crit',
    'move' : 1,
    'cheese' : false,
    'crit' : true,
    'melee' : false,
    'ranged' : true,
    'defence' : false,
    'spritespot' : 80
}
function roll(){
    pickUpRolledDice();
    console.log('ROLLING');

    var dice1 = document.getElementsByName ("micedice");
    for (var i=0; i < dice1.length; i++) {
      if (dice1[i].checked) {
	var miceRoll = i + 1;
      }
    }
    var dice2 = document.getElementsByName ("miniondice");
    for (var i=0; i < dice2.length; i++) {
      if (dice2[i].checked) {
	var minionRoll = i + 1;
      }
    }
    //var miceRoll = (document.forms.mmDieRoller.micedice.value);
    //var minionRoll = (document.forms.mmDieRoller.miniondice.value);
    console.log('miceroll: ' + miceRoll);
    console.log('minionroll: ' + minionRoll);
    if(miceRoll){
	console.log('inside mice loop');
	var rollResults = determineRolls(miceRoll);
	console.log('results are in for mice');
	showDice(rollResults, 'mice');
	console.log('shown dice for mice');
    } else {
	console.log('Did not get a miceroll');
    }
    if(minionRoll) {
	console.log('inside minion loop');
	var rollResults = determineRolls(minionRoll);
	console.log('results are in for minions');
	showDice(rollResults, 'minions');
	console.log('shown dice for minions');
    } else {
	console.log('Did not get a minionroll');
    }
    if(!miceRoll && !minionRoll){
	return;
    }
    stopRollingPlease();
    console.log('rolling stopped');
    clearChoices();
}
function determineRolls(times) {
    var rollResults = [];
    console.log('rolling this many times: ' + times);
    for(var i = 1; i <= times; i++){
	rollResults[i] = Math.floor(Math.random() * 6) + 1;
    }
    //Optional: roll report:
    console.log('Rollreport' + rollResults);

    return rollResults;
}
function showDice(rollResults, roller){
    // report:
    console.log('rollresults: ' + rollResults);
    console.log('roller: ' + roller);
    // determine container for the dice
    if(roller == 'mice') {
	var diceContainer = document.getElementById('mice-rolling-container');
    } else if (roller == 'minions') {
	var diceContainer = document.getElementById('minions-rolling-container');
    }
    // for each of the rolled dice, create li
    for(var i = 1; i < rollResults.length; i++){
	/** This to make the die accessible **/
	diename = 'die' + rollResults[i];
	//console.log(this[diename]);

	var whichDie = roller + [i];

	var rolledDie = document.createElement('li');
	rolledDie.style.backgroundPosition = this[diename]['spritespot'] + '% 0';

	switch(roller){
	    case 'minions' :
		rolledDie.className = 'rolledDie minions';
		rolledDie.innerHTML = "<img id='" + whichDie + "' class='rollingDie' src='MMminiondie.gif'>";
		break;
	    case 'mice' :
		rolledDie.className = 'rolledDie mice'
		rolledDie.innerHTML = "<img id='" + whichDie + "' class='rollingDie' src='MMdie.gif'>";
		break;
	}
	diceContainer.appendChild(rolledDie);
	document.getElementById('rolling-container').className = '';
    }
}
function stopRollingPlease(){
    var timeToStopRolling;
    timeToStopRolling = setInterval(stopRoll, 1000);
    if(!timeToStopRolling){
	console.log('Could not start timer. Rolling forever');
	return;
    }
    function stopRoll() {
	var dice = document.getElementsByClassName('rollingDie');
	for (var i = 0; i < dice.length; i++) {
	    dice[i].className = 'rollingDie gone';
	    clearInterval(timeToStopRolling);
	}
    };
}
function clearChoices() {
    var micedice = document.getElementsByName('micedice');
    for(var i=0;i<micedice.length;i++) {
	micedice[i].checked = false;
    }
    var miniondice = document.getElementsByName('miniondice');
    for(var i=0;i<miniondice.length;i++) {
	miniondice[i].checked = false;
    }
}
function pickUpRolledDice(){
    var miceRollContainer = document.getElementById('mice-rolling-container');
    var minionRollContainer = document.getElementById('minions-rolling-container');
    miceRollContainer.innerHTML = '';
    minionRollContainer.innerHTML = '';
    // reset debug console
    var debugDiv = document.getElementById('debugDiv');
    debugDiv.innerHTML = '';
}