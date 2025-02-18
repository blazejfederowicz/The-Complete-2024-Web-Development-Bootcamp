const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = []
let gamePattern = [];
let level = 0;

function playSound(name){
    const audio = new Audio(`./sounds/${name}.mp3`);
    return audio.play();
}

function nextSequence(){
    userClickedPattern=[];
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour)
    $('#'+randomChosenColour).fadeOut().fadeIn();
    $('#level-title').text(`Level ${level}`)

    level++;
}

function animatePress(currentColour){
    $(`.${currentColour}`).addClass('pressed')
    setTimeout(()=>{
        $(`.${currentColour}`).removeClass('pressed')
    },100)
}

const checkPattern = ()=> gamePattern.every((e,i)=> userClickedPattern[i]===e)

$(document).on("keydown",(e)=>{
    if(level===0){
        nextSequence();
    }
})


$('.btn').on('click',(e)=>{
    if(level>0){
        let userChosenColor = e.target.id;
        userClickedPattern.push(userChosenColor);
        let index = userClickedPattern.length - 1

        playSound(userChosenColor);
        animatePress(userChosenColor);

        if(userClickedPattern[index]===gamePattern[index]){
            if(userClickedPattern.length===level&&checkPattern()){
                nextSequence();
            }
        }
        else{
            playSound('wrong');
            $('body').addClass('game-over');
            setTimeout(()=>{
                $('body').removeClass('game-over'); 
            },200)
            $('#level-title').text(`Game Over, Press Any Key to Restart`);
            startOver();
        }
        
        
    }
})

function startOver(){
    gamePattern=[];
    level = 0;
}

