// Каррирование это преобразование вызова функции из формата f(a,b,c) в формат: f(a)(b)(c)

function sum(a,b,c) {
    return a + b + c
}

function multiply(a, b ,c) {
    return a * b * c
}

function curry(fn) {
    return function curried (...args) {
       // console.log(sum.length)  - количество аргументов, которое требует функция
        if (args.length >= fn.length) {
           // return fn(...args)
            // Для универсальности, если например функция вызывается в классе:
            return fn.apply(this, args)
        } else {
            return curried.bind(this, ...args)
        }
    }
}

const curriedSum = curry(sum)
const curriedMultiply = curry(multiply())


console.log(  curriedSum(2)  )