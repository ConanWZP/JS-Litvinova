function factorial(n) {

    if (n === 0) {
        return 1
    } else if (n> 0) {


        return n*factorial(n-1)
    } else {
        console.error('n должно быть не отрицательным')
    }


}


//  console.log(factorial(4))


function fibonacci(n) {

    if (n === 0) {
        return 0
    } else if (n === 1) {
        return 1
    } else if (n > 1) {

      return   fibonacci(n-1) + fibonacci(n-2)

    } else {
        console.error('n должно быть не отрицательным')
    }

}

// console.log(   fibonacci(10)   )

function flatten(...data) {
    const result = []
    for (let i = 0; i < data.length; i++) {

        const currentElement = data[i]

        if (Array.isArray(currentElement)) {
            result.push(...flatten(...currentElement))
        } else {
            result.push(currentElement)
        }


    }

    return result
}

function flattenReduce(...data) {
    return data.reduce((acc, item) => {
        return Array.isArray(item) ? acc.concat(flattenReduce(...item)) : acc.concat(item)
    }, [])
}

console.log(   flatten(1, [2, [[3]]], 4, 5, [6, [7]])   )

console.log(   flattenReduce(1, [2, [[3]]], 4, 5, [6, [7]])   )

