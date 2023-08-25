
const array = [3, 2, 1, 5, 3, 11, 0]


function quickSort(arr) {
    return quickSortHelper(arr, 0, arr.length-1)

}

function quickSortHelper(arr, left, right) {
    if (arr.length < 2) {
        return arr
    }

    const index = partition(arr, left, right)
  //   console.log(arr)
    console.log('----------------')
    if (left < index - 1) {
        quickSortHelper(arr, left, index-1)
    }
    if (index < right) {
        quickSortHelper(arr, index, right)
    }

    return arr
}

function partition(arr, left, right) {
    const keyElement = arr[Math.floor((left+right)/2)]
   // console.log(arr, 'arr')
    console.log(keyElement)

    while (left <= right) {

        while (arr[left] < keyElement) {
            left++
        }

        while (arr[right] > keyElement) {
            right--;
        }

        // предыдущие два цикла уже выполнены
        if (left <= right) {

            swap(arr, left, right)
            left++
            right--
        }

    }

    return left

}

function  swap(arr, i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
}

console.log( quickSort(array) )