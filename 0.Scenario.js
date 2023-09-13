var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

// 使用 setTimeout 实现 setInterval
function _setInterval(callback,delay,times){
    if(times <= 0) return
    let timeId = setTimeout(() => {
        callback()
        clearTimeout(timeId)
        _setInterval(callback,delay,--times)
         // 在定时器中递归，
    },delay)
}

function fn(){
    console.log('fn')
}
// _setInterval(fn,1000,5)


// 使用 setInterval 实现 setTimeout

function _setTimeout(callback,delay){
    let timeId = setInterval(() => {
        callback()
        clearInterval(timeId)
    },delay)
}
// _setTimeout(fn,1000)

let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');

// // 列出 key/value 对
// for(let [name, value] of formData) {
//   console.log(`${name} = ${value}`); // key1 = value1，然后是 key2 = value2
// }
// formData.forEach((value,key,parent) => {
//     console.log(value,key,parent)
// })


// 使用 promise 包装 Ajax请求
/**
 * 
 * @param {string} url 
 * @param {any} data 
 * @param {'GET' | 'POST' | 'DELETE' | 'OPTION' | 'PUT'} method 
 * @returns 
 */
function sendAjax(url,data={},method='GET'){
    return new Promise((resolve,reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method,url,true)
        xhr.onreadystatechange = () => {
            if(xhr.readyState !== 4) return
            // console.log(xhr.response)  undefined
            // console.log(xhr.statusText) null
            if(xhr.status >= 200 && xhr.status < 400) resolve(xhr.responseText)
            reject(new Error(xhr.status)) // 或者statusText 由服务器指定的状态文本信息
        }
        xhr.onerror = function(){
            reject(new Error(xhr.status))
        }
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(data)
    })
}
// sendAjax('http://jsonplaceholder.typicode.com/posts/2',{},'GET')
// .then((value) => console.log(value))
// .catch((error) => console.log(error))


// 使用 Promise 实现每隔三秒输出时间 

function output(interval){
    return new Promise((resolve, reject) => {
        let timeId = setTimeout(() => {
            console.log(new Date().toLocaleDateString())
            clearTimeout(timeId)
            resolve()
        }, interval);
    })
}

async function Circle(){
    while(true){
        await output(3000)
    }
}
// Circle()

/**
 * @param {Promise} func
 * @param {number} times
 */
Promise.retry = function(func,times){
    return new Promise((resolve, reject) => {
        const retry = () => {
            func()
            .then((value) => resolve(value))
            .catch((error) => {
                times--
                if(times <= 0){
                    reject(error)
                }else{
                    retry()
                }
            })
        }
        retry()
    })
}
let getNum = function () {
    console.log("函数执行一次");
    return new Promise((res, rej) => {
    let num = Math.random() * 10;
    num < 2 ? res("数字小于2") : rej("数字大于2");
});
};
Promise.retry(getNum, 3)
   .then((mes) => {
     console.log(mes);
   })
   .catch((err) => {
     console.log(err);
   });