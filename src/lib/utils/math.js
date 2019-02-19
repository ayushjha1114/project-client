const getRandomNumber = (max) => {
  Math.floor((Math.random() * max));
};

const getNextRoundRobin = (total, current) => {
  let next = current;
  if (current > total - 1) {
    next = 0;
  } else {
    next += 1;
  }
  return next;
};

export { getRandomNumber, getNextRoundRobin };
