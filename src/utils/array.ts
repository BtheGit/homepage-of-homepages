// Fischer-Yates - But modified to include logic to ensure that we don't start with the same element as was last in the previous ordering.
export const shuffle = (oldArray: any[]): any[] => {
  // This isn't typical for fischer-yates. Certainly less memory efficient. But until we determine we are expecting big arrays, I'm ok.
  const array = [...oldArray];
  let lastElement = array[array.length - 1];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  // If the last element of the previous iteration is the same as the first element of the current iteration, swap it with a random other element
  if (lastElement === array[0]) {
    const randomIndex = Math.floor(Math.random() * (array.length - 1)) + 1;
    [array[0], array[randomIndex]] = [array[randomIndex], array[0]];
  }

  return array;
};
