"use strict";

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

class PopUp {
  constructor() {
    this.popUp = document.querySelector(".pop-up");
    this.popUpText = document.querySelector(".pop-up__message");
    this.popUpRefresh = document.querySelector(".pop-up__refresh");
    this.popUpRefresh.addEventListener("click", () => {
      this.onClick && this.onClick();
      this.hide();
    });
  }
  setClickListener(onClick) {
    this.onClick = onClick;
  }
  showWithText(text) {
    this.popUpText.innerText = text;
    this.popUp.classList.remove("pop-up--hide");
  }
  hide() {
    this.popUp.classList.add("pop-up--hide");
  }
}

class Field {
  constructor() {
    this.field = document.querySelector(".game__field");
    this.gameField = this.field.getBoundingClientRect();
    this.field.addEventListener("click", (item) => {
      this.item && this.item(item);
    });
  }

  onClick(item) {
    this.item = item;
  }

  init(BUG, CARROT) {
    this.field.innerHTML = "";
    this.makeCharacter("bug", BUG, "img/bug.png");
    this.makeCharacter("carrot", CARROT, "img/carrot.png");
  }

  makeCharacter(characterName, characterCount, characterPath) {
    const min1 = 0;
    const min2 = 0;
    const max1 = this.gameField.width - 80;
    const max2 = this.gameField.height - 80;
    for (let i = 0; i < characterCount; i++) {
      const character = document.createElement("img");
      character.setAttribute("class", characterName);
      character.setAttribute("src", characterPath);
      character.style.position = "absolute";
      character.style.left = `${randomMath(min1, max1)}px`;
      character.style.top = `${randomMath(min2, max2)}px`;
      this.field.append(character);
    }
  }
}

function randomMath(min, max) {
  return Math.random() * (max - min) - min;
}

class game {
  constructor(carrotCount, bugCount, gameSec) {
    this.field = document.querySelector(".game__field");
    this.fieldRect = this.field.getBoundingClientRect();
    this.gameBtn = document.querySelector(".game__button");
    this.timerIndicator = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");

    this.started = false;
    this.score = 0;
    this.timer = undefined;
    this.CARROT_SIZE = 80;
    this.CARROT_COUNT = carrotCount;
    this.BUG_COUNT = bugCount;
    this.GAME_DURATION_SEC = gameSec;
    this.Feld = new Field();
    this.Feld.onClick(this.onFieldClick);
    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stopGame();
      } else {
        this.startGame();
      }
    });
  }

  initGame = () => {
    this.score = 0;
    this.gameScore.innerText = this.CARROT_COUNT;
    this.Feld.init(this.BUG_COUNT, this.CARROT_COUNT);
  };

  startGame = () => {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    playSound(bgSound);
  };

  stopGame() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    showPopUp.showWithText("REPLAY❓");
    playSound(alertSound);
    stopSound(bgSound);
  }

  finishGame = (win) => {
    this.started = false;
    this.hideGameButton();
    if (win) {
      playSound(winSound);
    } else {
      playSound(bugSound);
    }
    this.stopGameTimer();
    stopSound(bgSound);
    showPopUp.showWithText(win ? "YOU WON 🎉" : "YOU LOST 💩");
  };

  showStopButton = () => {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  };

  showTimerAndScore() {
    this.timerIndicator.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer = () => {
    let remainingTimeSec = this.GAME_DURATION_SEC;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finishGame(this.score === this.CARROT_COUNT);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  };

  updateTimerText = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
  };

  stopGameTimer = () => {
    clearInterval(this.timer);
  };

  onFieldClick = (event) => {
    if (!this.started) {
      return;
    }
    const target = event.target;
    if (target.matches(".carrot")) {
      // 당근!!
      target.remove();
      this.score++;
      playSound(carrotSound);
      this.updateScoreBoard();
      if (this.score === this.CARROT_COUNT) {
        this.finishGame(true);
      }
    } else if (target.matches(".bug")) {
      this.finishGame(false);
    }
  };

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.CARROT_COUNT - this.score;
  }
}

class Build {
  carrotTotalNumber(carrot) {
    this.carrot = carrot;
    return this;
  }

  bugTotalNumber(bug) {
    this.bug = bug;
    return this;
  }

  timeCount(count) {
    this.count = count;
    console.log(this);
    return this;
  }
  build = () => {
    return new game(this.carrot, this.bug, this.count);
  };
}

const showPopUp = new PopUp();
const build = new Build()
  .carrotTotalNumber(3)
  .bugTotalNumber(3)
  .timeCount(5)
  .build();

showPopUp.setClickListener(build.startGame);

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
