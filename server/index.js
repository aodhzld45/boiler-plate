const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// 보안 설정 config 
const config = require('./config/key')

// Model Import
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');


app.use(bodyParser.json());
app.use(cookieParser());
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

app.post('/api/users/register', async (req, res) => {
  // 회원가입시 필요한 정보들을 Client에서 가져오면 DB에 삽입

  // 유저 정보 인스턴스 생성
  // req.body에는 json 형태로 {id : 'hello'} 데이터가 들어있음
  const user = new User(req.body);


  const result = await user.save().then(()=>{
    res.status(200).json({
      success: true
    })
  }).catch((err)=>{
    res.json({ success: false, err })
  })
  
  // try {
  //   // await를 사용하여 유저를 저장
  //   const savedUser = await user.save();
  //   return res.status(200).json({
  //     success: true,
  //   });
  // } catch (err) {
  //   console.error(err);
  //   return res.status(500).json({
  //     success: false,
  //     error: '회원가입에 실패했습니다.',
  //     details: err.message,
  //   });
  // }
});

// 로그인 기능
app.post('/api/users/login', async (req, res) => {
  try {
    // 1. 요청된 이메일을 DB에서 조회하여 존재하는지 확인
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당되는 유저가 없습니다."
      });
    }

     // 2. 요청된 이메일이 DB에 있다면 비밀번호가 맞는 비밀번호인지 확인
     user.comparePassword(req.body.password, (err, isMatch) => {
        console.log('Received Password:', req.body.password);
        if (!isMatch) {
          return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
        } 
     });
  
 
    // const isMatch = await user.comparePassword(req.body.password);

    // if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
  

    // 3. 이메일, 비밀번호가 모두 일치하면 토큰을 생성하기. -> jsonWebToken
    const token = await user.generateToken();
    console.log('Generated Token:', token);

    // 토큰을 저장한다, 어디에 ? (쿠키) , 로컬스토리지
    res.cookie("x_auth", token)
       .status(200)
       .json({ loginSuccess: true, userId: user.id });

  } catch (error) {
    // 에러 처리
    console.error(error);
    res.status(500).json({ loginSuccess: false, message: "서버 에러" });
  }
});


app.get('/api/users/auth', auth, async (req, res) => {
  // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 뜻
  res.status(200).json({
    _id : req.user._id,
    isAdmin : req.user.role === 0 ? false : true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname : req.user.lastname,
    role : req.user.role,
    image : req.user.image  
  })
})

app.get('/api/users/logout', auth, async (req, res) => {

  // res.clearCookie('x_auth');
  User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { token: "" } },
      { new: true }, // 옵션을 추가하여 업데이트된 문서를 반환하도록 함
      (err, updatedUser) => {
          if (err) return res.json({ success: false, err });
          
          // 로그아웃 후 업데이트된 사용자 정보를 출력
          console.log('Updated User:', updatedUser);
          
          return res.status(200).send({
              success: true, message : 'logout Success'
          });
      }
  );
});

app.get('/api/hello',  async (req, res) => {
  res.send('안녕하세요 axios 테스트입니다.')
});

const port = 5000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
