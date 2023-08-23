// Промис - это конструктор на вход которого подаётся коллбэк с двумя параметрами(функциями)
// выражающие успешное и неуспешное выполнение

// Нельзя сначала промис за resolve'ить, а потом за reject'ить !!!

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {resolve('success')}, 100)
    // setTimeout(() => {reject('error')}, 100)
   // throw new Error('Errorrr')

}).then((value) => {
        console.log(value)  // 'success'
},
    (error) => {
        console.log(error)
    })         // у then'a два коллбэка - первый перехватывает resolve, а второй reject


// Написание имплементации Promise'a, т.е. конструктора(класса), который будет самописным Промисом

const FULFILLED = 'fulfilled';
const PENDING = 'pending';
const REJECTED = 'rejected';

// executor - функция(коллбэк)
class MyPromise {
    constructor(executor) {
        this.state = PENDING
        this.result = undefined
        this.onFullfilledFunctions = []
        this.onRejectedFunctions = []

        const resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.result = value

                this.onFullfilledFunctions.forEach((func) => func(value))

            }
        }

        const reject = (error) => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.result = error

                this.onRejectedFunctions.forEach((func) => func(error))

            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        console.log(this.state)

        if (this.state === PENDING) {
            if (onFulfilled) {
                this.onFullfilledFunctions.push(onFulfilled)
            }
            if (onRejected) {
                this.onRejectedFunctions.push(onRejected)
            }

        }

        if (onFulfilled && this.state === FULFILLED) {
            onFulfilled(this.result)
        }

        if (onRejected && this.state === REJECTED) {
            onRejected(this.result)
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

}

// Проверка всех свойств/особенностей/возможностей/функционала самописного промиса.

// 1. Конструктор на вход которого переходит executor (коллбэк) в свойствах которого две функции
// для успеха и ошибки, которые можно выполнить и изменить состояние(pending -> fulfilled/rejected)

const customPromiseFirstProperty = new MyPromise((resolve, reject) => {
    //resolve('success')
    reject('err')
})

console.log(customPromiseFirstProperty)


// 2. Используются для отложенного кода

const customPromiseSecondProperty = new MyPromise((resolve, reject) => {
    setTimeout(() => {resolve('reso')}, 300)
})

setTimeout(() => {
    console.log(customPromiseSecondProperty)
}, 1000)


// 3. Resolve, reject можно вызвать только один раз

const customPromiseThirdProperty = new MyPromise((resolve, reject) => {
    setTimeout(() => {resolve('reso')}, 300)
    setTimeout(() => {reject('ошибка')}, 200)
    resolve('Выполняюсь')
})

setTimeout(() => {
    console.log(customPromiseThirdProperty)
}, 1000)


// 4. Чтобы перехватить значение используется метод then, даже если setTimeout

const fourthProperty = new MyPromise((resolve, reject) => {
    setTimeout(() => {resolve('4 успех timeout')}, 300)
  //  resolve('4 успех')
}).then((value) => {
    console.log(value)
})


// 5. Чтобы перехватить ошибку также можно использовать метод then

const fivethProperty = new MyPromise((resolve, reject) => {
    setTimeout(() => reject(new Error('Ошибкаааа 5')), 1000)
}).then((value) => {
    console.log(value)
}, (error) => {
    console.log(error)
})


// 6. Чтобы перехватить ошибку можно использовать метод catch
const sixProperty = new MyPromise((resolve, rejected) => {
    setTimeout(() => rejected(new Error('Ошибка 6')), 1200)
}).catch((error) => {
    console.log(error)
})


// 7. Можно вызвать then много раз на одном промисе и получить один и тот же результат

const sevenProperty = new MyPromise((resolve, reject) => {
   // resolve('success 7 property')
    setTimeout(() => resolve('success 7 property with timeout'), 500)
})
sevenProperty.then((value) => console.log(value) )
sevenProperty.then((value) => console.log(value) )
sevenProperty.then((value) => console.log(value) )


// 8. Если вызвать then когда состояние было уже установлено, всё-равно получим значение

const eightProperty = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve('Успех 8 свойство '), 500)
})

setTimeout(() => {
    eightProperty.then((value) => console.log(value) )
    eightProperty.then((value) => console.log(value) )
    eightProperty.then((value) => console.log(value) )
}, 1200)


// 9. Можно использовать цепочки промисов


class MyPromiseNine {
    constructor(executor) {
        this.state = PENDING
        this.result = undefined
        this.onFullfilledFunctions = []
        this.onRejectedFunctions = []

        const resolve = (value) => {
            if (this.state === PENDING) {
                this.state = FULFILLED
                this.result = value

                this.onFullfilledFunctions.forEach((func) => func(value))

            }
        }

        const reject = (error) => {
            if (this.state === PENDING) {
                this.state = REJECTED
                this.result = error

                this.onRejectedFunctions.forEach((func) => func(error))

            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {

        return new MyPromiseNine((resolve, reject) => {
            if (this.state === PENDING) {
                if (onFulfilled) {
                    this.onFullfilledFunctions.push(() => {
                        try {
                            const newResult = onFulfilled(this.result)
                            if (newResult instanceof MyPromiseNine) {
                                newResult.then(resolve, reject)
                            } else {
                                resolve(newResult)
                            }

                        } catch (error) {
                            reject(error)
                        }
                    })
                }
                if (onRejected) {
                    this.onRejectedFunctions.push(() => {
                        try {
                            const newResult = onRejected(this.result)
                            if (newResult instanceof MyPromiseNine) {
                                newResult.then(resolve, reject)
                            } else {
                                reject(newResult)
                            }

                        } catch (error) {
                            reject(error)
                        }
                    })
                }

            }

            if (onFulfilled && this.state === FULFILLED) {

                    try {
                        const newResult = onFulfilled(this.result)
                        if (newResult instanceof MyPromiseNine) {
                            newResult.then(resolve, reject)
                        } else {
                            resolve(newResult)
                        }

                    } catch (error) {
                        reject(error)
                    }

            }

            if (onRejected && this.state === REJECTED) {
                try {
                    const newResult = onRejected(this.result)
                    if (newResult instanceof MyPromiseNine) {
                        newResult.then(resolve, reject)
                    } else {
                        reject(newResult)
                    }

                } catch (error) {
                    reject(error)
                }
            }

        })



       /* if (this.state === PENDING) {
            if (onFulfilled) {
                this.onFullfilledFunctions.push(onFulfilled)
            }
            if (onRejected) {
                this.onRejectedFunctions.push(onRejected)
            }

        }

        if (onFulfilled && this.state === FULFILLED) {
            onFulfilled(this.result)
        }

        if (onRejected && this.state === REJECTED) {
            onRejected(this.result)
        }*/
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

}




const nineProperty = new MyPromiseNine((resolve, reject) => {
    setTimeout(() => resolve('9 свойство '), 2000)
}).then((value) => {
    return value + ' firsrt then'
}).then((value) => {
    return value + ' second then'
}).then((value) => {
    console.log(value)
})



// 10. Можно возвращать в then новый промис и в then мы получим результат успеха

const tenProperty = new MyPromiseNine((resolve, reject) => {
    resolve('Успех в 10')
}).then((value) => {
    return new MyPromiseNine((resolve, reject) => {
        setTimeout(() => resolve(value + 'new promise'), 3000)
    })
}).then((value) => {
    console.log(value)
})