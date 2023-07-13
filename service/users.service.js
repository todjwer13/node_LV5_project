const jwt = require('jsonwebtoken');

const UserRepository = require('../repository/users.repository');

class UserService {
  userRepository = new UserRepository();

  createOne = async ({ nickname, password }) => {
    const existUser = await this.userRepository.findOne([{ nickname }]);
    if (existUser) throw { code: 412, result: '이미 사용중인 닉네임입니다.' };

    await this.userRepository.createOne({ nickname, password });

    return { code: 200, result: '회원가입이 완료되었습니다.' };
  };

  login = async ({ nickname, password }) => {
    const findUser = await this.userRepository.findOne([{ nickname }, { password }]);

    if (!findUser) throw { code: 401, result: '아이디와 패스워드가 일치하지 않습니다.' };
    const token = jwt.sign({ userId: findUser.userId }, process.env.COOKIE_SECRET);
    return { code: 200, result: '로그인 성공', token };
  };
}

module.exports = UserService;
