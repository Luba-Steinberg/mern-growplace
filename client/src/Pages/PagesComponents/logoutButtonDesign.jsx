import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { message } from 'antd'

import { Button } from 'react-bootstrap'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
import LoginPage from '../loginPage'
import { useNavigate } from 'react-router-dom'
const rules = [
  {
    required: true,
    message: 'required',
  },
]

function LogoutButton(user) {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    message.success('The user logged out')
    window.location.reload(false)
  }

  return (
    <>
      <div className="p-8 col-12">
        <Button style={{ background: '#26A69A' }} onClick={handleLogout}>
          <UserOutlined style={{ marginRight: '5px' }} />
          <span className="text-decoration-underline cursor-pointer text-uppercase">{user.user.name} </span>
          <LogoutOutlined style={{ marginLeft: '10px' }} />
        </Button>
      </div>
    </>
  )
}

export default LogoutButton
