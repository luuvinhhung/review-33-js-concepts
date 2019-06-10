# Object.create and Object.assign

- -Questions

- Create object với Object.create() và new keyword
- Shallow copy objects với Object.assign(), Spread
- Deep copy objects

- -Object.Create()

![](https://firebasestorage.googleapis.com/v0/b/hotelbooking-7127d.appspot.com/o/review-33-js%2Freview-1.png?alt=media&token=c16ccf31-8d69-49d4-a763-b28ac8df8472)

1. Tạo object _cat_ sử dụng object literal syntax.
2. Khởi tạo _tom_ với Object.create(_cat_) có prototype của _cat_
3. Kiểm tra biến _tom_ với prototype của _cat_
4. Gán giá trị vào _this.eatFood_
5. Gọi function eat()
6. JS dùng prototype chain tìm method eat trong cat với _this_ đang là _tom_

- •-Create object with _new_ keyword

functionCat () {

this.name = &#39;Tom&#39;

}

Cat.prototype.namePrototype = &#39;prototype&#39;

vartom = newCat()

varjerry = Object.create(Cat.prototype)

// Using Object.create()

console.log(jerry.name) // undefined

console.log(jerry.namePrototype) // prototype

// Using New Keyword

console.log(tom.name) // Tom

console.log(tom.namePrototype) // prototype

Cả hai cách đều tạo object mới và kế thừa prototype,… Điểm khác nhau là Object.create() sẽ không có this.name trong constructor là do Object.create() không thực thi constructor function, trái lại khi tạo với từ khoá _new_ sẽ thực thi constructor function.

- •-Shallow copy objects

### Object.assign() method

Object.assign() sẽ copy properties và gía trị từ một hay nhiều object

letobj = {

a:1,

b:2,

sayHi () {

    console.log(&#39;Hi&#39;)

}

}

letobj2 = {

a:3,

c:4,

sayBye () {

    console.log(&#39;bye!&#39;)

}

}

letobjCopy = Object.assign({}, obj, obj2)

console.log(objCopy) // result - { a: 3, b: 2, c: 4 }

objCopy.b = 23

console.log(objCopy) // result - { a: 3, b: 23, c: 4 }

console.log(obj) // result - { a: 1, b: 2 }

objCopy.sayHi() // &#39;Hi&#39;

objCopy.sayBye() // &#39;bye!&#39;

\*\* \*\* Nhược điểm:

letobj = {

a:1,

b: {

    c:2

}

}

letnewObj = Object.assign({}, obj)

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

Trong đoạn code trên _newObj.b_ và _obj.b_ đều reference đến cùng một object

### Spread Elements

Spread Elements ES6 giúp việc shallow copy trở nên ngắn gọn hơn

letobj = {

one:1,

two:2,

three: {

    four:4

}

}

letnewObj = { ...obj }

console.log(newObj) // { one: 1, two: 2, three: { four: 4 } }

newObj.three.four = 5

console.log(obj) // { one: 1, two: 2, three: { four: 5 } }

console.log(newObj) // { one: 1, two: 2, three: { four: 5 } }

- •-Deep copy objects

**JSON.parse(JSON.stringify(object))**

Cách copy này sẽ hoàn toàn copy object chứ không reference. Ex:

letobj = {

a:1,

b: {

    c:2

}

}

letnewObj = JSON.parse(JSON.stringify(obj))

obj.b.c = 20

console.log(obj) // { a: 1, b: { c: 20 } }

console.log(newObj) // { a: 1, b: { c: 2 } }

---

Nhược điểm: cách copy này không thể copy methods của object

letobj = {

name:&#39;Tom&#39;,

sayHi:function () {

    returntrue

}

}

// Object.assign({}, obj)

letmethod1 = Object.assign({}, obj)

console.log(method1) // { name: &#39;Tom&#39;, sayHi: [Function: sayHi] }

// JSON.parse(JSON.stringify(obj))

letmethod2 = JSON.parse(JSON.stringify(obj))

console.log(method2) // { name: &#39;Tom&#39; }