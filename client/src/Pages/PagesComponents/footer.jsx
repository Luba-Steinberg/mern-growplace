import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
// import LoginPage from './loginPage.jsx'
// import RegisterPage from './register.jsx'
// import Home from './home.jsx'
function MyFooter() {
// props
  // const {currentPage, setCurrentPage} = props;
  return (
    <div>
      <BrowserRouter>
        <footer className="bg-secondary bg-gradient text-white text-center text-md-start ">
          <div className="container p-4">
            <div className="row">
              <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                <h5 className="text-uppercase">About Us</h5>
                <p>
                  <span style={{ fontFamily: 'cursive' }}>
                    'Steinberg and Co' <b> </b>
                  </span>
                  is a group of eager and passionate programmers who always
                  dreamed to make all parents' lives easier, using the last
                  teachnologies. Lastly their dream came true. We wish you
                  pleasant web-surfing!
                </p>
              </div>
              {/* <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase">Useful links</h5>

                <ul className="list-unstyled mb-0">
                  <li>
                    <Link
                      to="/"
                      className="text-white"
                      style={{ textDecoration: 'none' }}
                    >
                      Home page
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="text-white"
                      style={{ textDecoration: 'none' }}
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="text-white"
                      style={{ textDecoration: 'none' }}
                    >
                      Log in
                    </Link>
                  </li>
                </ul>
              </div> */}
              <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-0">Contact us</h5>
                <ul className="list-unstyled mb-0">
                  <li>
                    <span
                      className="text-white"
                      style={{ textDecoration: 'none' }}
                    >
                      {/* <br /> */}
                      email: lubasha5768@gmail.com
                    </span>
                  </li>
                  <li>
                    <span
                      className="text-white"
                      style={{ textDecoration: 'none' }}
                    >
                      phone: 0527689687
                    </span>
                  </li>

                  <li>
                    <span
                      href="#!"
                      className="text-white"
                      style={{ textDecoration: 'none' }}
                    >
                      © 2023 Copyright:
                      <span
                        className="text-white"
                        href="https://mdbootstrap.com/"
                        style={{ textDecoration: 'none' }}
                      >
                        <span> </span>
                        STEIBERGgroup
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        {/* <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes> */}
      </BrowserRouter>
    </div>
  )
}
export default MyFooter
