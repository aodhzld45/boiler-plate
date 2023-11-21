const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

//User Model Import
const { User } = require('./models/User');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aodhzld45:abcd1013@boiler-plate.mju6n4y.mongodb.net/', {
}).then(() => {
  console.log('MongoDB Connected.. Success');
}).catch((err) => {
  console.log(err + 'test');
});

app.get('/', (req, res) => {
  res.send('루트 주소 취업하고 시포요!');
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







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
