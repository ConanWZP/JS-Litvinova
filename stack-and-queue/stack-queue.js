
// Реализуем итеративный подход, а не рекурсивный

function flatten(...stack) {

    const result = []
    while (stack.length) {
        const element = stack.shift()
        if (Array.isArray(element)) {
            stack.unshift(...element)


        } else {
            result.push(element)
        }
    }
    return result

}

console.log(   flatten(1, [2, [[3]]], 4, 5, [6, [7]])   )


function calculate(expression) {

    const array = expression.split(' ')
    const stack = []

    while (array.length) {
        const element = array.pop()
        const numberedElement = Number(element)

        if (!isNaN(numberedElement)) {
            stack.push(numberedElement)
        } else {

            const firstNumber = stack.pop()
            const secondNumber = stack.pop()

            switch (element) {
                case '+':
                    stack.push(firstNumber + secondNumber)
                    break;
                case '-':
                    stack.push(firstNumber - secondNumber)
                    break;
                case '*':
                    stack.push(firstNumber * secondNumber)
                    break;
                case '/':
                    stack.push(firstNumber / secondNumber)
                    break;
            }

        }


    }
    return stack[0]

}

console.log(  calculate('/ + 3 5 * 2 2'), 'should be 2'  )


function queueTime(customers, n) {

    if (!customers.length) {
        return 0
    }

    const queue = [...customers]

    // tills - кассы
    const tills = Array(Math.min(customers.length, n)).fill(0)

    while (queue.length) {
        const customer = queue.shift()
        const minQueueInTill = tills.indexOf(Math.min(...tills))
        tills[minQueueInTill] += customer
    }

    return Math.max(...tills)


}


 console.log(  queueTime( [1, 2, 3, 4], 2 ), 'should be 10'  )