import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Checkbox, Form, Input } from 'antd';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {

  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value); // 입력값 가져오기
  }
  
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value); 
  }

  const onNameHandler = (e) => {
    setName(e.currentTarget.value) 

  }

  const onConfirmPassword = (e) => {
    setConfirmPassword(e.currentTarget.value);
  }
  
  const onFinishHandler  = () => {
    console.log('Email : ',Email);
    console.log('Name : ', Name);
    console.log('password : ', Password);
    console.log('confirmPassword : ', ConfirmPassword);

    if (Password !== ConfirmPassword ) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      setPassword("");
      setConfirmPassword("");
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
      
      return;
    }
      
    
  
    let body = {
      email : Email,
      name : Name,
      password : Password,
      confirmPassword : ConfirmPassword
    }

    dispatch(registerUser(body))
      .then((response) => {
        
      }).catch((err) => {
        
      });
  
  
  
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
        label="Name"
        name="Name"
        rules={[
          {
            required: true,
            message: '이름을 입력해주세요.',
          },
        ]}
      >
        <Input value={Name} onChange={onNameHandler} />
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
        <Input.Password value={Password} onChange={onPasswordHandler} ref={passwordRef} />
      </Form.Item>

      <Form.Item
        label="ConfirmPassword"
        name="ConfirmPassword"
        rules={[
          {
            required: true,
            message: '비밀번호를 한번 더 입력해주세요.',
          },
        ]}
      >
        <Input.Password value={ConfirmPassword} onChange={onConfirmPassword} />
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
          Register
        </Button>
      </Form.Item>
    </Form>
       
       
      </div>
  )
}

export default RegisterPage