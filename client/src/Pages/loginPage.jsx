import Logo from './PagesComponents/homePagePic/cubes.jpg'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
const rules = [
  {
    required: true,
    message: 'required',
  },
]
function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    console.log('Success:', values)
    console.log(values)
    const myApi = 'http://localhost:5000/login'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(values),
    }
    try {
      dispatch(SetLoader(true))
      console.log(myApi, options)
      const response = await fetch(myApi, options)
      dispatch(SetLoader(false))
      console.log(response)
      const myData = await response.json()
      console.log(myData.data)
      console.log(myData.message)
      console.log(myData.name)
      console.log(myData.lastVisit)

      if (
        myData && 
        myData.data) {
        message.success('The user logged in successfully')
        console.log('the token is', myData.data)
        window.localStorage.setItem('token', myData.data)
        navigate('/profile')
        // window.location.reload(false)
      } else {
        message.error(myData.message)
      }
    } catch (error) {
      dispatch(SetLoader(false))
      const errorResponse = await error.json()
      console.log('error', errorResponse)
    }
  }

  return (
    <section className="vh-90 pt-2 pb-2" style={{ backgroundColor: '#eee' }}>
      <Form layout="vertical" onFinish={onFinish}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Log in
                      </p>

                      <div className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Item rules={rules} label="Email" name="email">
                              <Input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required
                              />
                            </Form.Item>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Item
                              rules={rules}
                              label="Password"
                              name="password"
                            >
                              <Input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required
                              />
                            </Form.Item>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Button
                            htmlType="submit"
                            style={{ background: '#26A69A' }}
                            block
                          >
                            Log in
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={Logo}
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </section>
  )
}
export default LoginPage
