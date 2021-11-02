const saveBtn = document.querySelector(".shoopingApp__footer-saveBtn");
const inputValue = document.querySelector("input");
const main = document.querySelector(".shoopingApp-content");

const handleDelBtn = (event) => {
  const target = event.target.parentElement;
  target.remove();
};

const handleSaveBtn = (event) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("i");
  span.innerText = inputValue.value;
  if (inputValue.value === "") {
    inputValue.focus();

    return;
  }
  delBtn.className = "fas fa-trash-alt";
  li.appendChild(span);
  li.appendChild(delBtn);
  main.appendChild(li);
  inputValue.value = "";
  li.scrollIntoView({ block: "start" });
  inputValue.focus();
  delBtn.addEventListener("click", handleDelBtn);
};

saveBtn.addEventListener("click", handleSaveBtn);
inputValue.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleSaveBtn();
  }
});

class Counter {
  constructor(number) {
    this.counter = 0;
    this.result = number;
    console.log(this.counter);
  }
  increases() {
    this.counter++;
    console.log(this.counter);
    if (this.counter % 5 === 0) {
      this.result && this.result(this.counter);
    }
  }
}
function consoleLog(num) {
  console.log(`yo! ${num}`);
}
function salert(num) {
  alert(`alert${num}`);
}

const result = new Counter(consoleLog);
const alert = new Counter(salert);
