//start of donate section
function inputValidation(){
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("address").value;
    var cardNumber = document.getElementById("cardNum").value;
    var pinNumber = document.getElementById("cvv").value;
    var mothInput = document.getElementById("monthInput").value;
    var yearInput = document.getElementById("yearInput").value;
    var fixedDonatons = document.getElementById("fixedDonatons").value;

  alert("We appreciate your generous contribution!")

  clearDonatiom();
  
}

function clearDonatiom(){
  const inputs = document.querySelectorAll('#name, #email, #address, #fixedDonatons, #comment, #cardNum, #cardHolder, #monthInput, #yearInput, #cvv');

  inputs.forEach(input => {
    input.value = '';
  });
};

class CustomSelect {
  constructor(originalSelect) {
    this.originalSelect = originalSelect;
    this.customSelect = document.createElement("div");
    this.customSelect.classList.add("select");

    this.originalSelect.querySelectorAll("option").forEach((optionElement) => {
      const itemElement = document.createElement("div");

      itemElement.classList.add("select__item");
      itemElement.textContent = optionElement.textContent;
      this.customSelect.appendChild(itemElement);

      if (optionElement.selected) {
        this._select(itemElement);
      }

      itemElement.addEventListener("click", () => {
        if (
          this.originalSelect.multiple &&
          itemElement.classList.contains("select__item--selected")
        ) {
          this._deselect(itemElement);
        } else {
          this._select(itemElement);
        }
      });
    });

    this.originalSelect.insertAdjacentElement("afterend", this.customSelect);
    this.originalSelect.style.display = "none";
  }

  _select(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    if (!this.originalSelect.multiple) {
      this.customSelect.querySelectorAll(".select__item").forEach((el) => {
        el.classList.remove("select__item--selected");
      });
    }

    this.originalSelect.querySelectorAll("option")[index].selected = true;
    itemElement.classList.add("select__item--selected");
  }

  _deselect(itemElement) {
    const index = Array.from(this.customSelect.children).indexOf(itemElement);

    this.originalSelect.querySelectorAll("option")[index].selected = false;
    itemElement.classList.remove("select__item--selected");
  }
}

document.querySelectorAll(".custom-select").forEach((selectElement) => {
  new CustomSelect(selectElement);
});
 //end of donate section

//Ticket Section
let tickets = {
  price : [1000,500,5000,2500,15000,4500], 
  duration : [0,250,500,1000], 
  extras : [5000,500]
}

var ticketApp = {
  ticket_cost : 0, 
  ap_cost : 0, //annual pass cost
  ft_cost : 0,  // food token cost
  no_of_adults : 0,
  no_of_children :0,
  spCost :0,
};


function calculateCost() {

  var ticket_price = tickets["price"];
  var duration_price = tickets["duration"];
  var extras_price = tickets["extras"];

  var cost = 0;
  
  var choice = document.getElementById("cmbChoice").value;
  var duration = document.getElementById("cmbDuratiom").value;
  var noOfAdults = document.getElementById("noOfAdult").value;
  var noOfChildren = document.getElementById("noOfChild").value;
  var foodTokens = document.getElementById("noOfTokens").value;
  var annualPasses = document.getElementById("noOfPasses").value;

 

if(noOfAdults || noOfChildren != 0){

  if(choice == ""){
    alert("Please select your choice");
    document.getElementById("cmbChoice").focus();
    return;
  }

  if(duration == ""){
    alert("Please select the duration");
    document.getElementById("cmbDuratiom").focus();
    return;
  }

}

  if(duration != "" && choice == ""){
      alert("Please select the choice first");
      document.getElementById("cmbDuratiom").focus();
      
      return;
  }

  if(noOfAdults == ""){
    noOfAdults = 0;
    
  }
  else{
    noOfAdults = parseInt(noOfAdults);

  }

  if(noOfChildren == "" ){
    noOfChildren = 0;
  }
  else{
    noOfChildren = parseInt(noOfChildren);

  }

  if(foodTokens == ""){
    foodTokens = 0;
    
  }
  else{
    foodTokens = parseInt(foodTokens);

  }

  if(annualPasses == ""){
    annualPasses = 0;
    
  }
  else{
    annualPasses = parseInt(annualPasses);

  }
  var tPrice = 0;
  choice = parseInt(choice);


  switch(choice) {
    case 0:
      tPrice = ticket_price[0] * noOfAdults + ticket_price[1] * noOfChildren;
      break;
    case 1:
      tPrice = ticket_price[2] * noOfAdults + ticket_price[3] * noOfChildren;
      break;
    case 2:
      tPrice = ticket_price[4] * noOfAdults + ticket_price[5] * noOfChildren;
      break;
    default:
      
  }

  if(duration !=""){
    duration = parseInt(duration);
    tPrice = tPrice + duration_price[duration];

  }
  ticketApp.ticket_cost = tPrice;

  ticketApp.ft_cost = foodTokens * extras_price[1];
  ticketApp.ap_cost = annualPasses * extras_price[0];

  cost = parseFloat(tPrice + ticketApp.ft_cost + ticketApp.ap_cost);

  document.getElementById("spCost").innerHTML = cost.toFixed(2);

  ticketApp.no_of_adults = noOfAdults;
  ticketApp.no_of_children = noOfChildren;
  ticketApp.spCost = cost;

}

