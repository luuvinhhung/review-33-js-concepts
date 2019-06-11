# Functional Programming in JS: map, filter, reduce

## Questions

* Higher Order Function
* .map() - .filter() - .reduce()

## Higher-Order Functions

Là function nhận function khác làm parameter

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

## .filter()

Method filter sẽ tạo một array mới chứa các phần tử thoả điều kiện – callback funciton return true. Ex:

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

Filter method nhận function với các arguments sau:

* **element** – phần tử hiện tại đang kiểm tra trong array ban đầu
* **index**- index (vị trí) của phần tử hiện taị trong array ban đầu (optional)
* **array**- reference đến chính array (optional)

![filter](https://cdn-images-1.medium.com/max/1200/1*1_cXL8CA4cETkVtW5fbmhQ.png)