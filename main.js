
const grass_count = 50;
const grass_name = "grass";
const ball_count = 5;
const ball_name = "pokeball";
const player_speed = 1.8;
const player = document.querySelector(".player");
const SOUND = new Audio("assets/coin.mp3");
let playerpos = {
    x:0,
    y:0,
};
let playervel = {
    x:0,
    y:0,
};
const START_PLAYER_POS = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

function start(){
  gnearate_randemelements(grass_name, grass_count);
  gnearate_randemelements(ball_name, ball_count);

  playerpos = START_PLAYER_POS;

}
function update(){

    playerpos.x += playervel.x ;
    playerpos.y += playervel.y;
    player.style.left = playerpos.x + "px";
    player.style.top = playerpos.y + "px";
     
    checkCollisions();

   // console.log('run');
    window.requestAnimationFrame(update);
}

window.addEventListener("keydown", e=>{
    if (e.key == "ArrowUp") {
        playervel.y = -1 * player_speed;
        player.style.backgroundImage = "url('assets/player_front.png')";
      }
      if (e.key == "ArrowDown") {
        playervel.y = 1 * player_speed;
        player.style.backgroundImage = "url('assets/player_back.png')";
      }
      if (e.key == "ArrowLeft") {
        playervel.x = -1 * player_speed;
        player.style.backgroundImage = "url('assets/player_left.png')";
      }
      if (e.key == "ArrowRight") {
        playervel.x = 1 * player_speed;
        player.style.backgroundImage = "url('assets/player_right.png')";
      }
      player.classList.add("walk");
});
window.addEventListener("keyup", e=>{
    playervel.x =0;
    playervel.y =0;
    player.classList.remove("walk");
});
function checkCollisions() {
    balls = document.querySelectorAll(".pokeball");
    balls.forEach((ball) => {
      if (collision(ball, player)) {
       // console.log("Collision.........");
        ball.style.left = Math.random() * 100 + "%";
        ball.style.top = Math.random() * 100 + "%";
        SOUND.play();
      }
    });
  }
function gnearate_randemelements(class_name, count_element){
    for(let count =0; count<count_element; count++){
        const div_gnerate = document.createElement('div');
        div_gnerate.classList.add(class_name);
        div_gnerate.style.left = Math.random()*100 + "%";
        div_gnerate.style.top = Math.random()*100 + "%";
        document.body.appendChild(div_gnerate);
    }
}
function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;
  
    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;
  
    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }
start()
update();