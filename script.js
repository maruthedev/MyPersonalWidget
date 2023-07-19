/**
* Stupid personal IOS Widget I've made in
* my freetime by using Scriptable
*
* Feel free to use, both the Widget and 
* the source
* 
* @author: La Manh Tu
* @link: https://github.com/maruthedev/MyPersonalWidget
*/


let myWidget = new ListWidget();
const API = "https://api.imgflip.com/get_memes";
const errors = [
  "err: there's an error with the Request progress"
];
let informations = {
  "author":iMadeThisStupidStuff(),
  "device":theDevice(),
  "status":whatTimeIsIt(), 
  "battery":getBattery(),
  "note":thisIsAFuckingNote(),
  "memeImg": await memeImg()
};

function iMadeThisStupidStuff(){
  return "@author : github.com/maruthedev";
}

function theDevice(){
  return "📱 | " + Device.systemName() + Device.systemVersion();
}

function whatTimeIsIt(){
  let now = new Date();
  let startWorkingTime = new Date();
  let endWorkingTime = new Date();
  startWorkingTime.setHours(8,0,0);
  endWorkingTime.setHours(17,0,0);
  return (now >= startWorkingTime && now <= endWorkingTime)? "👨‍💻 | currently at working":"🙋‍♂️ | currently living";
}

function getBattery(){
  let btrLvl = (Device.batteryLevel() * 100).toString().match("\[0-9]{1,3}[.][0-9]{3}");
  return (btrLvl >= 40? "🔋":"🪫")+" | battery level is about " + btrLvl + "%";
}

function thisIsAFuckingNote(){
  return "🌆 | random meme kekeke :D"
}

async function memeImg(){
  let req = await new Request(API).loadJSON();
  let img = await new Request(req.data.memes[randomNumber()].url).loadImage();
  return img;
}

function randomNumber(){
  return  Math.floor(Math.random()*Math.random()*100);
}

async function setup(){
  let authorTxt = myWidget.addText(informations.author);
  let splitter = myWidget.addText(" - - - - - - - - - - - - - - - - - - - - - - ");
  let deviceTxt = myWidget.addText(informations.device);
  let statusTxt = myWidget.addText(informations.status);
  let batteryTxt = myWidget.addText(informations.battery);
  let fknNoteTxt = myWidget.addText(informations.note);
   
  authorTxt.textColor = Color.gray();
  splitter.textColor = Color.brown();
  deviceTxt.textColor = Color.cyan();
  statusTxt.textColor = Color.purple();
  batteryTxt.textColor = Color.yellow();
  fknNoteTxt.textColor = Color.green();
  
  let memeImg = await myWidget.addImage(informations.memeImg).catch(err => {console.error(errors[0])});
  
  Script.setWidget(myWidget);
}

setup();
Script.complete();
myWidget.presentLarge();
