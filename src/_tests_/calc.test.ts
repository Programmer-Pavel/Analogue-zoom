import { add } from "./calc";

export const fetchUser = (id: number) => {
  return fetch(`http://localhost:4000/users/${id}`);
};

describe("mock API call", () => {
  const user = {
    name: "Juntao",
  };
  it("mock fetch", () => {
    // given
    global.fetch = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ user }));
    const process = jest.fn();
    // when
    fetchUser(111).then((x) => console.log(x));
    // then
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:4000/users/111"
    );
  });
});
