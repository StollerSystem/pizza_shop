// Business Logic 

// Shop Database and Logic
function Shop() {
  this.shoppingCart = [];
  this.allToppings = [];
  this.pizzaId = 0
}

let pizzaShop = new Shop()

Shop.prototype.removePizza = function(Id) {  
  for (let i=0;i<this.shoppingCart.length;i++)
    if(this.shoppingCart[i]) {      
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
      runningCost += 10
      break;
    case ("Medium"):     
      runningCost += 15
      break;
    case ("Large"):      
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

// Toppings Logic
function Topping(name,cost,id) {
  this.name = name;
  this.cost = cost;
  this.id = id;
}

function generateToppings () { 
  toppings = ["Cheese","Pepperoni","Black Olives","Onions","Green Peppers","Jalapenos","Pineapple","Canadian Bacon","Sausage","Fresh Basil","Crushed Garlic","Fresh Arugula"]
  prices = [2.50,1,.50,.25,.25,.25,1,1.5,1.5,1,.5,1]
  for (let i=0;i<toppings.length;i++) {
    pizzaShop.allToppings.push(new Topping(toppings[i],prices[i],i))
  }  
}

// User Interface Logic 
generateToppings();
$(document).ready(function() {
  $("#alien").hide()
  attachListeners();
  displayShoppingCart()
  $("#pizzaOrder").submit(function(event) {
    event.preventDefault(event);
    $("#placeOrder").show();
    pizzaShop.pizzaId += 1
    let pizza = new Pizza($("#pizzaSize").val(),pizzaShop.pizzaId)    
    $("input:checkbox[name=toppings]:checked").each(function() {      
      let toppingId = $(this).val()
      pizzaShop.allToppings.forEach(function(topping) {       
        if (topping.id == toppingId) {          
          pizza.addTopping(topping)
        }
      })
     });
    pizzaShop.shoppingCart.push(pizza);
    displayShoppingCart()
    $("#pizzaOrder")[0].reset();
  });

  $("#placeOrder").click(function(){
    $("#alien").show(2000)
    $(".container").hide(2000)
  })

  $("#alien").click(function(){
    $("#alien").hide(2000)
    $(".container").show(2000)
  })

  function displayShoppingCart() {        
    let shoppingCart = $("#shoppingCart");
    let htmlForCart = "";
    let empty = true; 
    pizzaShop.shoppingCart.forEach(function(pizza){
      if (pizza) {
        empty = false;
        let toppings = "";
        let price = pizza.findCost();
        if (pizza.toppings.length > 0) {
          toppings = "with:";          
          pizza.toppings.forEach(function(topping){
          toppings += ' <span class="topName">'+topping.name+"</span>($"+topping.cost.toFixed(2)+")"
         });
        } else {
          toppings = '<strong class="yellow">plain!</strong>'
        }        
        htmlForCart += "<li id="+pizza.Id+'><span class="topPrice">'+pizza.size+" SPACE PIE</span> "+toppings+'<span class="topPrice"> Total Price: <span class="yellow">$'+price.toFixed(2)+"</span></span><button id="+pizza.Id +' class="btn del">Remove</button>'+"</li>";
      }           
    })
    if (empty === true) {
      htmlForCart += "Empty...start building SPACE PIES!";
      $("#placeOrder").hide();
    }
    grandTotal();
    shoppingCart.html(htmlForCart);
  }

  function grandTotal() {
    let grandTotal = 0;
    pizzaShop.shoppingCart.forEach(function(pizza){
      grandTotal += pizza.findCost();
    })
    $("#grandTotal").text(" $"+grandTotal.toFixed(2));    
  }

  function attachListeners() {
    $("ul#shoppingCart").on("click",".del", function() {
      console.log("CLICKED ON A DEL BUTTON!"+this.id);
      pizzaShop.removePizza(this.id); 
      displayShoppingCart();
    });
  }
});