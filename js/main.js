var flag = false;

class Player {
    constructor(Name) {
        this.name = Name;
        this.health = 100;
    }

    updateHealth(decreaseBy, id) {
        if (this.health - decreaseBy <= 0) {
            this.health = 0;
            checkWinner();
            return false;
        }
        else {
            this.health -= decreaseBy;
            if (decreaseBy > 0) 
            {
                $("#"+id).addClass("fire")
                flag = true;
                setTimeout(function () {
                    $("#"+id).removeClass("fire")
                    invert(id);
                }, 500)
            }
        }
    }
}


var Player1 = 0;
var Player2 = 0;

var count = 0;
var power = 0;



function invert(id)
{
    console.log("id = ",id)
    let imageID = "";
    if(id == "player1bullet") imageID = "#player2Image"
    else imageID = "#player1Image"
    
    $(imageID).css({"filter" : "invert(1)"})
    setTimeout(function(){$(imageID).css({"filter" : "initial"})} , 50)
    setTimeout(function(){$(imageID).css({"filter" : "invert(1)"})} , 100)
    setTimeout(function(){$(imageID).css({"filter" : "initial"})} , 150)
    
    setTimeout(()=>{
        flag = false;
        update();
    } , 200)
}

function getRandomArbitrary(min = 1, max = 6) {
    return parseInt(Math.random() * (max - min) + min);
}


function update() {
    power = getRandomArbitrary();
    document.getElementById('power').innerText = "Power = " + power;
    document.getElementById("player1health").innerText = "Player 1 health = " + Player1.health;
    document.getElementById("player2health").innerText = "Player 2 health = " + Player2.health;

    if(count == 0) document.getElementById('turn').innerText = Player1.name + "'s turn"
    else document.getElementById('turn').innerText = Player2.name + "'s turn"
}


function hit(player) {
    if (flag) return;
    let result;
    if (count == 0) 
    {
        if(player == "player2")
        {
            alert("Its Player 1 turn");
            return;
        }
        result = Player2.updateHealth(power, "player1bullet")
        count = 1;
    }
    else {
        if(player == "player1")
        {
            alert("Its Player 2 turn");
            return;
        }
        result = Player1.updateHealth(power, "player2bullet")
        count = 0;
    }

    if (result) update();

}

function checkWinner() {
    if (Player1.health == 0) alert(Player2.name + " is Winner !")
    else alert(Player1.name + " is Winner !");
}






document.getElementById('startButton').addEventListener('click', function (e) {
    e.preventDefault();

    if (document.getElementById('player1NameInput').value.trim() == "" || document.getElementById('player2NameInput').value.trim() == "") alert("PLease enter the player names.")

    else {
        Player1 = new Player(document.getElementById('player1NameInput').value);
        Player2 = new Player(document.getElementById('player2NameInput').value);
        document.getElementById("myForm").style.display = "none";
        document.getElementById("powerContainer").style.display = "flex";
        document.getElementById("playerHealthContainer").style.display = "flex";
        document.getElementById("playerContainer").style.display = "flex";
        update();
    }

})


