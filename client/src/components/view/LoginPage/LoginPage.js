import React, { useState } from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage() {

const dispatch = useDispatch();
const [Email, setEmail] = useState("");
const [Password, setPassword] = useState("");

const onEmailHandler = (e) => {
  setEmail(e.currentTarget.value); // 이메일 입력값 가져오기

}

const onPasswordHandler = (e) => {
  setPassword(e.currentTarget.value) // 이메일 패스워드 가져오기
}

const onFinishHandler  = () => {
  console.log('Email : ',Email);
  console.log('password : ', Password);

  let body = {
    email : Email,
    password : Password
  }

  dispatch(loginUser(body));


  Axios.post("/api/users/login", body)
  .then(res => {

  })

}


return (
  <div style={{
    display : 'flex', justifyContent : 'center', alignItems: 'center', 
    width : '100%', height : '100vh'
  }}>
 <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    autoComplete="off"
    onFinish={onFinishHandler} // 폼 제출을 처리하기 위해 onFinish를 사용하세요
    >
    <Form.Item
      label="Email"
      name="Email"
      rules={[
        {
          required: true,
          message: '이메일을 입력해주세요.',
        },
      ]}
    >
      <Input value={Email} onChange={onEmailHandler}  />
    </Form.Item>

    <Form.Item
      label="password"
      name="password"
      rules={[
        {
          required: true,
          message: '비밀번호를 입력해주세요.',
        },
      ]}
    >
      <Input.Password value={Password} onChange={onPasswordHandler} />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form.Item>
  </Form>
     
     
    </div>
  )
}

export default LoginPage