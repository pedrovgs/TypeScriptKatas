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
});
