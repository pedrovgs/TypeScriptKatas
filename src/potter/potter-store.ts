const oneBookPrice = 8.0;
const twoDifferentBooksDiscount = 0.05;
const threeDifferentBooksDiscount = 0.1;
const fourDifferentBooksDiscount = 0.2;
const fiveDifferentBooksDiscount = 0.25;

export type Cart = HarryPotterBook[];

export enum HarryPotterBook {
  Book1,
  Book2,
  Book3,
  Book4,
  Book5,
}

export const checkout = (cart: Cart) => {
  const booksGroupedByBookNumber = groupBooks(cart);
  return calculatePriceBasedOnTheNumberOfBooks(booksGroupedByBookNumber);
};

const groupBooks = (cart: Cart) => {
  const groupedBooks = new Map();
  cart.forEach((value) => {
    if (groupedBooks.has(value)) {
      const currentValue = groupedBooks.get(value);
      groupedBooks.set(value, currentValue + 1);
    } else {
      groupedBooks.set(value, 1);
    }
  });
  return Array.of(...groupedBooks.values());
};

const calculatePriceBasedOnTheNumberOfBooks = (
  booksGroupedByOccurrences: number[]
): number => {
  const numberOfDifferentBooks = booksGroupedByOccurrences.filter(
    (numberOfEqualBooks) => numberOfEqualBooks > 0
  ).length;
  if (numberOfDifferentBooks === 1) {
    return (
      oneBookPrice *
      booksGroupedByOccurrences.reduce((a, b) => a + (b ? b : 0), 0)
    );
  } else if (numberOfDifferentBooks === 2) {
    return (
      oneBookPrice * 2 * (1 - twoDifferentBooksDiscount) +
      calculatePriceBasedOnTheNumberOfBooks(
        removeDiscountedBooks(booksGroupedByOccurrences)
      )
    );
  } else if (numberOfDifferentBooks === 3) {
    return (
      oneBookPrice * 3 * (1 - threeDifferentBooksDiscount) +
      calculatePriceBasedOnTheNumberOfBooks(
        removeDiscountedBooks(booksGroupedByOccurrences)
      )
    );
  } else if (numberOfDifferentBooks === 4) {
    return (
      oneBookPrice * 4 * (1 - fourDifferentBooksDiscount) +
      calculatePriceBasedOnTheNumberOfBooks(
        removeDiscountedBooks(booksGroupedByOccurrences)
      )
    );
  } else if (numberOfDifferentBooks === 5) {
    return (
      oneBookPrice * 5 * (1 - fiveDifferentBooksDiscount) +
      calculatePriceBasedOnTheNumberOfBooks(
        removeDiscountedBooks(booksGroupedByOccurrences)
      )
    );
  } else {
    return 0.0;
  }
};

const removeDiscountedBooks = (books: number[]) => {
  const newBooksCount = [];
  for (let index = 0; index < books.length; index++) {
    const oldCount = books[index];
    const newCount = oldCount - 1;
    newBooksCount.push(newCount);
  }
  return newBooksCount;
};
