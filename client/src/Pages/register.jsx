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

function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    console.log(values)
    const myApi = 'http://localhost:5000/register'
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
      console.log(response.text)
      const myData = await response.json()
      console.log(myData)
      if (response.ok) {
        message.success('The user was added successfully')
        console.log(myData.userName)
        console.log(myData.lastUserVisit)
        navigate('/login')
        // window.location.reload(false)
      } else {
        message.error(myData.message)
      }
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message)
    }

  }
  return (
    <section className="vh-40" style={{ backgroundColor: '#eee' }}>
      <Form layout="vertical" 
      className="py-2"
      onFinish={onFinish}
      >
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <div className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Item rules={rules} label="Name" name="name">
                              <Input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                name="name"
                                required
                              />
                            </Form.Item>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Item rules={rules} label="Email" name="email">
                              <Input
                                type="email"
                                className="form-control"
                                name="email"
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
                                name="password"
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
                            Register
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2cls">
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
export default RegisterPage
