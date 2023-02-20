import { checkout, HarryPotterBook } from "./potter-store";

describe("Potter Store price check", () => {
  it("should return 8.0 if you only get one copy of the 1st book", () => {
    expect(checkout([HarryPotterBook.Book1])).toBe(8.0);
  });
  it("should return 8.0 if you only get one copy of the 2nd book", () => {
    expect(checkout([HarryPotterBook.Book2])).toBe(8.0);
  });
  it("should return 8.0 if you only get one copy of the 3rd book", () => {
    expect(checkout([HarryPotterBook.Book3])).toBe(8.0);
  });
  it("should return 8.0 if you only get one copy of the 4th book", () => {
    expect(checkout([HarryPotterBook.Book4])).toBe(8.0);
  });
  it("should return 8.0 if you only get one copy of the 5th book", () => {
    expect(checkout([HarryPotterBook.Book5])).toBe(8.0);
  });
  it("should return 5% discount if you buy 2 different books", () => {
    expect(checkout([HarryPotterBook.Book1, HarryPotterBook.Book2])).toBe(15.2);
  });
  it("should return 10% discount if you buy 3 different books", () => {
    expect(
      checkout([
        HarryPotterBook.Book1,
        HarryPotterBook.Book2,
        HarryPotterBook.Book3,
      ])
    ).toBe(21.6);
  });
  it("should return 20% discount if you buy 4 different books", () => {
    expect(
      checkout([
        HarryPotterBook.Book1,
        HarryPotterBook.Book2,
        HarryPotterBook.Book3,
        HarryPotterBook.Book4,
      ])
    ).toBe(25.6);
  });
  it("should return 25% discount if you buy 5 different books", () => {
    expect(
      checkout([
        HarryPotterBook.Book1,
        HarryPotterBook.Book2,
        HarryPotterBook.Book3,
        HarryPotterBook.Book4,
        HarryPotterBook.Book5,
      ])
    ).toBe(30);
  });
  it("should return 10% discount you buy 4 books and 3 of them are different, but the discount applies only to the first 3 books", () => {
    expect(
      checkout([
        HarryPotterBook.Book1,
        HarryPotterBook.Book2,
        HarryPotterBook.Book3,
        HarryPotterBook.Book3,
      ])
    ).toBe(29.6);
  });
  it("should buy all the bugs with repeated versions for 1, 2 and 3", () => {
    expect(
      checkout([
        HarryPotterBook.Book1,
        HarryPotterBook.Book1,
        HarryPotterBook.Book2,
        HarryPotterBook.Book2,
        HarryPotterBook.Book3,
        HarryPotterBook.Book3,
        HarryPotterBook.Book4,
        HarryPotterBook.Book5,
      ])
    ).toBe(51.6);
  });

  /* Coverage above this line is 100% for every value checked, however there are 5 mutations surviving our mutation test run */

  /* 4 of them are actually quite interesting and related to business logic
   
[Survived] ArithmeticOperator
src/potter/potter-store.ts:43:7
-         oneBookPrice *
-         booksGroupedByOccurrences.reduce((a, b) => a + (b ? b : 0), 0)
+         oneBookPrice / booksGroupedByOccurrences.reduce((a, b) => a + (b ? b : 0), 0)

[Survived] ArithmeticOperator
src/potter/potter-store.ts:48:7
-         oneBookPrice * 2 * (1 - twoDifferentBooksDiscount) +
-         calculatePriceBasedOnTheNumberOfBooks(
-           removeDiscountedBooks(booksGroupedByOccurrences)
-         )
+         oneBookPrice * 2 * (1 - twoDifferentBooksDiscount) - calculatePriceBasedOnTheNumberOfBooks(removeDiscountedBooks(booksGroupedByOccurrences))

[Survived] ArithmeticOperator
src/potter/potter-store.ts:62:7
-         oneBookPrice * 4 * (1 - fourDifferentBooksDiscount) +
-         calculatePriceBasedOnTheNumberOfBooks(
-           removeDiscountedBooks(booksGroupedByOccurrences)
-         )
+         oneBookPrice * 4 * (1 - fourDifferentBooksDiscount) - calculatePriceBasedOnTheNumberOfBooks(removeDiscountedBooks(booksGroupedByOccurrences))

[Survived] ArithmeticOperator
src/potter/potter-store.ts:69:7
-         oneBookPrice * 5 * (1 - fiveDifferentBooksDiscount) +
-         calculatePriceBasedOnTheNumberOfBooks(
-           removeDiscountedBooks(booksGroupedByOccurrences)
-         )
+         oneBookPrice * 5 * (1 - fiveDifferentBooksDiscount) - calculatePriceBasedOnTheNumberOfBooks(removeDiscountedBooks(booksGroupedByOccurrences))
*/

  /* To be able to ensure our code survives to the mutations mentioned above, we will have to improve our coverage with some missing scenarios */

  it("should return apply no discount to 2 books with no different values", () => {
    expect(checkout([HarryPotterBook.Book1, HarryPotterBook.Book1])).toBe(16.0);
  });

  it("should return apply 5% discount to 2 different books and 2 equal books", () => {
    expect(
      checkout([
        HarryPotterBook.Book1,
        HarryPotterBook.Book2,
        HarryPotterBook.Book2,
      ])
    ).toBe(23.2);
  });

  it("should return apply 20% discount to 4 different books and 2 equal books", () => {
    expect(
      checkout([
        HarryPotterBook.Book1,
        HarryPotterBook.Book2,
        HarryPotterBook.Book3,
        HarryPotterBook.Book4,
        HarryPotterBook.Book4,
      ])
    ).toBe(33.6);
  });

  it("should return apply 25% discount to 5 different books and 2 equal books", () => {
    expect(
      checkout([
        HarryPotterBook.Book1,
        HarryPotterBook.Book2,
        HarryPotterBook.Book3,
        HarryPotterBook.Book4,
        HarryPotterBook.Book5,
        HarryPotterBook.Book5,
      ])
    ).toBe(38);
  });

  /* Last mutation is quite interesting because it's actually related to some common patterns in TS/JS*/
  /*
    [Survived] EqualityOperator
    src/potter/potter-store.ts:64:22
    -     for(let index = 0; index < books.length; index++) {
    +     for(let index = 0; index <= books.length; index++) {
  */
  // We solved it it if we remove (b ? b : 0) from the reducer operator in line 44
});
