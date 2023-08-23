// 1. call - вызов функции с возможностью передачи контекста, если контекст не нужен то первый аргумент - null

function sum1(a, b, c) {
    return a + b + c
}

function sum2(a, b, c) {
    return `${this.description}: ${a+b+c}`
}

const sumInfo = {
    description: 'Your result'
}

console.log(  sum1.call(null, 1, 2, 3)  ) // 6
console.log(   sum2.call(sumInfo, 1, 2, 3)     ) // Your result: 6


// 2. apply - тоже самое, что и call, только аргумент передается в виде массива

console.log( sum2.apply(sumInfo, [1,2,3] ) )// Your result: 6


// 3. Одолжить метод

// Старые подходы
function sum3() {
    console.log(arguments) // [Arguments] { '0': 1, '1': 2, '2': 3, '3': 4, '4': 5, '5': 6 }

    const createArray = [].slice.call(arguments)
    console.log(createArray) // [ 1, 2, 3, 4, 5, 6 ]

    // У массива одолжили/взяли метод reduce, при этом arguments - это объект
    return [].reduce.call(arguments, (acc, item) => acc + item)

}

// в новом JS проще
function sum4(...args) {

    // можно вообще так
    console.log(     Array.from(arguments)      ) // Массив [1,2,3,4,5,6]

    // Т.е. args - уже массив
    return args.reduce((acc, item) => acc+item)
}

console.log(sum3(1, 2, 3, 4, 5, 6)) // 21
console.log(sum4(1, 2, 3, 4, 5, 6)) // 21



// 4. Использование apply и call во вспомогательных методах

class Calculator {
    constructor(desc) {
        this.desc = desc
        this.curriedSum = curry(this.sum)
    }

    printResult(value) {
        console.log(  `${this.desc}: ${value}`  )
    }

    sum(a,b,c) {
        this.printResult(a+b+c)
    }

}

/* Helpers */
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args)
        } else {
            return curried.bind(this, ...args)
        }
    }

}

const newCalculator = new Calculator('Your result is')
//newCalculator.sum(1, 2, 3) // Your result is: 6
newCalculator.curriedSum(5,10, 5) // Your result is: 20
newCalculator.curriedSum(5)(10,5) // Your result is: 20


// 5. bind - сохраняет контекст

function sumNew(a, b, c) {
    return `${this.desc}: ${a+b+c}`
}

const sumNewInfo = {
    desc: 'Your new result'
}

const sumNewBind = sumNew.bind(sumNewInfo) // Сохранил функцию с предопределённым контекстом
console.log(sumNewBind(1,2,3)) // Your new result: 6

const sumNewBindWithPermanentValueOfA = sumNew.bind(sumNewInfo, 1111) // Присвоили перманентное значение для первого аргумента
console.log(    sumNewBindWithPermanentValueOfA(2, 3)    ) // Your new result: 1116


class Gallery {
    constructor(options) {
        this.size = options.size

        this.changeSlide = this.changeSlide.bind(this)
    }

    events() {
        this.gallery.addEventListener('click', this.changeSlide)
    }

    changeSlide() {
        this.size // какая-то логика с размером или еще чем-то внутри метода
                    // и чтобы контекст changeSlid'a не потерялся делаем бинд вкутри конструктора, т.е. контекстом changeSlid'a наверняка будет являтся контекст этого класса(конструктора???)
    }


}