# 33 JS Concepts

## Table of Contents

18. **[Object.create and Object.assign](#18-objectcreate-and-objectassign)**

19. **[Functional Programming in JS: map, filter, reduce](#19-functional-programming-in-js-map-filter-reduce)**

## 18. Object.create and Object.assign

### Contents

* [Object.create() và new operator](#Objectcreate---new-operator)

* [Object.assign(), Spread, JSON serialization](#Clone-a-Javascript-object)

### Object.create() - *new* operator

#### Object.create() - object literal

> The Object.create() method creates a new object, using an existing object as the prototype of the newly created object. - MDN

Example:

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

Step by step:

1. Tạo prototype object *cat* có method *eat* sử dụng object literal syntax.

2. Dùng **Object.create(cat)** tạo mới object *tom* kế thừa prototype object của *cat*

![tom-prototype](https://github.com/luuvinhhung/review-33-js-concepts/blob/master/Screen%20Shot%202019-06-11%20at%2010.25.41.png?raw=true)

3. Kiểm tra *tom* với prototype của *cat*

4. Gán giá trị property food của *tom*

5. Tạo method *say* cho *tom*

6. Gọi eat(). JS với **prototype chain** tìm method eat trong *cat* với *this* đang là *tom*

**Property descriptor** (mô tả thuộc tính) là một object JavaScript, được sử dụng trong Object.create() để thay đổi các thuộc tính đã có của một đối tượng, hoặc tạo đối tượng mới.

Example:

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
* **set**: nhận giá trị cho thuộc tính.

Có thể sử dụng **Object.create()** tạo mới một object kế thừa *tom* có thể sử dụng method của cả *tom* và *cat*. Ex:

```js
var superTom = Object.create(tom)
console.log(cat.isPrototypeOf(superTom)) // true
superTom.food = 'noodle'
superTom.eat() // noodle
superTom.say() // I love noodle
```

#### *new* operator - constructor function

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

#### Difference between Object.create() and the *new* operator

Example:

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

### Clone a Javascript object

#### Object.assign()

Object.assign() sẽ sao chép những thuộc tính của một hay nhiều object nguồn (sources) qua đối tượng đích (target).

Example:

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

objCopy.b = 23
console.log(objCopy)
// { a: 3,
//   b: 23,
//   sayHi: [Function: sayHi],
//   c: 4,
//   sayBye: [Function: sayBye] }

console.log(obj) // { a: 1, b: 2, sayHi: [Function: sayHi] }
objCopy.sayHi() // 'Hi'
objCopy.sayBye() // 'bye!'
```

Nhược điểm: Khi có object lồng nhau như trong đoạn code sau *newObj.b* và *obj.b* đều reference đến cùng một object nên những thay đổi thuộc tính object đó sẽ ảnh hưởng đến tất cả:

```js
let obj = {
  a: 1,
  b: {
    c: 2
  }
}
let newObj = Object.assign({}, obj)

newObj.a = 20
console.log(obj) // { a: 10, b: { c: 2 } }
console.log(newObj) // { a: 20, b: { c: 2 } }

newObj.b.c = 30
console.log(obj) // { a: 10, b: { c: 30 } }
console.log(newObj) // { a: 20, b: { c: 30} }
```

#### Spread Elements

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

#### JSON serialization

> **JSON.parse(JSON.stringify(object))**

Cách này có thể deep copy object reference đến object khác (inner object). Tuy nhiên nhược điểm là không thể copy những kiểu không thể chuyển sang JSON như Function hay Infinity.

```js
let obj = {
  name: 'Tom',
  sayHi: function () {
    return true
  }
}
// Object.assign({}, obj)
let newObj1 = Object.assign({}, obj)
console.log(newObj1) // { name: 'Tom', sayHi: [Function: sayHi] }

// JSON.parse(JSON.stringify(obj))
let newObj2 = JSON.parse(JSON.stringify(obj))
console.log(newObj2) // { name: 'Tom' }
```

### References

[📜 Object.create() — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

[📜 Object.create in JavaScript — Rupesh Mishra](https://hackernoon.com/object-create-in-javascript-fa8674df6ed2)

[📜 Basic Inheritance with Object.create — Joshua Clanton](http://adripofjavascript.com/blog/drips/basic-inheritance-with-object-create.html)

[📜 Object.create() In JavaScript — GeeksforGeeks](https://www.geeksforgeeks.org/object-create-javascript/)

[📜 Understanding the difference between Object.create() and the new operator — Jonathan Voxland](https://medium.com/@jonathanvox01/understanding-the-difference-between-object-create-and-the-new-operator-b2a2f4749358)

[📜 Copying Objects in JavaScript ― Orinami Olatunji](https://scotch.io/bar-talk/copying-objects-in-javascript)

[📜 Object.assign() — MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

[📜 How to deep clone a JavaScript Object — Flavio Copes](https://flaviocopes.com/how-to-clone-javascript-object/)

**[⬆ Back to Top](#table-of-contents)**

<!-- ## 19. map, reduce, filter -->

## 19. Functional Programming in JS: map, filter, reduce

### Contents

* Higher-Order Functions

* .filter() - .map() - .reduce()

### Higher-Order Functions

Là function nhận function khác làm parameter.

Example:

```js
const iceCreams = [
  { flavor: 'pineapple', img: 'img1.jpg', color: 'white' },
  { flavor: 'kiwi', img: 'img2.jpg', color: 'green' },
  { flavor: 'pear', img: 'img3.jpg', color: 'green' }
]

const greens = data => data.filter(iceCream => iceCream.color === 'green')
const images = data => data.map(iceCream => iceCream.img)

const compose = (func1, func2) => data => func2(func1(data))
const displayImages = compose(
  greens,
  images
)
console.log(displayImages(iceCreams))
// [ "img2.jpg",
//   "img3.jpg" ]
```

Steps:

1. Function *compose* nhận vào hai functions và return function khác. *Compose* có thể tái sử dụng để kết hợp kết quả của các parameter function từ trái sang phải.

2. Sau đó gọi function *compose* và truyền vào hai functions là *greens* và *images* đồng thời gán vào *displayImages*

3. Gọi *displayImages* và truyền vào array *iceCreams*, array *iceCreams* vào func1 (a.k.a *greens*) sẽ filter ra các objects có color: ‘green’. Kết quả trả về của func1 là array sẽ tiếp tục truyền vào func2 (a.k.a *images*) sẽ return array các giá trị *img*

### .filter()

>The filter array method creates a new array with all elements that pass the test implemented by the provided function.

Method filter sẽ **tạo một array mới** chứa các phần tử thoả điều kiện – callback function return boolean value, nếu không có phần tử thỏa điều điện sẽ trả về mảng rỗng. Filter method nhận một callback với các arguments sau:

* **element** – phần tử hiện tại đang kiểm tra trong array ban đầu
* **index**- index (vị trí) của phần tử hiện tại trong array ban đầu (optional)
* **array**- reference đến chính array (optional)

![filter](https://cdn-images-1.medium.com/max/1200/1*1_cXL8CA4cETkVtW5fbmhQ.png)

Example:

```js
const iceCreams = [
  { flavor: 'pineapple', color: 'white' },
  { flavor: 'strawberry', color: 'red' },
  { flavor: 'watermelon', color: 'red' },
  { flavor: 'kiwi', color: 'green' },
  { flavor: 'mango', color: 'yellow' },
  { flavor: 'pear', color: 'green' }
]
const favoriteFlavors = iceCreams.filter(iceCream => iceCream.color === 'red')
console.log(favoriteFlavors)
// [ { flavor: 'strawberry', color: 'red' },
//  { flavor: 'watermelon', color: 'red' }
```

Ví dụ trên sử dụng anonymous function, ta cũng có thể dùng named function như sau:

```js
const getRed = icecream => icecream.color === 'red'
const favoriteFlavors = iceCreams.filter(getRed)
console.log(favoriteFlavors)
// [ { flavor: 'strawberry', color: 'red' },
//  { flavor: 'watermelon', color: 'red' }
```

### .map()

.map() nhận callback và trả về **một array mới** có các phần tử là kết quả của việc xử lý từng phần tử của array gốc và cùng số lượng phần tử array ban đầu. Callback thay đổi phần tử của array gốc, với các arguments sau:

* **element** – phần tử hiện tại đang kiểm tra trong array ban đầu
* **index**- index (vị trí) của phần tử hiện tại trong array ban đầu (optional)
* **array**- array đang dùng để map (optional)

![map](https://cdn-images-1.medium.com/max/1200/1*BkcYRGvVCLfOBYqDP2SBXg.png)

Example:

```js
const iceCreams = [
  { flavor: 'pineapple', color: 'white' },
  { flavor: 'strawberry', color: 'red' },
  { flavor: 'watermelon', color: 'red' },
  { flavor: 'kiwi', color: 'green' },
  { flavor: 'pear', color: 'green' }
]
const flavors = iceCreams.map(icecream => {
  const { color, ...rest } = icecream
  return {
    ...rest,
    fruit: true
  }
})
console.log(flavors)
// [ { flavor: 'pineapple', fruit: true },
//   { flavor: 'strawberry', fruit: true },
//   { flavor: 'watermelon', fruit: true },
//   { flavor: 'kiwi', fruit: true },
//   { flavor: 'pear', fruit: true } ]
```

Trong ví dụ trên với mỗi phần tử của array iceCreams ta destructuring thành color và ...rest:
>const { color, ...rest } = icecream

Sau cùng return một object với property là *flavor* và *fruit*

### .reduce()

* Sau khi thực hiện kết quả tích lũy của callback hiện tại hoặc giá trị ban đầu vào **accumulator**
* **currentValue**: phần tử hiện tại đang được xử lý trong array.
* **currentIndex**: bắt đầu tại 0, nếu giá trị initialValue được cung cấp và nếu không được cung cấp thì bắt đầu ở tại 1 (optional)
* **array**: mảng được method reduce() gọi (optional)
* **initialValue**: Giá trị để sử dụng làm đối số đầu tiên cho lần thực hiện đầu tiên. Nếu không có giá trị ban đầu nào được cung cấp, mặc định sẽ lấy phần tử đầu tiên trong array.

![reduce](https://cdn-images-1.medium.com/max/1200/1*mQrjP0aMK7xY1_SSHO2kjg.png)
Example: tính tổng các phần tử trong array với initial value là phần tử đầu tiên

```js
const arr = [10, 20, 30]
const sum = arr.reduce((acc, currentItem) => acc + currentItem)
console.log(sum)
```

Ta có thể sử dụng reduce() thay thế cho map(),

Example:

```js
const data = [10, 20, 30]
const tripledWithMap = data.map(item => {
    return item * 3
})

const tripledWithReduce = data.reduce((acc, value) => {
    acc.push(value * 3)
    return acc
}, [])
console.log(tripledWithMap, tripledWithReduce)
// [ 30, 60, 90 ] [ 30, 60, 90 ]
```

hay thay thế cho cả filter().

Example:

```js
const data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const evenWithFilter = data2.filter(item => {
    return item % 2 === 0
})
const evenWithReduce = data2.reduce((acc, value) => {
    if (value % 2 === 0) {
        acc.push(value)
    }
    return acc
}, [])
console.log(evenWithFilter, evenWithReduce)
// [ 2, 4, 6, 8, 10 ] [ 2, 4, 6, 8, 10 ]
```

Một số trường hợp có thể dùng reduce()

* Đếm các instances của các giá trị trong array và trả về dưới dạng một object

Example:

```js
const flavours = [
  'strawberry',
  'strawberry',
  'kiwi',
  'kiwi',
  'kiwi',
  'strawberry',
  'mango',
  'kiwi',
  'banana'
]
const votes = {}
const reducer = (votes, item) => {
  votes[item] = !votes[item] ? (votes[item] = 1) : votes[item] + 1
  return votes
}
const outcome = flavours.reduce(reducer, votes)
console.log(outcome)
// { strawberry: 3, kiwi: 4, mango: 1, banana: 1 }
```

* Convert nhiều array thành một

Example:

```js
const letterArr = [['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']]
const flattened = letterArr.reduce((acc, val) => {
    return acc.concat(val)
    // Spread
    // return [...acc, ...val]
}, [])
console.log(flattened)
// [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' ]
```

### References

[📜 Higher Order Functions](https://www.lullabot.com/articles/higher-order-functions-in-javascript)

[📜 Functional Programming in JS: map, filter, reduce (Pt. 5) — Omer Goldberg](https://hackernoon.com/functional-programming-in-js-map-filter-reduce-pt-5-308a205fdd5f)

[📜 JavaScript Functional Programming — map, filter and reduce — Bojan Gvozderac](https://medium.com/jsguru/javascript-functional-programming-map-filter-and-reduce-846ff9ba492d)

[📜 Learn map, filter and reduce in Javascript — João Miguel Cunha](https://medium.com/@joomiguelcunha/learn-map-filter-and-reduce-in-javascript-ea59009593c4)

[📜 JavaScript’s Map, Reduce, and Filter — Dan Martensen](https://danmartensen.svbtle.com/javascripts-map-reduce-and-filter)

[📜 How to Use Map, Filter, & Reduce in JavaScript — Peleke Sengstacke](https://code.tutsplus.com/tutorials/how-to-use-map-filter-reduce-in-javascript--cms-26209)

**[⬆ Back to Top](#table-of-contents)**
