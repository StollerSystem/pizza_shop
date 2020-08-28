// Business Logic 

// Shop Database
function Shop() {
  this.shoppingCart = [];
  this.allToppings = [];
  this.pizzaId = 0
}
let pizzaShop = new Shop()

Shop.prototype.removePizza = function(Id) {
  console.log("DELETE",Id)
  for (let i=0;i<this.shoppingCart.length;i++)
    if(this.shoppingCart[i]) {
      console.log(this.shoppingCart[i].size,this.shoppingCart[i].Id)
      if (this.shoppingCart[i].Id == Id) {
        delete this.shoppingCart[i];
        return true
      }
    }
    return false
}

// Pizza logic
function Pizza(size,Id) {
  this.size = size;
  this.toppings = [];
  this.cost = 0;
  this.Id = Id
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
  toppings = ["Cheese"]
  prices = [2.50,]

  for (let i=0;i<toppings.length;i++) {
    pizzaShop.allToppings.push(new Topping(toppings[i],prices[i],i))
  }




  // let cheese = new Topping("Cheese",2.50,"0");
  // let pepperoni = new Topping("Pepperoni",1,"1");
  // let olives = new Topping("Olives",.25,"2");
  // let onions = new Topping("Onions",.25,"3");
  // let = new Topping("", , )
  // let = new Topping("", , )
  // let = new Topping("", , )
  // let = new Topping("", , )
  // let = new Topping("", , )
  // let = new Topping("", , )
  // let = new Topping("", , )
  // let = new Topping("", , )

  // pizzaShop.allToppings.push(cheese,pepperoni,olives,onions);
}




// User Interface Logic 
generateToppings();
$(document).ready(function() {
  attachListeners();
  $("#pizzaOrder").submit(function(event) {
    event.preventDefault(event);
    pizzaShop.pizzaId += 1
    let pizza = new Pizza($("#pizzaSize").val(),pizzaShop.pizzaId)
    //console.log(pizza)
    $("input:checkbox[name=toppings]:checked").each(function() {
      //console.log($(this).val());
      let toppingId = $(this).val()
      pizzaShop.allToppings.forEach(function(topping) {
        //console.log(topping.id)
        if (topping.id === toppingId) {
          //console.log(topping.name)
          pizza.addTopping(topping)
        }
      })
     });
    pizzaShop.shoppingCart.push(pizza);
    displayShoppingCart()
  });

  function displayShoppingCart() {
    console.log("display cart start")
    let shoppingCart = $("#shoppingCart");
    let htmlForCart = "";

    pizzaShop.shoppingCart.forEach(function(pizza){
      if (pizza) {
        let toppings = "";
        let price = pizza.findCost();
        pizza.toppings.forEach(function(topping){
          toppings += " "+topping.name+"($"+topping.cost+")"
        });
        htmlForCart += "<li id="+pizza.Id+">"+pizza.size+" Pizza with:"+toppings+" Total Price: $"+price+"<button id="+pizza.Id +' class="btn del">Remove</button>'+"</li>";
      }      
    })
    shoppingCart.html(htmlForCart);
  }

  function attachListeners() {
    $("ul#shoppingCart").on("click",".del", function() {
      console.log("CLICKED ON A DEL BUTTON!"+this.id)
      pizzaShop.removePizza(this.id); /// STILL WORKING HERE!
      displayShoppingCart();
    });
  }







});