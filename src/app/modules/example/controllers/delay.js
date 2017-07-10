function delay(time) {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, time);
    } catch (error) {
      reject(error);
    }
  });
}

export default delay;