document.getElementById("AddOrder").onclick = function(){

  if(ticketApp.spCost>0){
    document.getElementById("tbl_order").style = "display: inlineblock;"
  }

  var cost = parseFloat(document.getElementById("spCost").innerHTML);
  if(cost == 0){
      alert("You cannot place an order without any items in the current order. Please add one or more items to continue.");
      return;
  }

  var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
  var total_ftokens = parseInt(document.getElementById("thFtokens").innerHTML);
  var grand_token = parseFloat(document.getElementById("pthFtokens").innerHTML);
  var total_apasses = parseInt(document.getElementById("thApasses").innerHTML);
  var grand_passes = parseFloat(document.getElementById("pthApasses").innerHTML);

  var annualPasses = document.getElementById("noOfPasses").value;
  var foodTokens = document.getElementById("noOfTokens").value;
  

  if(foodTokens == ""){
    foodTokens = 0;
    
  }
  else{
    foodTokens = parseInt(foodTokens);

  }

  if(annualPasses == ""){
    annualPasses = 0;
    
  }
  else{
    annualPasses = parseInt(annualPasses);

  }

  var ctrl_choice = document.getElementById("cmbChoice");
  var choice_txt = ctrl_choice.options[ctrl_choice.selectedIndex].text;

  var ctrl_duration = document.getElementById("cmbDuratiom");
  var duration_txt = ctrl_duration.options[ctrl_duration.selectedIndex].text;

  var total = ticketApp.ticket_cost;
  
  var tbody = document.getElementById("tbody_order");


  if(ticketApp.no_of_adults>0 || ticketApp.no_of_children>0){

    var trow = tbody.insertRow(-1)

    td1 = trow.insertCell(0);
    td1.innerHTML = choice_txt;

    td2 = trow.insertCell(1);
    td2.innerHTML=document.getElementById("noOfAdult").value;
    td2.style = "text-align:center";

    td3 = trow.insertCell(2);
    td3.innerHTML=document.getElementById("noOfChild").value;
    td3.style = "text-align:center";

    td4 = trow.insertCell(3);
    td4.innerHTML = document.getElementById("date").value;
    td4.style = "text-align:center";

    td5 = trow.insertCell(4);
    td5.innerHTML = duration_txt;
    td5.style = "text-align:center";
    

    td6 = trow.insertCell(5);
    td6.innerHTML=total.toFixed(2);
    td6.style = "text-align:right";

    td7 = trow.insertCell(6);
    td7.innerHTML = "<a href='javascript:void(0)' style='color:red;font-weight:bold' onclick='removeRecord(this.parentElement);'> <img src ='images/trash-bin.png' id ='trashBin' alt ='trashbin' > </a>";

  }
  
  total_ftokens = total_ftokens + foodTokens;
  document.getElementById("thFtokens").innerHTML = total_ftokens.toFixed(2);
  document.getElementById("thFtokens").style = "text-align:center";

  grand_token = grand_token + ticketApp.ft_cost;
  document.getElementById("pthFtokens").innerHTML = grand_token.toFixed(2);
  document.getElementById("pthFtokens").style = "text-align:right";

  total_apasses = total_apasses + annualPasses;
  document.getElementById("thApasses").innerHTML = total_apasses.toFixed(2);
  document.getElementById("thApasses").style = "text-align:center";

  grand_passes = grand_passes + ticketApp.ap_cost;
  document.getElementById("pthApasses").innerHTML = grand_passes.toFixed(2);
  document.getElementById("pthApasses").style = "text-align:right";
  
  grand_total = grand_total + ticketApp.spCost;
  document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
  document.getElementById("thGrandTot").style = "text-align:center";

  document.getElementById("spCost").innerHTML = grand_total.toFixed(2);

  document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);
  resetPurchaseForm();
  calcLoyaltyPoints();
  
}

function resetPurchaseForm(){
  document.getElementById("frmPurchase").reset();
  document.getElementById("spCost").innerHTML = "0.00";
}

function removeRecord(item){
  var result = confirm("Do you want to remove this record?");
  
  if(result == true){
      var table = document.getElementById("tbl_order");
      var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
      var total = parseFloat(item.parentElement.cells[5].innerHTML);
      grand_total = grand_total - total;
      document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
      document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);
      table.deleteRow(item.parentElement.rowIndex);
  }
 
}

function removeAnuualPasses(){
  var result = confirm("Do you want to remove all annual passes? You can always add more later if necessary.");
  
  if(result == true){
    var tpannualPasses = parseFloat( document.getElementById("pthApasses").innerHTML);
    var tannualPasses = parseFloat(document.getElementById("thApasses").innerHTML);
    var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
    grand_total = grand_total -tpannualPasses;
    document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
    document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);
    tpannualPasses = 0;
    tannualPasses = 0;

    document.getElementById("pthApasses").innerHTML = tpannualPasses;
    document.getElementById("thApasses").innerHTML = tannualPasses;
   
  }

}

