const { hash, compare } = require("bcryptjs");
const appError = require("../utils/appError");

const sqliteConnection = require("../database/sqlite");
const userRepository = require("../repositories/userRepository");
const userCreateService = require("../services/userCreateService");

class usersController {
  async create(request, response) {
    const {name, email, password} = request.body;

    const UserRepository = new userRepository();
    const UserCreateService = new userCreateService(UserRepository);
    
    await UserCreateService.execute({ name, email, password });

    return response.status(201).json()
  }

  async update(request, response) {
    const {name, email, password, old_password} = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);

    if(!user){
      throw new appError("Usuário não encontrado.");
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new appError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new appError("Você precisa informar a senha antiga.")
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword){
        throw new appError("A senha antiga não confere!");
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json();

  }
};

module.exports = usersController;