// 1. Работа кода и стек вызовов

function multiply(a,b) {
    return a * b
}

function multiAndSum(a, b, c) {
    const multi = multiply(a, b)
    return multi + c;
}

multiAndSum(1, 2, 3)

// В стек попадает вызов multiAndSum(), потом приходит вызов multiply, по стеку выше первого, выполняется умножение, а потом идет умножениеИСложение

// 1) multiAndSum()


// 2)   multiply() - выполнится первым хотя пришёл последним
   //     multiAndSum()

// 3) multiAndSum()

// 4) Empty



//  Размер стека ограничен

// function loop() {
//     return loop()
// }
//
// loop() 10 тыс. -> 100 тыс.



// 2. Блокировка выполнение кода

// когда встречается например бесконечная рекурсия появляется ошибка Maximum call stack size exceeded

// функции alert, prompt, confirm также блокируют выполнение кода
/*
console.log(1)
alert(2)
console.log(3)
*/



// Пока верхняя функция (т.е. пришедшая последняя в стек) не выполнится, не будут выполняться функции пришедшие раньше




// 3. Асинхронный код, setTimeout

console.log(1)
setTimeout(() => {
    console.log(2)
}, 100)
console.log(3)

// setTimeout кладётся в WebAPI и не задерживает стэк. И здесь уже появляется Event Loop

// у нас есть 3 пространства: Call Stack, Queue и WebAPI.
// Как setTimeout (или любое другое ассинхронное действие) выполнится в WebAPI, эта "задача" переходит в Queue(очередь)
// Event Loop следит за тем когда положить новую "задачу" в стек из очереди.
// Как только Стэк становится пустым, event loop кладёт первую задачу из очереди и кладет в стэк вызовов.
// Пока стэк не освободится из очереди(Queue) новые задачи не уйдут



// 4. alert и прочии попрежнему блокируют работу кода


// 5. Асинхронный код промисы

console.log('A')

const promise = new Promise((resolve, reject) => {
    console.log('B')
    resolve('E')
    console.log('C')
}).then((value) => {
    console.log(value)
})

console.log('D')

// resolve - является ассинхронной даже без setTimeout'a, при этом сам callback (resolve, reject) => {} является синхронным


// 6. Callbacks

// Все события сохраняются в webAPI
console.log('AAAA')
document.querySelector('button').addEventListener('click', (() => {
     console.log('Button was clicked')
}))
console.log('BBBB')



// 7. Callbacks на постоянные события могут забить очередь

/*
window.addEventListener('scroll', (event) => {
    console.log('scrolllll')
})
*/


// 8. Callbacks, которые методы массива и подобные переборы работают синхронно, не кладутся в webAPI

const array = [1,2,3,4,5]
console.log('array1')
array.forEach((element) =>  console.log(element))
console.log('array2')

// array1, все цифры, array 2

console.log('array1')
array.forEach((element) =>  setTimeout(() => {
    console.log(element)
}, 0))
console.log('array2')

// array1, array2, все цифры


// 9. Циклы работают синхронно

console.log('a')
for (let i = 0; i < 5; i++) {
    console.log(i)
}
console.log('b')


// 10. Циклы с асинхронным выполнением
for (var i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 0)
}
// Выведет пять раз цисло 5 из-за области видимости var, ее видно и вне цикла. Происходит так, что setTimeout'ы попадают в очередь
// при этом сам цикл проведет все итерации и дойёдет до i=5 (но на i=5 уже цикл не пойдёт) и после этого из очереди в стэк попадут
// консоль логи от i, где выйдет что i = 5
// поэтому важно использовать let, т.к. у него область видимости - блочная

for (let i = 0; i < 5; i++) {
    setTimeout(()=>console.log(i), 0)
}
// 0 1 2 3 4


// 11. Пока Stack занят рендер страницы блокируется
// Всевозможные клики перестаю отрабатывать.
// render queue
// callback queue

// т.е. через alert можно заблокировать рендер страницы