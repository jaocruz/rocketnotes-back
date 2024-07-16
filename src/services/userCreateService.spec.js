const userCreateService = require("./userCreateService");
const userRepositoryInMemory = require("../repositories/userRepositoryInMemory");
const appError = require("../utils/appError");

describe("userCreateService", () => {
  let UserRepositoryInMemory = null;
  let UserCreateService = null;

  beforeEach(() => {
    UserRepositoryInMemory = new userRepositoryInMemory();
    UserCreateService = new userCreateService(UserRepositoryInMemory);
  })

  it("user should be created", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    };
  
    const userCreated = await UserCreateService.execute(user);
  
    expect(userCreated).toHaveProperty("id")
  });

  it("user shouldn't be created with existent email", async () => {
    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123"
    };

    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "456"
    };

    await UserCreateService.execute(user1);
    await expect(UserCreateService.execute(user2)).rejects.toEqual(new appError("Este e-mail já está em uso."))
  })
});