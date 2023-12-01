import React, { useEffect } from 'react'
import axios from "axios"

function LandingPage() {

  useEffect(() => {
    axios.get('/api/hello')
    .then(res => console.log(res.data));
  }, [])


  return (
    <div style={{
      display : 'flex', justifyContent : 'center', alignItems: 'center', 
      width : '100%', height : '100vh'
    }}>
      <h1>LandingPage 시작 페이지입니다.</h1>
     
    </div>
  )
}

export default LandingPage
