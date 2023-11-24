const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// 보안 설정 config 
const config = require('./config/key')

//User Model Import
const { User } = require('./models/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
}).then(() => {
  console.log('MongoDB Connected.. Success');
}).catch((err) => {
  console.log(err + 'test');
});

app.get('/', (req, res) => {
  res.send('루트 주소 취업하고 시포요! 뿌에에엥');
});

app.post('/register', async (req, res) => {
  // 회원가입시 필요한 정보들을 Client에서 가져오면 DB에 삽입

  // 유저 정보 인스턴스 생성
  // req.body에는 json 형태로 {id : 'hello'} 데이터가 들어있음
  const user = new User(req.body);

  try {
    // await를 사용하여 유저를 저장
    const savedUser = await user.save();
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: '회원가입에 실패했습니다.',
      details: err.message,
    });
  }
});

// 로그인 기능
app.post('/login', async (req, res) => {
  // 1. 요청된 이메일을 DB에서 조회하여 존재하는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
  if (user) {
    return res.json({
      loginSuccess: false,
      message: "제공된 이메일에 해당되는 유저가 없습니다."
    })
  }
  // 2. 요청된 이메일이 DB에 있다면 비밀번호가 맞는 비밀번호인지 확인
  user.comparePassword(req.body.password, (err, isMatch) => {
    if(isMatch)
      return res.json({loginSuccess : false, message : "비밀번호가 틀렸습니다."});


  // 3. 이메일, 비밀번호가 모두 일치하면 토큰을 생성하기. -> jsonWebToken
  user.generateWebToken((err, token) => {
    if (err) return res.status(400).send(err);
    // 토큰을 저장한다, 어디에 ? (쿠키) , 로컬스토리지
      
    

  })

  })
})

})







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
