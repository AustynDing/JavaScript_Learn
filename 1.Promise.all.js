/**
 * 
 * @param {Promise[]} promises 
 * @returns 
 */
Promise.MyAll = function(promises){
    return new Promise((resolve, reject) => {
        try {
            const results = []
            let fulfilledCount = 0
            if(promises.length === 0) resolve(results) // 对于空数组的特殊处理
            promises.forEach((promise,index) => {
                Promise.resolve(promise) // 处理直接传入数字的情况
                .then((data) => {
                    fulfilledCount++ // 回调函数使用了闭包，保持了对外部作用域中变量和函数的引用
                    results[index] = data // 通过索引确保输出结果与输入的顺序相同
                    if(fulfilledCount === promises.length) resolve(results) // 所有promise都完成了
                }).catch((error) => reject(error)) // promise出错
            })
        } catch (error) {
            reject(error) // 兜底处理
        }
    })
}

Promise.MyAll([
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(66),1000)
    }),
    Promise.resolve(5),
    new Promise((resolve,reject) => {
        setTimeout(() => reject('error'),2000)
    }),
    4
]).then((success) =>{
    console.log(success)
}).catch((error) =>{
    console.log(error)
})