let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");

const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");

const productTitle = document.getElementById("product-title");
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById("product-title-error");
const productCostError = document.getElementById("product-cost-error");

const amount = document.getElementById("amount");
const expenditureValue = document.getElementById("expenditure-value");
const balanceValue = document.getElementById("balance-amount");
const list = document.getElementById("list");

let tempAmount = 0;

totalAmountButton.addEventListener("click", () => {
    tempAmount = totalAmount.value;
    if(tempAmount === "" || tempAmount < 0){
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");

        amount.innerHTML = tempAmount;
        balanceValue.innerText = tempAmount - expenditureValue.innerText;
        totalAmount.value = ""
    }
});

const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

const modifyEl = (element, edit = false)  => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if(edit){
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }

    balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
};

const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content","flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;

    let editBtn = document.createElement("button");
    editBtn.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editBtn.style.fontSize = "1.2em";
    editBtn.addEventListener("click", () => {
        modifyEl(editBtn, true);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteBtn.style.fontSize = "1.2em";
    deleteBtn.addEventListener("click", () => {
        modifyEl(deleteBtn);
    });

    sublistContent.appendChild(editBtn);
    sublistContent.appendChild(deleteBtn);
    document.getElementById("list").appendChild(sublistContent)
};

checkAmountButton.addEventListener("click", () => {
    if(!userAmount.value || !productTitle.value){
        productTitleError.classList.remove("hide");
        return false;
    }

    disableButtons(false);

    let expenditure = parseInt(userAmount.value);

    let sum = parseInt(expenditureValue.innerText) + expenditure;
    expenditureValue.innerText = sum;

    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;
    
    listCreator(productTitle.value, userAmount.value);

    productTitle.value = "";
    userAmount.value = "";

});
