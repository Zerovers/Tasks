const pause = (time) => {
  const ms = time;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
export default pause;
