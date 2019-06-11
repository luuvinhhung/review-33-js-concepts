# Object.create and Object.assign

## Questions

- Create object với Object.create() và new keyword
- Shallow copy objects với Object.assign(), Spread
- Deep copy objects

## Object.Create()

```js
var cat = {
  eat: function () {
    console.log(this.eatFood)
  }
}

var tom = Object.create(cat)
console.log(cat.isPrototypeOf(tom)) // true
tom.eatFood = 'banana'
tom.eat() // banana
```

1. Tạo object *cat* sử dụng object literal syntax.
2. Khởi tạo *tom* với Object.create(*cat*) có prototype của *cat*
3. Kiểm tra biến *tom* với prototype của *cat*
4. Gán giá trị vào *this.eatFood*
5. Gọi function eat()
6. JS dùng prototype chain tìm method eat trong cat với *this* đang là *tom*

## Create object with *new* keyword

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

Cả hai cách đều tạo object mới và kế thừa prototype,… Điểm khác nhau là Object.create() sẽ không có this.name trong constructor là do Object.create() không thực thi constructor function, trái lại khi tạo với từ khoá *new* sẽ thực thi constructor.

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
