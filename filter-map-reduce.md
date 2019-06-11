## Functional Programming in JS: map, filter, reduce

### Questions

* Higher Order Function
* .map() - .filter() - .reduce()

### Higher-Order Functions

Là function nhận function khác làm parameter. Ex:

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

Method filter sẽ tạo một array mới chứa các phần tử thoả điều kiện – callback function return true. Filter method nhận một callback với các arguments sau:

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
const favoriteFlavors = iceCreams.filter(iceCream =>   iceCream.color === 'red')
console.log(favoriteFlavors)
// [ { flavor: 'strawberry', color: 'red' },
//  { flavor: 'watermelon', color: 'red' }
```

### .map()

.map() cũng nhận callback như một argument và trả về một array mới chứa các phần tử đã được transform và cùng số lượng phần tử array ban đầu.

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

### .reduce()

* .reduce() thực hiện và lưu kết quả hiện tại vào **accumulator**
* **currentValue**: phần tử hiện tại đang được xử lý trong array.
* **currentIndex**: bắt đầu tại 0, nếu giá trị initialValue được cung cấp và nếu không được cung cấp thì bắt đầu ở tại 1 (optional)
* **array**: mảng được method reduce() gọi (optional)
* **initialValue**: Giá trị để sử dụng làm đối số đầu tiên cho lần thực hiện đầu tiên. Nếu không có giá trị ban đầu nào được cung cấp, mặc định sẽ lấy phần tử đầu tiên trong array.

![reduce](https://cdn-images-1.medium.com/max/1200/1*mQrjP0aMK7xY1_SSHO2kjg.png)

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
const reducer = (votes, vote) => {
  votes[vote] = !votes[vote] ? (votes[vote] = 1) : votes[vote] + 1
  return votes
}
const outcome = flavours.reduce(reducer, votes)
console.log(outcome)
// { strawberry: 3, kiwi: 4, mango: 1, banana: 1 }
```

### References:
[📜 Functional Programming in JS: map, filter, reduce (Pt. 5) — Omer Goldberg](https://hackernoon.com/functional-programming-in-js-map-filter-reduce-pt-5-308a205fdd5f)