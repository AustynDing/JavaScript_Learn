/**
 * 
 * @param {Promise[]} promises 
 * @returns 
 */
Promise.MyRace = function(promises){
    return new Promise((resolve,reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(resolve,reject)
        });
    })
}
let p1 = new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    },100)
  })
  let p2 = new Promise((resolve,reject) => {
    setTimeout(() => {
      reject(2)
    })
  })
  let p3 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(3)
    })
  })
  
  Promise.MyRace([p1,p2,p3]).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  })