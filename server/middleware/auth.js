const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 1. 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  // 2. 토큰을 복호화 한 후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) {
      // 에러가 발생하면 클라이언트에 에러 응답을 보낸다.
      return res.status(500).json({ isAuth: false, error: true, message: "인증 실패" });
    }
    if (!user) {
      // 유저가 없으면 클라이언트에 응답을 보낸다.
      return res.status(401).json({ isAuth: false, error: true, message: "인증 실패" });
    }

    // 3. 유저가 있으면 인증 Ok
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };