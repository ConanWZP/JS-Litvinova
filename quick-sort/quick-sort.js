/*
Алгоритм
1. Выбрать опорный элемент
2. Разделить масив на два подмассива: элементы больше и меньше опорного
3. Рекурсивно применить сортировку к двум подмассивам
* */

const array = [3, 2, 1, 5, 3, 11, 0]

function quickSort(arr) {

    if (arr.length < 2) {
        return arr
    }

    const keyIndex = Math.floor(arr.length / 2)
    const keyElement = arr[keyIndex]
    console.log(keyElement)
    const less = []
    const greater = []

    for (let i = 0; i < arr.length; i++) {
        if (i === keyIndex) {
            continue;
        }
        if (arr[i] <= keyElement) {
            less.push(arr[i])
        } else {
            greater.push(arr[i])
        }
    }


    return [...quickSort(less), keyElement, ...quickSort(greater)]
}

console.log( quickSort(arr)  )