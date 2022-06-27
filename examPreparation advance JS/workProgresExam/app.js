function solve() {
  let inputFirstName = document.getElementById("fname");
  let inputLastName = document.getElementById("lname");
  let inputEmail = document.getElementById("email");
  let inputDateOfBirth = document.getElementById("birth");
  let inputPosition = document.getElementById("position");
  let inputSalary = document.getElementById("salary");

  let btnHireWorker = document.getElementById("add-worker");

  btnHireWorker.addEventListener("click", onHireWorker);

  let tbody = document.getElementById("tbody");
  // that is the parent of the table

  let salaryTotalSum = document.getElementById("sum");
  function onHireWorker(event) {
    event.preventDefault();
    if (
      inputFirstName.value != "" &&
      inputLastName.value != "" &&
      inputEmail.value != "" &&
      inputDateOfBirth.value != "" &&
      inputPosition.value != "" &&
      inputSalary.value != ""
    ) {
      let tr = document.createElement("tr");
      let tdFN = document.createElement("td");
      tdFN.textContent = inputFirstName.value;
      tr.appendChild(tdFN);
      let tdLN = document.createElement("td");
      tdLN.textContent = inputLastName.value;
      tr.appendChild(tdLN);
      let tdEmail = document.createElement("td");
      tdEmail.textContent = inputEmail.value;
      tr.appendChild(tdEmail);
      let tdDateOfBirth = document.createElement("td");
      tdDateOfBirth.textContent = inputDateOfBirth.value;
      tr.appendChild(tdDateOfBirth);
      let tdP = document.createElement("td");
      tdP.textContent = inputPosition.value;
      tr.appendChild(tdP);
      let tdSalary = document.createElement("td");
      tdSalary.textContent = inputSalary.value;
      tr.appendChild(tdSalary);
      let tdButtons = document.createElement("td");
      let btnFired = document.createElement("button");
      btnFired.className = "fired";
      btnFired.textContent = "Fired";
      btnFired.addEventListener("click" , onFired);
      tdButtons.appendChild(btnFired);
      let btnEdit = document.createElement("button");
      btnEdit.className = "edit";
      btnEdit.textContent = "Edit";
      btnEdit.addEventListener("click" , onEdit);
      tdButtons.appendChild(btnEdit);
      tr.appendChild(tdButtons);

      tbody.appendChild(tr);
      salaryTotalSum.textContent = (Number(salaryTotalSum.textContent) + Number(inputSalary.value)).toFixed(2);
      //salaryTotalSum.textContent += Number(salaryTotalSum.textContent) + Number(inputSalary.value); 
    }
    inputFirstName.value = "";
    inputLastName.value = "";
    inputDateOfBirth.value = "";
    inputEmail.value = "";
    inputPosition.value = "";
    inputSalary.value = "";
  }


  function onFired (event) {
    let tr = event.target.parentElement.parentElement;
    let tds = tr.querySelectorAll("td");

    salaryTotalSum.textContent = (Number(salaryTotalSum.textContent) - Number(tds[5].textContent)).toFixed(2);

    tr.remove();
  }

  function onEdit (event) {
    let tr = event.target.parentElement.parentElement;
    let tds = tr.querySelectorAll("td");
    inputFirstName.value = tds[0].textContent;
    inputLastName.value = tds[1].textContent;
    inputEmail.value = tds[2].textContent;
    inputDateOfBirth.value = tds[3].textContent;
    inputPosition.value = tds[4].textContent;
    inputSalary.value = tds[5].textContent;
    
    salaryTotalSum.textContent = (Number(salaryTotalSum.textContent) - Number(tds[5].textContent)).toFixed(2);

    tr.remove();
  }


}
solve();
