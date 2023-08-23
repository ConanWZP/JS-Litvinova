// О большое от чего-то (N, logN, 1 и т.д) -  зависимость времени от N   O(N)


// 1. Константы - объявление переменных, функций

const array = [1, 2 ,3 ,4]
console.log(array)
function func() {

}


// 2. Линейная зависимость O(N)
const array = [1, 2 ,3 ,4]
let sum = 0
for (let i = 0; i < array.length; i++) {
    sum += array[i]
}

// 3. Квадратичная зависимость O(N^2)

for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {

    }
}

// 4. Зависимость от двух независимых параметров O(A * B)

const arr = [[1,2], [3,4], [5,6]]
const sum = 0

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        sum += arr[i][j]
    }
}

// 5. Правило: все не доминантные константы отбрасываются

// O(2 * N) -> O(N);  O(3 * N) -> O(N)

for (let i = 0; i < arr.length; i++) {

}

for (let i = 0; i < arr.length; i++) {

}

// ...

// O(N^2 + N) -> O(N^2)


for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {

    }
}

for (let i = 0; i < arr.length; i++) {

}


// 6. O(logN)

const sortedArr = [1, 2, 3, 5, 10, 100, 200, 300]

// Например, если длина массива 16, то мы берем и делим его на пополам получаем 8, потом еще на 2, 4, еще на 2, получаем 2 и еще на 2 и получаем 1
// N = 16
// N = 8
// N = 4
// N = 2
// N = 1
//
// 2^4 = 16  logN = 4


// 7. O(2^N)

function recursion(n) {
    if (n<=1) {
        return 1
    }
    return recursion(n-1) + recursion(n-1)
}