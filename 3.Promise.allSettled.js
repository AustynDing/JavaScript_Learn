/**
   * 等待所有的Promise有结果后
   * 该方法返回的Promise完成
   * 并且按照顺序将所有结果汇总
   * @param {Promise[]} promises
   */
Promise.allSettled=function(promises) {
    return Promise.all(promises.map(promise => {
        return Promise.resolve(promise)
        .then((value) => ({status:'fulfilled',value}))
        .catch((reason) => ({status:'rejected',reason}))
    }));
  }

  Promise.allSettled([
    Promise.resolve(33),
    new Promise((resolve) => setTimeout(() => resolve(66), 0)),
    99,
    Promise.reject(new Error("一个错误")),
  ]).then((values) => console.log(values));
  
  // [
  //   { status: 'fulfilled', value: 33 },
  //   { status: 'fulfilled', value: 66 },
  //   { status: 'fulfilled', value: 99 },
  //   { status: 'rejected', reason: Error: 一个错误 }
  // ]
  