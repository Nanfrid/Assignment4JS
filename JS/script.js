//URL for acessing API
const apiEndpoint = "https://noroff-komputer-store-api.herokuapp.com/";

//variables
let currentLoan = 0;
let balance = 0;
let earned = 0;
const salary = 100;
let laptopBought = false;
let loanRepayed = false;
let laptops = [];

//Accessing buttons
const getLoanButton = document.getElementById("loanButt");
const bankButton = document.getElementById("bankButt");
const workButton = document.getElementById("workButt");
const repayLoanButton = document.getElementById("repayButt");
const buyNowButton = document.getElementById("buyButt");

//Acessing HTML elements
const bankBalance = document.getElementById("balance");
const loanStuff = [...document.getElementsByClassName("hidden")];
const outLoan = document.getElementById("outLoan");
const moneyEarned = document.getElementById("moneyEarned");
const laptopName = document.getElementById("lapName");
const laptopInfo = document.getElementById("lapInfo");
const laptopsElement = document.getElementById("laptops");
const laptopPrice = document.getElementById("lapPrice");
const laptopSpecs = document.getElementById("lapSpecs");
const laptopIamge = document.getElementById("lapIMG");

//Retrieves the JSON-objects from the API and adds them to the laptops array
fetch("https://noroff-komputer-store-api.herokuapp.com/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToList(laptops));

//Displays the information from the JSON-object within the laptops array that has index 0 -
//in order to have something displayed when the page loads
const addLaptopsToList = (laptops) => {
  laptops.forEach((x) => addLaptopToList(x));
  laptopPrice.innerText = laptops[0].price + "Kr";
  laptopName.innerText = laptops[0].title;
  laptopInfo.innerText = laptops[0].description;
  laptopSpecs.innerText = laptops[0].specs;
  displayImages(laptops[0]);
  laptopIamge.setAttribute("alt", laptops[0].title);
};

//function for adding a laptop to the select list
const addLaptopToList = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  laptopsElement.appendChild(laptopElement);
};

//Function for handling when the user changes laptop in the select element
const handleLaptopListChange = (e) => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  laptopPrice.innerText = selectedLaptop.price + "Kr";
  laptopName.innerText = selectedLaptop.title;
  laptopInfo.innerText = selectedLaptop.description;
  laptopSpecs.innerText = selectedLaptop.specs;

  laptopIamge.setAttribute("src", selectedLaptop.image);
  laptopIamge.setAttribute("alt", selectedLaptop.title);
  displayImages(selectedLaptop);
};

//Function for displaying images
async function displayImages(lappyTop) {
  const imgUrl = apiEndpoint + "/" + lappyTop.image;
  try {
    const image = await fetch(imgUrl);
    if (!image.ok) {
      laptopIamge.setAttribute("src", "https://placekitten.com/200/300");
    } else {
      laptopIamge.setAttribute("src", imgUrl);
    }
  } catch (error) {
    console.log(error);
  }
}

//Functions for updating the variables earned, currentLoan, and balance
const updateEarned = (value) => {
  earned = value;
  moneyEarned.innerText = earned + "kr";
};

const updateOutLoan = (value) => {
  currentLoan = value;
  outLoan.innerText = currentLoan + "kr";
};

const updateBalance = (value) => {
  balance = value;
  bankBalance.innerText = balance + "Kr";
};

//function increasing the earned field with 100kr each click
const work = () => {
  earned += salary;
  moneyEarned.innerText = earned + "Kr";
};

//Function for toggling "hidden" attribute on loan elements
const toggle = () => {
  loanStuff.forEach((element) => {
    element.classList.toggle("hidden");
  });
};

//Function for transferring earned money to bank balance
const transfer = () => {
  if (currentLoan > 0) {
    let deduct = earned * 0.1;
    let actual = earned * 0.9;
    currentLoan -= deduct;
    balance += actual;
    updateOutLoan(currentLoan);
    updateBalance(balance);
  }
  if (currentLoan <= 0) {
    currentLoan = 0;
    updateOutLoan(currentLoan);
    balance += earned;
    updateBalance(balance);
  }
  earned = 0;
  updateEarned(earned);
};

//Function for recieving a loan. It checks if the requested loan is more than double their bank balance
//Also checks if there is an outstanding loan and if a laptop has been purchased
const getLoan = () => {
  const totalLoan = prompt("Please enter the amount you wish to loan: ");
  if (totalLoan > balance * 2) {
    alert("You can't loan this much, please enter a lower number");
  } else if (!laptopBought && loanRepayed) {
    alert("You must buy a laptop before taking another loan");
  } else if (currentLoan > 0) {
    alert("You must pay back your outstanding loan, before taking another one");
  } else {
    currentLoan += parseInt(totalLoan);
    updateOutLoan(currentLoan);
    balance += currentLoan;
    updateBalance(balance);
    toggle();
  }
};

//Function for repaying the loan, the repay loan button and the outstanding loan is hidden if the loan is fully paid
const repay = () => {
  if (earned > currentLoan && currentLoan != 0) {
    let rest = earned - currentLoan;
    balance = rest;
    currentLoan = 0;
    earned = 0;
    updateOutLoan(currentLoan);
    updateBalance(balance);
    updateEarned(earned);
    loanRepayed = true;
  } else if (currentLoan >= earned) {
    currentLoan = currentLoan - earned;
    earned = 0;
    updateOutLoan(currentLoan);
    updateEarned(earned);
  }
  if (currentLoan === 0) {
    alert("You do not have an outstanding loan");
    toggle();
    loanRepayed = true;
  }
};

//Function for buying a selected laptop
const buyLaptop = () => {
  const selectedLaptop = laptops[laptopsElement.selectedIndex];
  const price = selectedLaptop.price;
  if (balance >= price) {
    balance -= price;
    alert("You bought: " + selectedLaptop.title);
    updateBalance(balance);
    laptopBought = true;
  } else {
    alert("You can't afford: " + selectedLaptop.title);
  }
};

//Event Listeners for the various buttons and the select
laptopsElement.addEventListener("change", handleLaptopListChange);
workButton.addEventListener("click", work);
bankButton.addEventListener("click", transfer);
getLoanButton.addEventListener("click", getLoan);
buyNowButton.addEventListener("click", buyLaptop);
repayLoanButton.addEventListener("click", repay);
