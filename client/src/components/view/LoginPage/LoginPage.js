import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';

function LoginPage() {
  const onFinish = (values) => {
    console.log('Success', values);
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
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
      <Input />
    </Form.Item>

    <Form.Item
      label="비밀번호"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
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
        Submit
      </Button>
    </Form.Item>
  </Form>
     
     
    </div>
  )
}

export default LoginPage