// Business Logic 

function Shop() {
  this.shoppingCart = [];
  this.allToppings = [];
}
let pizzaShop = new Shop()

function Pizza(size) {
  this.size = size;
  this.toppings = [];
  this.cost = 0;
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

  this.toppings.forEach(function(topping){
    runningCost += topping.cost
  })

  this.cost = runningCost;
  return runningCost
}

//let testPie = new Pizza("Small")

Pizza.prototype.addTopping = function(topping) { 
  this.toppings.push(topping)
}

// Toppings

function Topping(name,cost,id) {
  this.name = name;
  this.cost = cost;
  this.id = id;
}

function generateToppings () { //Maybe use a loop here???
  let cheese = new Topping("Cheese",2.50,"0");
  let pepperoni = new Topping("Pepperoni",1,"1");
  let olives = new Topping("Olives",.25,"2");
  let onions = new Topping("Onions",.25,"3");

  pizzaShop.allToppings.push(cheese,pepperoni,olives,onions);
}




// User Interface Logic 
generateToppings();
$(document).ready(function() {
  $("#pizzaOrder").submit(function(event) {
    event.preventDefault(event);
    let pizza = new Pizza($("#pizzaSize").val())
    //console.log(pizza)

    $("input:checkbox[name=toppings]:checked").each(function() {
      console.log($(this).val());
      let toppingId = $(this).val()
      pizzaShop.allToppings.forEach(function(topping) {
        console.log(topping.id)
        if (topping.id === toppingId) {
          console.log(topping.name)
          pizza.addTopping(topping)
        }
      })
     });






    pizzaShop.shoppingCart.push(pizza);
  });



});