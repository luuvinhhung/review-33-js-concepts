# Object.create and Object.assign

## Questions

- Create object với Object.create() và new keyword
- Shallow copy objects với Object.assign(), Spread
- Deep copy objects

## Object.create() - *new* operator

### Object.create() - object literal
> The Object.create() method creates a new object, using an existing object as the prototype of the newly created object. - MDN

```js
var cat = {
  eat: function () {
    console.log(this.food)
  }
}

var tom = Object.create(cat)
console.log(cat.isPrototypeOf(tom)) // true

tom.food = 'banana'
tom.say = function () {
  console.log(`I love ${this.food}`)
}

tom.eat() // banana
tom.say() // I love banana
```

- Step by step:

1. Tạo prototype object *cat* có method *eat* sử dụng object literal syntax.
2. Dùng **Object.create(cat)** tạo mới object *tom* kế thừa prototype object của *cat*

![tom-prototype](https://firebasestorage.googleapis.com/v0/b/hotelbooking-7127d.appspot.com/o/review-33-js%2FScreen%20Shot%202019-06-11%20at%2010.25.41.png?alt=media&token=a386aba1-b551-45d9-99bf-7b6878d858b9)

3. Kiểm tra *tom* với prototype của *cat*
4. Gán giá trị property food của *tom*
5. Tạo method *say* cho *tom*
5. Gọi eat(). JS với **prototype chain** tìm method eat trong *cat* với *this* đang là *tom*

**Property descriptor** (mô tả thuộc tính) là một object JavaScript, được sử dụng trong Object.create() để thay đổi các thuộc tính đã có của một đối tượng, hoặc tạo đối tượng mới. Ex:

```js
var cat = {
  eat: function () {
    console.log(this.food)
  }
}
var tom = Object.create(cat, {
  food: {
    get () {
      return this.value
    },
    set (food) {
      this.value = food
    },
    configurable: true,
    enumerable: true
  },
  say: {
    value: function () {
      console.log(`I love ${this.food}`)
    }
  }
})
tom.food = 'banana'
tom.eat() // banana
tom.say() // I love banana
```

Trong đó:

* **configurable**: mặc định là false, nếu bằng true, property descriptor của thuộc tính này có thể được thay đổi, hoặc thuộc tính này có thể được xoá khỏi object.

* **enumerable**: mặc định là false, nếu bằng true, thuộc tính này có thể được truy xuất khi dùng for...in hoặc Object.keys().

* **get**: trả về giá trị của thuộc tính, hoặc undefined nếu không được khai báo.
* *set*: nhận giá trị cho thuộc tính.

Có thể sử dụng **Object.create()** tạo mới một object kế thừa *tom* có thể sử dụng method của cả *tom* và *cat*. Ex:

```js
var superTom = Object.create(tom)
console.log(cat.isPrototypeOf(superTom)) // true
superTom.food = 'noodle'
superTom.eat() // noodle
superTom.say() // I love noodle
```

### *new* operator - constructor function

```js
function Cat () {
  this.food = 'banana'
  this.eat = function () {
    console.log(this.food)
  }
}

var tom = new Cat()
console.log(tom instanceof Cat) // True
tom.eat() // banana
```

Khi dùng *new* là tạo mới một object và thực thi constructor với 'this' gắn với object vừa được tạo đồng thời kế thừa prototype của constructor function

```js
function Cat () {
  this.name = 'Tom'
}

Cat.prototype.eat = 'eat-prototype'
// Using New Keyword
var tom = new Cat()
console.log(tom.name) // Tom
console.log(tom.namePrototype) // 'eat-prototype'

// Using Object.create()
var jerry = Object.create(Cat.prototype)
console.log(jerry.name) // undefined
console.log(jerry.namePrototype) // 'eat-prototype'
```

> This is due to the important difference that *new*  actually runs constructor code, whereas Object.create will not execute the constructor code.(Jonathan Voxland)

## Shallow copy objects

### Object.assign() method

Object.assign() sẽ copy properties và gía trị từ một hay nhiều object

```js
let obj = {
  a: 1,
  b: 2,
  sayHi () {
    console.log('Hi')
  }
}
let obj2 = {
  a: 3,
  c: 4,
  sayBye () {
    console.log('bye!')
  }
}
let objCopy = Object.assign({}, obj, obj2)

console.log(objCopy) // result - { a: 3, b: 2, c: 4 }
objCopy.b = 23
console.log(objCopy) // result - { a: 3, b: 23, c: 4 }
console.log(obj) // result - { a: 1, b: 2 }
objCopy.sayHi() // 'Hi'
objCopy.sayBye() // 'bye!'
```

Nhược điểm:

```js
let obj = {
  a: 1,
  b: {
    c: 2
  }
}
let newObj = Object.assign({}, obj)
console.log(newObj) // { a: 1, b: { c: 2} }

obj.a = 10
console.log(obj) // { a: 10, b: { c: 2} }
console.log(newObj) // { a: 1, b: { c: 2} }

newObj.a = 20
console.log(obj) // { a: 10, b: { c: 2} }
console.log(newObj) // { a: 20, b: { c: 2} }

newObj.b.c = 30
console.log(obj) // { a: 10, b: { c: 30} }
console.log(newObj) // { a: 20, b: { c: 30} }
```

Trong đoạn code trên *newObj.b* và *obj.b* đều reference đến cùng một object

### Spread Elements

Spread Elements ES6 giúp việc shallow copy trở nên ngắn gọn hơn

```js
let obj = {
  one: 1,
  two: 2,
  three: {
    four: 4
  }
}
let newObj = { ...obj }
console.log(newObj) // { one: 1, two: 2, three: { four: 4 } }

newObj.three.four = 5
console.log(obj) // { one: 1, two: 2, three: { four: 5 } }
console.log(newObj) // { one: 1, two: 2, three: { four: 5 } }
```

## Deep copy objects

### JSON.parse(JSON.stringify(object))

Cách copy này sẽ hoàn toàn copy object chứ không reference. Ex:

```js
let obj = {
  a: 1,
  b: {
    c: 2
  }
}

let newObj = JSON.parse(JSON.stringify(obj))

obj.b.c = 20
console.log(obj) // { a: 1, b: { c: 20 } }
console.log(newObj) // { a: 1, b: { c: 2 } }
```

Nhược điểm: cách copy này không thể copy methods của object

```js
let obj = {
  name: 'Tom',
  sayHi: function () {
    return true
  }
}
// Object.assign({}, obj)
let method1 = Object.assign({}, obj)
console.log(method1) // { name: 'Tom', sayHi: [Function: sayHi] }

// JSON.parse(JSON.stringify(obj))
let method2 = JSON.parse(JSON.stringify(obj))
console.log(method2) // { name: 'Tom' }
```
