 const array = [4, 3, 2, 1, 9, -11, 33, 2, 4]
 console.log( array.length) // 9

 // Первый цикл по i = 0;

 // Внутри бежим по j = 0 (зависимости от i) тут нет
 // [4, 3, 2, 1, 9, -11, 33, 2, 4]  и идёт сравнение соседних элементов, т.е. j и j+1 элемента
 // получаем:
 // [3, 2, 1, 4, -11, 9, 2, 4, 33]

 // второй цикл по i = 1
 // [2, 1, 3, -11, 4, 2, 4, 9, 33]

 // i =2
 // [1, 2, -11, 3, 2, 4, 4, 9, 33]

 // i =3
 // [1, -11, 2, 2, 3, 4, 4, 9, 33]

 // i = 4
 // [-11, 1, 2, 2, 3, 4, 4, 9, 33]

 //...
 // i = 7
 // [-11, 1, 2, 2, 3, 4, 4, 9, 33]

 function bubbleSort(arr) {
    const len = arr.length
     let swapped = false
     for (let i = 0; i < len-1; i++) {
         // оптимизация
         swapped = false
         for (let j = 0; j < len-1; j++) {
             if (arr[j] > arr[j+1]) {
                 const saveItem = arr[j]
                 arr[j] = arr[j+1]
                 arr[j+1] = saveItem


                 swapped = true
             }
         }
         // оптимизация
         if (!swapped) {
             break
         }
     }
     return arr

 }

 console.log(bubbleSort(array))