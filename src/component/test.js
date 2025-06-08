
var currentTime = 0;
var isRunning = false;
var cleared = false;
var isPaused = false;
var timeAdded = 0;
var maxReached = false
var eventQueue = [];
var status = 0;
$("#event").fadeOut(500);
var nbTimerUpdate = 0;
displayEvent()
if({{alwaysShow}}){
    $("#cdtimer").fadeTo(0,500);
    display = document.querySelector('#cdtimer');
    display.textContent = "00:00"
}
window.addEventListener('onEventReceived', function (obj) {

    let data = obj.detail.event.data;
    const event = obj.detail.event;



    if(obj.detail.listener == "message"){
        var badge1,badge2,badge3 = '';
        let message = data["text"];
        const listener = obj.detail.listener.split("-")[0];
        const event = obj.detail.event;
        var command = message.split(" ")[0];
        var option = message.split(" ")[1];
        if (command.toLowerCase() == "{{chatCommand}}") {
            if( option == "start"){
                if (data["badges"][0]["type"])
                    badge1 = data["badges"][0]["type"];
                status = 1;
                nbTimerUpdate = 0;
                var time = '00:30:00';
                if(time =="" || time == null){
                    isPaused = false;
                }else{
                    isPaused = false;
                    if({{playSoundStart}} && !isRunning){
                        playAudio('{{soundFileStart}}','{{soundVolumeStart}}');
                    }
                    cleared = false;
                    const {hours, minutes, seconds} = parseTime(time);
                    currentTime  =  hours+minutes+seconds;
                    if(!isRunning){
                        start();
                    }
                }
            }else if(option == "add" && nbTimerUpdate < 30 && currentTime-- > 0){
                var timeAdd = '00:01:00';
                nbTimerUpdate = nbTimerUpdate + 1;
                const {hours, minutes, seconds} = parseTime(timeAdd);
                currentTime  = currentTime + hours + minutes + seconds;
                if(!isRunning){
                    start();
                }
                if(nbTimerUpdate == 30){
                    document.getElementById('cdtimer').style.color = "red";
                }
                playAudio('{{soundFileAdd}}','{{soundVolumeAdd}}');
            }else if(option == "remove" && nbTimerUpdate < 30 && currentTime-- > 0){
                var timeRemove = '00:01:00';
                nbTimerUpdate = nbTimerUpdate + 1;
                const {hours, minutes, seconds} = parseTime(timeRemove);
                currentTime  = currentTime - hours - minutes - seconds;
                if(!isRunning){
                    start();
                }
                if(nbTimerUpdate == 30){
                    document.getElementById('cdtimer').style.color = "red";
                }
                playAudio('{{soundFileRemove}}','{{soundVolumeRemove}}');
            }
        }else if(option == "add" && nbTimerUpdate < 30 && currentTime-- > 0){
            var timeAdd = '00:01:00';
            nbTimerUpdate = nbTimerUpdate + 1;
            const {hours, minutes, seconds} = parseTime(timeAdd);
            currentTime  = currentTime + hours + minutes + seconds;
            if(!isRunning){
                start();
            }
            if(nbTimerUpdate == 30){
                document.getElementById('cdtimer').style.color = "red";
            }
            playAudio('{{soundFileAdd}}','{{soundVolumeAdd}}');
        }else if(option == "remove" && nbTimerUpdate < 30 && currentTime-- > 0){
            var timeRemove = '00:01:00';
            nbTimerUpdate = nbTimerUpdate + 1;
            const {hours, minutes, seconds} = parseTime(timeRemove);
            currentTime  = currentTime - hours - minutes - seconds;
            if(!isRunning){
                start();
            }
            if(nbTimerUpdate == 30){
                document.getElementById('cdtimer').style.color = "red";
            }
            playAudio('{{soundFileRemove}}','{{soundVolumeRemove}}');
        }




    }
});


function displayEvent(){
    if(eventQueue.length !=0){
        eventQueue = eventQueue.reverse()
        $("#event").fadeOut(500, function() {
            $("#event").text(eventQueue.pop());
            $("#event").fadeIn(500);
        });
        eventQueue = eventQueue.reverse()
        setTimeout(displayEvent, 10000);
    }else{
        $("#event").fadeOut(500, function() {
            $("#event").text("");
            $("#event").fadeIn(500);
        });
        setTimeout(displayEvent, 500);
    }

}
function start(){
    document.querySelector("#cdtimer").classList.remove('animated', "bounceOut");
    document.querySelector("#cdtimer").classList.remove('animated', "slow");
    $("#cdtimer").fadeTo(0,500);
    update();
    if(isPaused && isRunning){
        setTimeout(start, 1000);
        return;
    }
    if(currentTime-- > 0 ){
        isRunning = true;
        setTimeout(start, 1000);
    }else{
        if({{playSound}} && !cleared){
            playAudio('{{soundFile}}','{{soundVolume}}');
        }
        if(!{{alwaysShow}}){
            setTimeout(() => {
                animateCSS('#cdtimer', "bounceOut");
                animateCSS('#cdtimer', "slow");
                $("#cdtimer").fadeTo(500,0);
            }, 2000);
        }
        isRunning = false;
        cleared = false;
    }
}

function eventIncreaseTime(time){
    if({{cappedTime}}!=null && {{cappedTime}}!=-1){
        if({{cappedTime}} <= timeAdded){
            maxReached = true
            return
        }
        timeAdded = timeAdded + time/60;

    }
    if(currentTime == null)
        currentTime = 0;
    currentTime  = currentTime + time;
    if(!isRunning){
        start();
    }
}

function parseTime(time) {
    var hours = 0;
    var minutes = 0;
    var seconds = 0;

    var split = time.split(":");

    if(split.length == 3){
        hours = parseInt(split[0]) * 60*60;
        minutes = parseInt(split[1]) * 60;
        seconds = parseInt(split[2]);
    }else if(split.length == 2){
        hours = 0;
        minutes = parseInt(split[0]) * 60;
        seconds = parseInt(split[1]);
    }else{
        hours = 0;
        minutes = 0;
        seconds = parseInt(split[0]);
    }
    return {hours, minutes, seconds};
}

function update(){
    display = document.querySelector('#cdtimer');
    let d = Number(currentTime);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    hours = h < 10 ? "0" + h : h;
    minutes = m < 10 ? "0" + m : m;
    seconds = s < 10 ? "0" + s : s;

    if(currentTime == null){
        display.textContent = ""
        return
    }

    if(hours!=0){
        display.textContent = hours + ":" +minutes + ":" + seconds;
    }else{
        display.textContent = minutes + ":" + seconds;
    }

}

function animateCSS(element, animationName) {
    const node = document.querySelector(element);
    node.classList.add('animated', animationName)

}
function playAudio(sound, volume){
    let audio = new Audio(sound);
    audio.volume = volume * .01;
    audio.play();
}
function checkLockedTimer(nbTimerUpdate){
    display = document.querySelector('#cdtimer');
    nbTimerUpdate = nbTimerUpdate;
    console.log(display);
    console.log(nbTimerUpdate);
    if(nbTimerUpdate > 4){
        console.log(display.textContent.style.color);
        display.textContent.style.color = "red";
    }
}
setInterval(checkLockedTimer, 1000, nbTimerUpdate);
