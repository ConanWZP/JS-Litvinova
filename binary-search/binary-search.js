// Бинарный поиск - алгоритм поиска в отсортированном массиве

const array = [2, 4, 6, 18, 20, 21, 30, 33, 34]

function binarySearch(arr, searchNumber) {
    let left = -1
    let right = arr.length

    while (right - left > 1) {
        const middle = Math.floor((left + right) / 2)

        if (searchNumber === arr[middle]) {
            return middle
        }

        if (searchNumber < arr[middle]) {
            right = middle
        } else {
            left = middle
        }
    }

    return false

}


console.log(   binarySearch(array, 6)   )

// O( log N ) - для N = миллиард log N = 29



// замыкание
function outSide(a) {

    let b = a

    function inSide() {
        console.log(b+1) // 6
      return b+1
    }
    inSide()

    return b // 5

}


console.log(outSide(5)) // 5

