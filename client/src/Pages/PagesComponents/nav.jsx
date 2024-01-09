import Logo from './homePagePic/cubes.jpg'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from '../loginPage.jsx'
// import RegisterPage from '../register.jsx'
import RegisterPage from '../register.jsx'
import Home from '../home.jsx'
import FurniturePage from '../furniture'
import StrollersPage from '../strollers.jsx'
import ClothesPage from '../clothes'
import AccessoriesPage from '../accessoriesPage'
import ProtectedPage from '../protectedPage.jsx'
import Profile from '../profile.jsx'
import LogoutButton from './logoutButtonDesign.jsx'
import { useEffect, useState } from 'react'
// import { message } from 'antd'
// import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
// import React, { createContext, useContext } from 'react'
function MyNav() {
  const [tokenExistsForButtons, setTokenExistsForButtons] = useState(false)
  // const tokenExistsForButtons = !!localStorage.getItem('token');
  useEffect(() => {
    if (localStorage.getItem('token')) setTokenExistsForButtons(true)
    else setTokenExistsForButtons(false)
    console.log('token state in useEffect', tokenExistsForButtons)
  }, [localStorage.getItem('token')])

  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg nav-justified navbar-light bg-light bg-gradient">
          <div className="container-fluid">
            <div className="navbar-brand">
              <img
                src={Logo}
                alt="cube"
                width="120"
                height="44"
                className="d-inline-block align-text-top"
              />
              <h2 style={{ color: '#6f42c1' }}>Growplace</h2>
            </div>
          </div>
          <div className="col-6">
            <Link to="/" className="text-secondary m-1">
              Home
            </Link>
            <Link to="/profile" className="text-secondary m-1">
              My profile
            </Link>
            <Link to="/furniture" className="text-secondary m-1">
              Furniture
            </Link>
            <Link to="/strollers" className="text-secondary m-1">
              Strollers
            </Link>
            <Link to="/clothes" className="text-secondary m-1">
              Clothes
            </Link>
            <Link to="/accessories" className="text-secondary m-1">
              Accessories
            </Link>
          </div>

          <div className="container-fluid text-align-right col-2">
            {!tokenExistsForButtons && 
            (
              <div className="col-6">
                <button
                  className="btn"
                  style={{ background: '#26A69A', textDecoration: 'none' }}
                >
                  <Link
                    to="/register"
                    style={{ textDecoration: 'none', color: 'ButtonFace' }}
                  >
                    Sign up
                  </Link>
                </button>
              </div>
            )
            }

            {!tokenExistsForButtons && (
              <div className="col-6">
                <button className="btn" style={{ background: '#26A69A' }}>
                  <Link
                    to="/login"
                    style={{ textDecoration: 'none', color: 'ButtonFace' }}
                  >
                    Log in
                  </Link>
                </button>
              </div>
            )}

            <ProtectedPage>
              <LogoutButton />
            </ProtectedPage>
          </div>
        </nav>
        <Routes>
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />

          <Route
            path="/furniture"
            element={
              <ProtectedPage>
                <FurniturePage />
              </ProtectedPage>
            }
          />
          <Route
            path="/strollers"
            element={
              <ProtectedPage>
                <StrollersPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/clothes"
            element={
              <ProtectedPage>
                <ClothesPage />
              </ProtectedPage>
            }
          />
          <Route
            path="/accessories"
            element={
              <ProtectedPage>
                <AccessoriesPage />
              </ProtectedPage>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default MyNav
