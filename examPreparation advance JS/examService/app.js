window.addEventListener("load", solve);

function solve() {
  let inputDescription = document.getElementById("description");
  let inputName = document.getElementById("client-name");
  let inputPhone = document.getElementById("client-phone");

  let select = document.getElementById("type-product");
  let section = document.getElementById("received-orders"); // that is the parent for the button send form
  let btnSendForm = document.querySelector("button");
  btnSendForm.addEventListener("click", onSendForm);
  let btnClear = document.getElementsByClassName("clear-btn")[0];
  btnClear.addEventListener("click", onClear);
  function onSendForm(event) {
    event.preventDefault();
    if (inputDescription.value != "" && inputName.value != "" && inputPhone.value != "") {
      let div = document.createElement("div");
      div.className = "container";
      let h2 = document.createElement("h2");
      h2.textContent = `Product type for repair: ${select.value}`;
      div.appendChild(h2);
      let h3 = document.createElement("h3");
      h3.textContent = `Client information: ${inputName.value}, ${inputPhone.value}`;
      div.appendChild(h3);
      let h4 = document.createElement("h4");
      h4.textContent = `Description of the problem: ${inputDescription.value}`;
      div.appendChild(h4);
      let btnStart = document.createElement("button");
      btnStart.className = "start-btn";
      btnStart.textContent = "Start repair";
      btnStart.addEventListener("click", onStartRepair);
      div.appendChild(btnStart);

      let btnFinish = document.createElement("button");
      btnFinish.className = "finish-btn";
      btnFinish.textContent = "Finish repair";
      btnFinish.addEventListener("click", onFinishRepair);
      btnFinish.disabled = true;
      div.appendChild(btnFinish);

      section.appendChild(div);
    }
    inputDescription.value = "";
    inputName.value = "";
    inputPhone.value = "";
  }

  function onStartRepair(event) {
    let div = event.target.parentElement;
    let buttons = div.querySelectorAll("button");
    let start = buttons[0];
    let finish = buttons[1];
    start.disabled = true;
    finish.disabled = false;
  }

  function onFinishRepair(event) {
    let sectionCompleteOrders = document.getElementById("completed-orders");

    let divToRemove = event.target.parentElement;
    let cloneDiv = divToRemove.cloneNode(true);
    divToRemove.remove();
    let buttons = cloneDiv.querySelectorAll("button");
    buttons[0].remove();
    buttons[1].remove();
    sectionCompleteOrders.appendChild(cloneDiv);
  }

  function onClear(event) {
    let section = event.target.parentElement;
    let divs = Array.from(section.querySelectorAll("div"));

    for (let div of divs) {
      div.remove();
    }
  }
}
