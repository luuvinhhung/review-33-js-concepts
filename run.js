var cat = {
  eat: function () {
    console.log(this.food)
  }
}

var tom = Object.create(cat)
console.log(cat.isPrototypeOf(tom)) // true
tom.food = 'banana'
tom.eat() // banana

tom.say = function () {
  console.log(`I love ${this.food}`)
}
tom.say() // I love banana

var superTom = Object.create(tom)
console.log(cat.isPrototypeOf(superTom)) // true
superTom.food = 'noodle'
superTom.eat() // noodle
superTom.say() // I love noodle
