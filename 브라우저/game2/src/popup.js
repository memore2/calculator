class PopUp {
  constructor() {
    this.pupUp = document.querySelector(".pop-up");
    this.popUpText = document.querySelector(".pop-up_message");
    this.popUpRefresh = document.querySelector(".pop-up-refresh");
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
    this.popUpText.classList.remove("pop-up--hide");
  }
  hide() {
    this.popUp.classList.add("pop-up--hide");
  }
}
