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