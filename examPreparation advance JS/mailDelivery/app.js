function solve() {
    let recipientInput = document.getElementById("recipientName");
    let titleInput = document.getElementById("title");
    let messageInput = document.getElementById("message");

    let btnAddToTheList = document.getElementById("add");
    let btnReset = document.getElementById("reset");

    btnAddToTheList.addEventListener("click" , onAdd);
    btnReset.addEventListener("click" , onReset);
    let ulElement = document.getElementById("list");
    let ulList = document.querySelectorAll("ul");
    let ulSendList = ulList[1];
    let ulDeleteList = ulList[2];
    function onAdd (event) {
        event.preventDefault()
       if(recipientInput.value != "" && titleInput.value != "" && messageInput != "") {
         let liElement = document.createElement("li");
         let h4one = document.createElement("h4");
         h4one.textContent = `Title: ${titleInput.value}`;
         liElement.appendChild(h4one);
         let h4two = document.createElement("h4");
         h4two.textContent = `Recipient Name: ${recipientInput.value}`;
         liElement.appendChild(h4two);
         let spanEl = document.createElement("span");
         spanEl.textContent = messageInput.value;
         liElement.appendChild(spanEl);

         let divEl = document.createElement("div");
         divEl.id = ("list-action");
         let btnSend = document.createElement("button");
         btnSend.type = "submit";
         btnSend.id = "send";
         btnSend.textContent = "Send";
         divEl.appendChild(btnSend);
         let btnDelete = document.createElement("button");
         btnDelete.type = "submit";
         btnDelete.id = "delete";
         btnDelete.textContent = "Delete";
         divEl.appendChild(btnDelete);
         liElement.appendChild(divEl);
         ulElement.appendChild(liElement);
         //ad event listener of buttons
         btnSend.addEventListener("click" , onSend);
         btnDelete.addEventListener("click", onDelete);

         recipientInput.value = "";
         titleInput.value = "";
         messageInput.value = "";
       }
    }

    function onReset (event) {
        event.preventDefault();
        recipientInput.value = "";
        titleInput.value = "";
        messageInput.value = "";
    }  

    function onSend(event) {
        let li = event.target.parentElement.parentElement;
        let spans = li.querySelectorAll("h4");
        let email = spans[0].textContent;
        let title = spans[1].textContent;
        li.remove();
        let liElement = document.createElement("li");
        let span1 = document.createElement("span");
        span1.textContent = email;
        liElement.appendChild(span1);
        let span2 = document.createElement("span");
        span2.textContent = title;
        liElement.appendChild(span2);
        let div = document.createElement("div");
        div.className = "btn";
        let btnDel = document.createElement("button");
        btnDel.type = "submit";
        btnDel.className = "delete";
        btnDel.textContent = "Delete";
        btnDel.addEventListener("click" , onDel);
        div.appendChild(btnDel);
        liElement.appendChild(div);
        ulSendList.appendChild(liElement);
    }
    function onDelete (event) {
        let li = event.target.parentElement.parentElement;
        let spans = li.querySelectorAll("h4");
        let email = spans[0].textContent;
        let title = spans[1].textContent;
        li.remove();

        let liElement = document.createElement("li");
        let span1 = document.createElement("span");
        span1.textContent = email;
        liElement.appendChild(span1);
        let span2 = document.createElement("span");
        span2.textContent = title;
        liElement.appendChild(span2);
        ulDeleteList.appendChild(liElement);
    }
    function onDel (event) {
        let li = event.target.parentElement.parentElement;
        let spans = li.querySelectorAll("span");
        let email = spans[0].textContent;
        let title = spans[1].textContent;
        li.remove();
        console.log(ulDeleteList);
        let liElement = document.createElement("li");
        let span1 = document.createElement("span");
        span1.textContent = email;
        liElement.appendChild(span1);
        let span2 = document.createElement("span");
        span2.textContent = title;
        liElement.appendChild(span2);
        ulDeleteList.appendChild(liElement);
    }
}
solve()