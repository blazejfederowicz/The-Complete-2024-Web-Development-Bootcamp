const titleElement = document.querySelector("h1");
let randomNumber1= Math.floor(Math.random() * 6) +1;
let randomNumber2= Math.floor(Math.random() * 6) +1;

if(randomNumber1===randomNumber2){
    titleElement.innerHTML="Draw!";
}
else if(randomNumber1>randomNumber2){
    titleElement.innerHTML="Player 1 wins!";
}
else{
    titleElement.innerHTML="Player 2 wins!";
}

document.querySelector(".img1").setAttribute("src",`./images/dice${randomNumber1}.png`)
document.querySelector(".img2").setAttribute("src",`./images/dice${randomNumber2}.png`)

