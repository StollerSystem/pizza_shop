// Business Logic 

function Pizza(size) {
  this.size = size
  this.toppings = []
  this.cost = 0
}

Pizza.prototype.findCost = function() {
  let runningCost = 0
  const size = this.size
  switch (size) {
    case ("Small"):
      console.log("small");
      runningCost += 10
      break;
    case ("Medium"):
      console.log("medium");
      runningCost += 15
      break;
    case ("Large"):
      console.log("large");
      runningCost = 20 
      break;
  } 
  this.cost = runningCost
}

let pie1 = new Pizza("Small")

Pizza.prototype.addTopping = function() {

}


function Toppings(name,cost) {
  this.name = name
  this.cost = cost
}












// User Interface Logic 

$(document).ready(function() {



});