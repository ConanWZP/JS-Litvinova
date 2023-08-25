const {isObject, isArray, isSameType} = require('./helpers')

module.exports = deepMerge;

/*function deepMerge(obj1, obj2) {

    if (!isObject(obj1) && !isArray(obj1) || !isSameType(obj1, obj2)) {
        console.log('тут')
        if (isArray(obj2) || isObject(obj2)) {
            return deepCopy(obj2)
        }
       /!* if (isObject(obj2)) {
            return deepCopy(obj2)
        }*!/
        return obj2

    }

    if (isArray(obj1)) {
        console.log('we are here')
        return deepMergeArrays(obj1, obj2)
    }

    return deepMergeObjects(obj1, obj2)


}*/

/*function deepCopy(item) {

    if (!isArray(item) && !isObject(item)) {
        throw new TypeError(`Errorrr`)
    }

    const result = isArray(item) ? [...item] : {...item}

    for (let i of Object.keys(result)) {
        if ( isArray(result[i]) || isObject(result[i]) ) {
            result[i] = deepCopy(result[i])
        }
    }

    return result
}*/

// console.log(  deepCopy([1,2,3,[4]])   )

/*function deepCopyArray(arr) {
    const result = [...arr]

    for (let i = 0; i < result.length; i++) {
        if (isArray(result[i])) {
            result[i] = deepCopyArray(result[i])
            // чтобы код не делал проверку след условия, а сразу же запускал цикл с новой итерации
            continue
        }

        if (isObject(result[i])) {
            result[i] = deepCopyObject(result[i])

        }

    }
    return result

}

function deepCopyObject(obj) {
    const result = {...obj};

    for (let i of Object.keys(obj)) {
        if (isArray(result[i])) {
            result[i] = deepCopyArray(result[i])
            // чтобы код не делал проверку след условия, а сразу же запускал цикл с новой итерации
            continue
        }

        if (isObject(result[i])) {
            result[i] = deepCopyObject(result[i])
        }

    }
    return result

}*/

/*function deepMergeArrays(arr1, arr2) {
    let result = [...arr1, ...arr2]
    return deepCopy(result)
}*/

/*function deepMergeObjects(obj1, obj2) {
    const result = deepCopy(obj1)

    for (const key of Object.keys(obj2)) {
        if (!result.hasOwnProperty(key)) {

            if (isArray(obj2[key]) || isObject(obj2[key])) {
                result[key] = deepCopy(obj2[key])
                // чтобы код не делал проверку след условия, а сразу же запускал цикл с новой итерации
                continue
            }

        /!*    if (isObject(obj2[key])) {
                result[key] = deepCopy(obj2[key])
                continue
            }*!/

            result[key] = obj2[key]
            continue
        }

        result[key] = deepMerge(result[key], obj2[key])

    }

    return result

}*/

console.log(  deepMerge({a: [1,2,3]}, {a: [4, 3, 7]}   )   )
// console.log(         deepMerge([ 1, 3, {a: 1, b: [1, 2, 3, {p: 6}]} ],  [ 5, [1, 3, 4], { c: 1 } ])       )


function deepMerge(obj1, obj2) {

    if (!isObject(obj1) && !isArray(obj1) || !isSameType(obj1, obj2)) {

        if (isArray(obj2) || isObject(obj2)) {
            return deepCopy(obj2)
        }

        return obj2

    }

    if (isArray(obj1)) {
        return deepCopyArrays(obj1, obj2)
    }

    return deepCopyObjects(obj1, obj2)

}

function deepCopy(item) {

    let result = isObject(item) ? {...item} : [...item]

    for (let i of Object.keys(result)) {
        if (isArray(result[i]) || isObject(result[i])) {
            result[i] = deepCopy(result[i])
        }
    }

    return result
}

function deepCopyArrays(arr1, arr2) {
    let result = [...arr1, ...arr2]
    return deepCopy(result)
}

function deepCopyObjects(obj1, obj2) {
    let result = deepCopy(obj1)

    for (const key of Object.keys(obj2)) {
        if (!result.hasOwnProperty(key)) {

            if (isArray(obj2[key]) || isObject(obj2[key])) {
                result[key] = deepCopy(obj2[key])
            }

            result[key] = obj2[key]

        }

        result[key] = deepMerge(result[key], obj2[key])


    }
    return result
    // dasd
}