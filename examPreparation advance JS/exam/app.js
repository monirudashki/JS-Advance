window.addEventListener("load", solve);

function solve() {
   let inputMake = document.getElementById("make");
   let inputModel = document.getElementById("model");
   let inputYear = document.getElementById("year");
   let inputFuel = document.getElementById("fuel");
   let inputOriginalCost = document.getElementById("original-cost");
   let inputSellingPrice = document.getElementById("selling-price");

   let btnPublish = document.getElementById("publish");
   btnPublish.addEventListener("click" , onPublish);
   
   let tbody = document.getElementById("table-body");

   let ulElement = document.getElementById("cars-list");

   let totalProfit = document.getElementById("profit");
   function onPublish (event) {
    event.preventDefault();
      if(inputMake.value != "" && inputModel.value != "" && inputYear.value != "" && inputFuel.value != "" && inputOriginalCost.value != "" && inputSellingPrice.value != "" && inputOriginalCost.value < inputSellingPrice.value) {
        //chek the inputs chek
        let tr = document.createElement("tr");
        tr.className = "row";
        let td1 = document.createElement("td");
        td1.textContent = inputMake.value;
        tr.appendChild(td1);
        let td2 = document.createElement("td");
        td2.textContent = inputModel.value;
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        td3.textContent = inputYear.value;
        tr.appendChild(td3);
        let td4 = document.createElement("td");
        td4.textContent = inputFuel.value;
        tr.appendChild(td4);
        let td5 = document.createElement("td");
        td5.textContent = inputOriginalCost.value;
        tr.appendChild(td5);
        let td6 = document.createElement("td");
        td6.textContent = inputSellingPrice.value;
        tr.appendChild(td6);
        let tdButtons = document.createElement("td");
        let btnEdit = document.createElement("button");
        btnEdit.className = "action-btn edit";
        btnEdit.textContent = "Edit";
        btnEdit.addEventListener("click" , onEdit);
        tdButtons.appendChild(btnEdit);
        let btnSell = document.createElement("button");
        btnSell.className = "action-btn sell";
        btnSell.textContent = "Sell";
        btnSell.addEventListener("click" , onSell);
        tdButtons.appendChild(btnSell);

        tr.appendChild(tdButtons);

        tbody.appendChild(tr);
      }

      inputMake.value = "";
      inputModel.value = "";
      inputYear.value = "";
      inputFuel.value = "";
      inputOriginalCost.value = "";
      inputSellingPrice.value = "";
   }

   function onEdit (event) {
    let tr = event.target.parentElement.parentElement;
    let tds = tr.querySelectorAll("td");
    inputMake.value = tds[0].textContent;
    inputModel.value = tds[1].textContent;
    inputYear.value = tds[2].textContent;
    inputFuel.value = tds[3].textContent;
    inputOriginalCost.value = tds[4].textContent;
    inputSellingPrice.value = tds[5].textContent;

    tr.remove();
   }

   function onSell (event) {
    let tr = event.target.parentElement.parentElement;
    let tds = tr.querySelectorAll("td");
    let currentProfit = Number(tds[5].textContent) - Number(tds[4].textContent);
    let li = document.createElement("li");
    li.className = "each-list";
    let span1 = document.createElement("span");
    span1.textContent = `${tds[0].textContent} ${tds[1].textContent}`;
    li.appendChild(span1);
    let span2 = document.createElement("span");
    span2.textContent = tds[2].textContent;
    li.appendChild(span2);
    let span3 = document.createElement("span");
    span3.textContent = currentProfit;
    li.appendChild(span3);

    ulElement.appendChild(li);
    
    totalProfit.textContent = (Number(totalProfit.textContent) + currentProfit).toFixed(2);

    tr.remove();
   }
}
