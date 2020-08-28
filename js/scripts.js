// Business Logic 

function Cart() {
  this.contents = []
}
let cart = new Cart()

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

//let testPie = new Pizza("Small")

Pizza.prototype.addTopping = function(topping) { //Might be an array herer?
  this.toppings.push(topping)
}

// Toppings

function Topping(name,cost,id) {
  this.name = name
  this.cost = cost
  this.id = id
}

let cheese = new Topping("Cheese",2.50,"1")
let pepperoni = new Topping("Pepperoni",1,"2")
let olives = new Topping("Olives",.25,"3")
let onions = new Topping("Onions",.25,"4")



// User Interface Logic 

$(document).ready(function() {
  $("#pizzaOrder").submit(function(event) {
    event.preventDefault(event);
     let pizza = new Pizza($("#pizzaSize").val())
     console.log(pizza)

    cart.contents.push(pizza)
  });



});