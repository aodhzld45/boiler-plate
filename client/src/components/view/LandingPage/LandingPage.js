import React, { useEffect } from 'react'
import axios from "axios"
import { Button } from 'antd';
import { useNavigate} from 'react-router-dom'

function LandingPage() {

  useEffect(() => {
    axios.get('/api/hello')
    .then(res => console.log(res.data));
  }, [])
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 서버에 로그아웃 요청 보내기
      const response = await axios.get('/api/users/logout', {
        withCredentials: true, // 쿠키를 전송하기 위해 설정
      });
  
      // 서버로부터 성공적인 응답을 받았을 때 로컬에서도 세션 정보 삭제 등의 처리 수행 가능
      console.log(response.data);
  
      // 서버로부터의 응답에 따라 알림창 표시
      if (response.data.success) {
        alert('Logout successful');
        // 예시: 로그아웃 후 리다이렉트 등의 동작 수행
        navigate('/login');
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div style={{
      display : 'flex', flexDirection: 'column', justifyContent : 'center', alignItems: 'center', 
      width : '100%', height : '100vh'
    }}>
      <h1>LandingPage 시작 페이지입니다.</h1>

      <Button type="primary" onClick={handleLogout} >
         로그아웃
      </Button>
       
  
     
    </div>
  )
}

export default LandingPage
