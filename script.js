/**
* Stupid personal IOS Widget I've made in
* my freetime by using Scriptable
*
* Feel free to use, both the Widget and 
* the source
* 
* @author: La Manh Tu
*/


let myWidget = new ListWidget();
const API = "https://api.imgflip.com/get_memes";
const errors = [
  "err1: Could not load memes. Please check your internet connection!"
];
let informations = {
  "author":iMadeThisStupidStuff(),
  "device":theDevice(),
  "status":whatTimeIsIt(), 
  "battery":getBattery(),
  "note":thisIsAFuckingNote(),
  "memeImg": await memeImgUrl()
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

async function memeImgUrl(){
  let req = await new Request(API).loadJSON()
  .then(json => new Request(json.data.memes[randomNumber()].url).loadImage())
  .then(img => img)
  .catch(err => {
    let errTxt = myWidget.addText(errors[0]);
    errTxt.textColor = Color.red();
    return null;
  });
  return req;
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
  
  let memeImg = await myWidget.addImage(informations.memeImg);
  
  Script.setWidget(myWidget);
}

setup().catch(err => console.error(err));
Script.complete();
myWidget.presentLarge();
