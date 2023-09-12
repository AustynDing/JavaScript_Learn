/**
 *  无论成功还是失败都会执行回调
 * @param {Function} onFinally 
 * @returns 
 */
Promise.prototype.MyFinally = function(onFinally){
    return this // 无论pormise的状态是什么，都会调用onFinally函数。调用this，不影响promise对象的结果
    .then((data) =>{
        onFinally()
        return data // 保持fulfilled的原因一致，如果返回值不是一个 Promise 对象，则会隐式地将其包装在 Promise 中，然后解决。
    })
    .catch((error) =>{
        onFinally()
        throw error // 保持rejected的原因一致
    })
}
/**
 * 1. onFinally函数不带参数
 * 2. onFinally函数返回值将被忽略，除非返回一个被拒绝的 promise
 * 3. return data / throw error的作用：
 *  保证 finally 方法返回的 Promise 对象的状态和结果与原来的 Promise 对象相同。
 *  如果在 then 中不 return data，那么 finally 方法返回的 Promise 对象会被兑现（fulfilled）为 undefined，而不是原来的 Promise 对象的成功值
 */

const promise = new Promise((resolve,reject)=>{
    resolve(1)
})
const promise2 = promise.MyFinally((data) =>{
    console.log('finally',data) // undefined
    return 123
})
setTimeout(() => {
    console.log('here',promise2)
}, 100);