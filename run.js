function Cat () {
  this.food = 'banana'
}

Cat.prototype.eat = 'eat-prototype'
// Using New Keyword
var tom = new Cat()
console.log(tom.food) // Tom
console.log(tom.eat) // 'eat-prototype'

// Using Object.create()
var jerry = Object.create(Cat.prototype)
console.log(jerry.food) // undefined
console.log(jerry.eat) // 'eat-prototype'
