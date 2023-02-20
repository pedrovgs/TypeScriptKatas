import { checkout, HarryPotterBook } from "./potter-store";

describe("Potter Store price check", () => {
  it("should work", () => {
    const cart = [HarryPotterBook.Book1];

    expect(checkout(cart)).not.toBeUndefined();
  });
});
