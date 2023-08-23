// debounce - задержка вызова

function debounce(callback, delay) {
    let timer

    return function (...args) {
        console.log(args)
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback.apply(this, args)
        }, delay)
    }
}

const f = debounce(console.log, 1000)

f(1)
f(2)


setTimeout(() => { f(3) }, 100)
setTimeout(() => { f(4) }, 500)
setTimeout(() => { f(5) }, 1100) // Будет выведено только 5,
// т.к. delay общий 1000ms, то f(1) не успевает вывестись, т.к. прилетает f(2), который за счёт clearTimeout'a затирает f(1)
// f(2) не успевает отрисоваться т.к. через 100ms прилетает f(3)
// f(3) не отрисовывается т.к. прилетает f(4)
// и в f(4) не успевает, т.к. прилетает f(5)
// если бы f(5) был бы больше чем 500ms + 1000ms, т.е. например 1600ms, то отрисовались бы f(4) и f(5)




// throttle - делает вызов каждые ...

function throttle(callback, delay) {
    let isWaiting = false;
    let savedArgs = null;
    let savedThis = null;
    return function wrapper(...args) {
        if (isWaiting) {
            savedArgs = args;
            savedThis = this
            return
        }
        // else
        callback.apply(this, args)
        isWaiting = true

        setTimeout(() => {
            isWaiting = false
            if (savedThis) {
                wrapper.apply(savedThis, savedArgs)
                savedArgs = null
                savedThis = null
            }
        }, delay)
    }
}

const t = throttle(console.log, 500)

t(10)
t(20)


setTimeout(() => { t(30) }, 100)
setTimeout(() => { t(40) }, 500)
setTimeout(() => { t(50) }, 900)
// Вывод 10  30  50