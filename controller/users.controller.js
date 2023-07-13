const UserService = require('../service/users.service');

class UserController {
  userService = new UserService();

  signUp = async (req, res) => {
    try {
      const { nickname, password } = req.body;
      const { code, result } = await this.userService.createOne({ nickname, password });
      return res.status(code).json({ message: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.result });
      console.error(err);
      return res.status(500).json({ message: '오류가 발생하였습니다.' });
    }
  };

  login = async (req, res) => {
    try {
      const { nickname, password } = req.body;
      const { code, result, token } = await this.userService.login({ nickname, password });

      res.cookie('authorization', `Bearer ${token}`);
      return res.status(code).json({ message: result, token });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.result });
      console.error(err);
      return res.status(500).json({ message: '오류가 발생하였습니다.' });
    }
  };
}

module.exports = UserController;
