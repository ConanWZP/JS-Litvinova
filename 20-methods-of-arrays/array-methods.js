const array = [1, 2, 3, 4, 5, 6]

// 1. forEach - перебор элементов массива, ничего не возвращает
console.log('forEach:')
const newArr1 = array.forEach((item, index, array) => {
    console.log(item)
})
console.log(newArr1) // undefined
console.log('---------')




// 2. map - перебор элементов массива и возврат нового массива
console.log('map:')
const newArr2 = array.map((item, index, array) => {
    return  item*2
})

console.log(newArr2)
console.log('---------')



// 3. reduce - перебор элементов массива и возврат новой структуры данных
console.log('reduce:')
const smthNew = array.reduce((acc, item, index, array) => {

    acc[item] = index
    console.log(item)
    return acc
}, {})

console.log(smthNew) // { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5 }
console.log('---------')

// 4. find - позволяет найти элемент по условию и возвращает его
console.log('find:')
const element = array.find((item, index, array) => {
    return item === 3
})

console.log(element)
console.log('---------')

// 5. findIndex - позволяет найти ИНДЕКс элемента по условию и возвращает его
console.log('findIndex:')
const elementIndex = array.findIndex((item, index, array) => {
    return item === 3
})

console.log(elementIndex)
console.log('---------')

// 6. filter - возвращает новый массив, если условие true
console.log('filter:')
const filteredArray = array.filter((item, index, array) => {
    return item > 3
})
console.log(filteredArray)
console.log('---------')

// 7. push - вставляет элементы в конец массива и мутирует его и возвращает длину нового массива
console.log('push:')
array.push(10, 12, 15)
console.log(array)
console.log('---------')


// 8. unshift - вставляет элементы в начало массива и изменяет его и возвращает длину нового массива
console.log('unshift:')
const newLengthArray = array.unshift(10, 13)
console.log(array)
console.log(newLengthArray)
console.log('---------')


// 9. pop - удаляет элемент из конца массива и возвращает этот элемент, мутирует массив
console.log('pop:')
console.log(array)
const arrayLastElement = array.pop()
console.log(arrayLastElement)
console.log('---------')


// 10. pop - удаляет элемент из начала массива и возвращает этот элемент, мутирует массив
console.log('shift:')
console.log(array)
const arrayFirstElement = array.shift()
console.log(arrayFirstElement)
console.log('---------')


// 11. concat - создаёт новый массив, за счёт добавления переданных значений в предыдущий массив
console.log('concat:')
const newArray = array.concat(26, 28)
console.log(newArray)
console.log('---------')


// 12. join - соединяет массив в строку. split - превращает строку в массив
console.log('join и split:')
const string = 'abcdf'
const arrayFromString = string.split('')
const newString = arrayFromString.join('-')
console.log(newString)
console.log('---------')


// 13. sort - сортирует массив и мутирует его
console.log('sort:')
console.log(array)
const sortedArray = array.sort((a, b) => {
    if (a>b) return -1
    if (a===b) return 0
    if (a<b) return 1   // или return b - a - по убыванию.  a - элемент правее b в исходном массиве при конфигурации функции (a,b)=> {}, т.е.  [b, a] или [..., b, ..., a, ...]
})
console.log(sortedArray, array)
console.log('---------')


// 14. isArray - позволяет проверить, массив ли дан
console.log('isArray:')
console.log(  Array.isArray(array)   )
console.log('---------')


// 15. splice - позволяет удалять и вставлять элементы
// arr.splice(index, deleteCount, .... <- paste smth)
console.log('splice:')
console.log(array)
array.splice(1, 2, 100)
console.log(array)
console.log('---------')


// 16. slice - позволяет вернуть новый подмассив из переданного, нет муттации исходного массива
console.log('slice:')
console.log(array)
const arraySliced = array.slice(1, 5)
console.log(arraySliced)
console.log('---------')


// 17. indexOf - возвращает индекс элемента массива
console.log('indexOf:')
const foundIndexOf = array.indexOf(5)
console.log(foundIndexOf)
console.log('---------')


// 18. lastIndexOf - возвращает индекс массива, но поиск идёт с конца массива
console.log('lastIndexOf:')
const foundLastIndexOf = array.lastIndexOf(4)
console.log(foundLastIndexOf)
console.log('---------')


// 19. includes - возвращает булиан (наличие/отсутствие элемента в массиве)
console.log('includes:')
const arrayIncludes = array.includes(2)
console.log(arrayIncludes)
console.log('---------')


// 20. reverse - переворачивает массив и мутирует его
console.log('reverse:')
const arrayReversed = array.reverse()
console.log(arrayReversed)
console.log('---------')