function removeFoodTokens(){
  var result = confirm("Do you want to remove all food tokens? You can always add more later if necessary.");
  
  if(result == true){
    var tpfoodTokens = parseFloat( document.getElementById("pthFtokens").innerHTML);
    var tfoodTokens = parseFloat(document.getElementById("thFtokens").innerHTML);
    var grand_total = parseFloat(document.getElementById("thGrandTot").innerHTML);
    grand_total = grand_total -tpfoodTokens;
    document.getElementById("thGrandTot").innerHTML = grand_total.toFixed(2);
    document.getElementById("overallGtotal").innerHTML = grand_total.toFixed(2);
    tpfoodTokens = 0;
    tfoodTokens = 0;

    document.getElementById("pthFtokens").innerHTML = tpfoodTokens;
    document.getElementById("thFtokens").innerHTML = tfoodTokens;
   
  }
 
}
document.getElementById("extra_items").style.display = "none"; 

function showHide() {
  var x = document.getElementById("extra_items");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
document.getElementById("placeOrder").onclick = function(){
  var overallOrder = parseFloat(document.getElementById("overallGtotal").innerHTML);
  if(overallOrder != 0){
  var Table = document.getElementById("tbody_order");
  document.getElementById("thGrandTot").innerHTML = "0.00";
  document.getElementById("overallGtotal").innerHTML = "0.00";
  Table.innerHTML = "";
  document.getElementById("tbl_order").style = "display: none;"
  alert("Thank you for your purchase of tickets or additional items. We look forward to seeing you again soon.")
  }
  else{
    alert("You cannot place an order without any items in the overall order. Please add one or more items to continue.")
  }
}
//Date Validdddd?
var todayDate = new Date();
var frmDate = document.getElementById("date");
var month = todayDate.getMonth() + 1; 
var year = todayDate.getUTCFullYear() - 0; 
var tdate = todayDate.getDate(); 
if(month < 10){
  month = "0" + month 
}
if(tdate < 10){
  tdate = "0" + tdate;
}
var maxDate = year + "-" + month  + "-" + tdate; 
document.getElementById("date").value = maxDate;
frmDate.setAttribute("min",maxDate)


const formId = "frmPurchase"; // ID of the form
const formDetector = `${formId}`; // Identifier used to identify the form
const saveButton = document.querySelector("#addFavourite"); // select save button
const retrieveButton = document.querySelector("#retriveFavourite"); // selectretrieve button
const alertBox = document.querySelector(".alert"); // select alert display div
let form = document.querySelector(`#${formId}`); // select form
let formElements = form.elements; // get the elements in the form


 const getFormData = () => {
  let data = { [formDetector]: {} }; 
  for (const element of formElements) {
    if (element.name.length > 0) {
      data[formDetector][element.name] = element.value;
    }
  }
  return data;
};

saveButton.onclick = event => {
  event.preventDefault();
  data = getFormData();
  localStorage.setItem(formDetector, JSON.stringify(data[formDetector]));
  const message = "Your order has been saved as a favorite . Thank you.";
  displayAlert(message);
};

const displayAlert = message => {
  alertBox.innerText = message; // add the message into the alert box
  alertBox.style.display = "block"; // make the alert box visible
  setTimeout(function() {
    alertBox.style.display = "none"; // hide the alert box after 2 seconds
  }, 2000);
}
 const formautoRefill = () => {
  if (localStorage.key(formDetector)) {
    const savedData = JSON.parse(localStorage.getItem(formDetector)); 
    for (const element of formElements) {
      if (element.name in savedData) {
        element.value = savedData[element.name];
      }
    }
    const message = "Form has been refilled with saved data!";
    displayAlert(message);
    document.getElementById("extra_items").style.display = "block"; 
  }
};
retrieveButton.onclick = function(){
    formautoRefill(); 
    calculateCost();

}
var grand_loyaltyPoints = 0;
var loyaltyPoints =0;
var totalTicket = 0;

function calcLoyaltyPoints(){
 
  
  totalTicket = totalTicket + ticketApp.no_of_adults + ticketApp.no_of_children;
  if(totalTicket > 3){
      loyaltyPoints = 20 * totalTicket;
      grand_loyaltyPoints = grand_loyaltyPoints + loyaltyPoints; 
      localStorage.setItem("loyality",grand_loyaltyPoints);
  }
}
function showLoyaltyPoints(){
  
  grand_loyaltyPoints = JSON.parse(localStorage.getItem(`loyality`));
 
  if(grand_loyaltyPoints>0){
      alert("Congratulations! You have earned "+  grand_loyaltyPoints + " loyalty points so far");
  }
  else{
      alert("Sorry! You don't have any loyalty points so far");
  }
}