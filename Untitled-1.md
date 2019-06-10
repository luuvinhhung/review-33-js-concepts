# Call Stack

## Engine

Một ví dụ phổ biến về Javascript Engine là V8 Engine của Google. V8 được sử dụng bên trong Chrome và Node.js. Dưới đây là một cách nhìn rất đơn giản bên trong một engine

![](https://cdn-images-1.medium.com/max/800/1*OnH_DlbNAPvB9KLxUCyMsA.png)

Engine bao gồm hai components chính:

* Memory Heap - Đây là nơi cấp phát bộ nhớ.
* Call Stack - Đây là nơi chứa các stack frames cũng là các đoạn code được thực thi.

## Runtime

Phần lớn các lập trình viên Javascript đều sử  dụng các APIs bên trong trình duyệt (ví dụ: setTimeOut). Tuy nhiên, các APIs đó không được cung cấp bởi Engine.

Vậy nó đến từ đâu?

Thực ra nó phức tạp hơn những gì chúng ta nghĩ

![](https://cdn-images-1.medium.com/max/800/1*4lHHyfEhVB0LnQ3HlhSs8g.png)

Vì vậy, chúng ta có Engine nhưng thực sự còn có nhiều hơn thế nữa. Chúng ta có những thứ được gọi là Web APIs, được cung cấp bởi trình duyệt, như DOM, AJAX, setTimeOut và nhiều hơn nữa.

## Call Stack

Javascript là ngôn ngữ lập trình đơn luồng (single-threaded), nghĩa là nó chỉ có 1 cái call stack. Vì thế nó chỉ có thể làm 1 công việc tại 1 thời điểm nhất định.

Call Stack là một cấu trúc dữ liệu mà về cơ bản thì nó ghi nhớ vị trí của chúng ta trong chương trình đang chạy. Nếu như chúng ta thực thi một hàm (function) thì khi đó ta sẽ đặt hàm đấy vào vị trí trên cùng của ngăn xếp (stack), sau khi xử lý xong và return từ hàm đó, vị trí trên cùng sẽ bị đẩy ra khỏi stack. Đó là cách hoạt động của Call Stack.

Mỗi bản ghi trong Call Stack được gọi là khung của ngăn xếp (Stack Frame).

#### Ví dụ 1

```js
function first() {
  console.log('first');
} 

function second() {
  first();
  console.log('second');
}

second();
```

#### Ví dụ 2

```js
function abc() {
  abc();
}

abc();
```

Điều gì sẽ xảy ra nếu như bạn có 1 hàm xử lý đang ở trong Call Stack nhưng hàm đó lại tốn kha khá thời gian để chạy? Ví dụ

```js
// ajax(..) is some arbitrary Ajax function given by a library
var response = ajax('https://example.com/api');

console.log(response);
// `response` won't have the response
```

Vậy thì làm thế nào để xử lý code vừa nhiều vừa nặng mà lại không làm UI bị kẹt cũng như trình duyệt bị đơ? Giải pháp đó là sử dụng callback bất đồng bộ (asynchronous callbacks).

## Concurrency và Event Loop

Event Loop có một công việc đơn giản: theo dõi Call Stack và Callback Queue (hàng đợi các hàm callback). Nếu Call Stack đang trống, nó sẽ lấy event đầu tiên từ trong hàng đợi ra và đẩy nó vảo trong Call Stack - tức là thực thi nó.

Mỗi vòng lặp như thế được gọi là 1 tick trong Event Loop. Mỗi sự kiện chỉ là 1 hàm callback.

#### Ví dụ 3
````js
console.log('Hi');
setTimeout(function() { 
  console.log('cb1');
}, 5000);
console.log('Bye');
````

#### Ví dụ 4
```js
console.log('Hi');
setTimeout(function() {
    console.log('callback');
}, 0);
console.log('Bye');
```

## Callback

Callback là một function được truyền vào function khác như 1 tham số.

```js
[1,2,3,4].map(x => x ** 3);
```

Nếu làm theo cách này có gì đó không ổn ?

```js
thuc_day(() => {
  danh_rang(() => {
    di_an_sang(() => {
      console.log('quên đem tiền :((');
    });
  });
});
```
Nó tạo thành callback hell.

Để giải quyết vấn đề này, các bác developer đã sáng tạo ra một khái niệm gọi là `Promise`.

## Sơ lược về  `Promise`

`Promise` được giới thiệu trong ES6 và `Promise` là gì? Nó là một **lời hứa**. Tương tự như trong thực tế, có người hứa rồi làm, có người hứa rồi ... thất hứa.

Một lời hứa có 3 trạng thái sau:
* **pending:** Hiện lời hứa chỉ là lời hứa suông, còn đang chờ người khác thực hiện
* **fulfilled:** Lời hứa đã được thực hiện
* **reject:** Là 1 trạng thái mà bất kì chủ nợ nào không muốn gặp phải - "thất hứa", hay còn gọi là bị "xù"

Nhớ ngày xưa mẹ hứa mua cho con xe SH nếu như học giỏi
```js
function hua_cho_co(me_vui) {
  return Promise((resolve, reject) => {
    if (me_vui) {
      resolve('xe SH');
    } else {
      reject('Năm sau đi con');
    }
  })
}

hua_cho_co(me_vui).then((xe_SH) => console.log(xe_SH)).catch((mot_noi_buon) => console.log(mot_noi_buon));

```
Khi lời hứa được thực hiện, `Promise` sẽ gọi callback trong hàm `then`. Ngược lại, khi bị thất hứa, promise sẽ gọi callback trong hàm `catch`.

Và giờ ta sẽ viết lại ví dụ callback hell trên thành `Promise` như sau

```js
//callback
thuc_day(() => {
  danh_rang(() => {
    di_an_sang(() => {
      console.log('quên đem tiền :((');
    });
  });
});

//Promise
thuc_day()
  .then(danh_rang)
  .then(di_an_sang)
  .then(() => console.log('quên đem tiền :(('))
  .catch((err) => {
    //
  })
```
Với cách viết như vầy được gọi là **Promise chaning**


`Promise.all`

```js
// Ba hàm này phải được thực hiện "cùng lúc"
// chứ không phải "lần lượt"
const ngam_gai = new Promise((resolve, reject) => resolve('thỏa mãn cái gì đó'));
const code = new Promise((resolve, reject) => resolve('nâng cao trình độ'));
const nghe_nhac = new Promise((resolve, reject) => resolve('thư giãn'));

Promise.all([ngam_gai, code, nghe_nhac]).then(res => console.log(res)); // ['thỏa mãn cái gì đó', 'nâng cao trình độ', 'thư giãn']
```

## Sơ lược về Jobs Queue
Một khái niệm mới gọi là Job Queue (Hàng đợi công việc) được giới thiệu trong ES6. Nó là lớp trên cùng của event loop queue.

```js
Promise.resolve().then(() => console.log('bar')).then(() => console.log('foo'));

Promise.resolve().then(() => console.log('acb'));
```

![](https://blog.risingstack.com/content/images/2019/01/Execution_timing_microtask_registration_method.svg)

* Macrotask: `setTimeout`, `onClick`, ...
* Microtask: `Promise`, ...

```js
console.log('script start');

setTimeout(() => console.log('setTimeout'), 0);

Promise.resolve().then(() => console.log('promise1')).then(() => console.log('promise2'));

Promise.resolve().then(() => console.log('acb'));

console.log('script end');
```

Trình tự thực thi có thể  mô tả ngắn gọn như sau
> Sync task > Microtask > requestAnimationFrame > Macrotask

Ví dụ với đoạn html sau

```html
<div class="outer">
  <div class="inner">Click me!!!</div>
</div>
```
**ví dụ 1**

```js
const outer = document.querySelector('.outer');
const inner = document.querySelector('.inner');

function onClick() {
  console.log('click');
  setTimeout(() => console.log('timeout'), 0);
  Promise.resolve().then(() => console.log('promise'));
}

inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
```
**ví dụ 2**
```js
const outer = document.querySelector('.outer');
const inner = document.querySelector('.inner');

function onClick() {
  console.log('click');
  setTimeout(() => console.log('timeout'), 0);
  Promise.resolve().then(() => console.log('promise'));
}

inner.addEventListener('click', onClick);
outer.addEventListener('click', onClick);
inner.click();
```

## Sơ lược về Asyn/Await
Javascript ES8 giới thiệu async/await để giúp cho công việc xử lý promise dễ dàng hơn.

Khi một hàm `async` được gọi, nó sẽ trả về `Promise`. Khi hàm `async` trả về giá trị, nó lại không phải `Promise`, một `Promise` sẽ được tạo ra tự động và được `resolve` với giá trị trả về từ hàm. Khi hàm `async` bắn ra exception, `Promise` sẽ `reject` với giá trị bắn ra.

Một hàm `async` có thể chứa `await`, nó sẽ dừng quá trình thực thi của hàm và đợi cho `Promise` giải quyết xong rồi quay lại thực thi tiếp và trả về giá trị đã được `resolve`.

```js
// Hàm JS bình thường
function getNumber1() {
  return Promise.resolve('374');
}

// Giống như hàm trên
async function getNumber2() {
  return 374;
}
```

```js
function f1() {
  return Promise.reject('Some error');
}
async function f2() {
  throw 'Some error';
}
```

```js
//async callback
thuc_day(() => {
  danh_rang(() => {
    di_an_sang(() => {
      console.log('quên đem tiền :((');
    });
  });
});

//Promise
thuc_day()
  .then(danh_rang)
  .then(di_an_sang)
  .then(() => console.log('quên đem tiền :(('))
  .catch((err) => {
    //
  })

//Asyn/Await

async function combo() {
  try {
    const first = await thuc_day();
    const second = await danh_rang(first);
    const third = await di_an_sang(second);
    const res = await Promise.all([first, second, third]);
  } catch (err) {
    console.log(err);
  }
}

```


```js
(async function() {
  await Promise.resolve(4).then(x => console.log(x))
  console.log('obj');
})();
```

### Sự khác nhau giữa `forEach` và `for` trong aysnc/await

* `forEach`
```js
(async function() {
  [1,2,3].forEach(async i =>  await Promise.resolve(i).then(x => console.log(x)));
  console.log('Done!!');
})()
```
* `for`
```js
(async function() {
  for (let i of [1,2,3]) {
    await Promise.resolve(i).then(x => console.log(x));
  }
  console.log('Done!!');
})()
```

### Refs
1. [How JavaScript Works: An Overview of the Engine, the Runtime, and the Call Stack — Alexander Zlatkov](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
2. [Understanding Javascript Call Stack, Event Loops — Gaurav Pandvia](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)
3. [What the heck is the event loop anyway? — Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
4. [How JavaScript works: Event loop — Alexander Zlatkov](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)
5. [Tasks, microtasks, queues and schedules — Jake Archibald](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
6. [Writing a JavaScript framework - Execution timing, beyond setTimeout](https://blog.risingstack.com/writing-a-javascript-framework-execution-timing-beyond-settimeout/)
7. [Series Javascript Sida – Promise – Hứa Thật Nhiều Thất Hứa Thật Nhiều | Từ coder đến developer – Tôi đi code dạo](https://toidicodedao.com/2016/07/05/javascript-promise/)
8. [Series Javascript Sida – Sự Bá Đạo Của Async/await Trong Js | Từ coder đến developer – Tôi đi code dạo](https://toidicodedao.com/2017/10/10/async-await-trong-javascript/)

9. [JavaScript loops - how to handle async/await](https://lavrton.com/javascript-loops-how-to-handle-async-await-6252dd3c795/)