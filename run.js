var cat = {
  eat: function () {
    console.log(this.eatFood)
  }
}

var tom = Object.create(cat)
console.log(cat.isPrototypeOf(tom)) // true
tom.eatFood = 'banana'
tom.eat() // banana
