const { hash } = require("bcryptjs");
const appError = require("../utils/appError");

class userCreateService{
  constructor(userRepository){
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if(checkUserExists){
      throw new appError("Este e-mail já está em uso.")
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword })

    return userCreated;
  }
}

module.exports = userCreateService;