if (typeof window !== undefined) {
    var buttons = ["red", "green", "yellow", "pink"];
    var gamePattern = [];
    var userClickedPattern = [];
    var started = false;
    var level = 0;

    $(document).keypress(function () {
        if (!started) {
            $("#level-title").text("Level " + level);
            $("#level-title").css("color", "white");
            nextSequence();
            started = true;
        }
    });

    function nextSequence() {
        userClickedPattern = [];
        level++;
        $("#level-title").text("Level " + level);
        var randomNumber = Math.floor(Math.random() * 4)
        var randomChosenColor = buttons[randomNumber];
        playSound(randomChosenColor);
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    }

    $(".btn").click(function () {
        var chosenColor = $(this).attr("id");
        userClickedPattern.push(chosenColor);
        animatedPress(chosenColor);
        playSound(chosenColor);
        checker(userClickedPattern.length - 1);
        console.log("button clicked");
    })

    function checker(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
           if(userClickedPattern.length === gamePattern.length){
               setTimeout(function () {
                   nextSequence();
                }, 1000)
            }
        }
        else {         
            $("body").addClass("game-over");
            playSound("wrong");
            $("#level-title").text("Press any key to start again");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200)
            startOver();
        }
    }

    function startOver(){
        userClickedPattern=[];
        level = 0;
        started = false;
        gamePattern = [];
    }

    function animatedPress(chosenColor){
        $("#" + chosenColor).addClass("pressed");
        setTimeout(function(){
            $("#" + chosenColor).removeClass("pressed");
        } , 100)
    }

    function playSound(name){
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }
}