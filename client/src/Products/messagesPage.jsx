import React, { useEffect } from 'react'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import { DeleteOutlined } from '@ant-design/icons'
import defaultImage from '../Pages/PagesComponents/homePagePic/cubes.jpg'
function Messages() {
  const { user } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const [messages, setMessages] = React.useState([])
  const getImageSrc = (message) => {
    if (message.product.image && message.product.image.data) {
      const blob = new Blob([new Uint8Array(message.product.image.data)], {
        type: 'image/jpeg',
      })
      return URL.createObjectURL(blob)
    } else {
      return defaultImage
    }
  }
  const getMessagesData = async () => {
    const myApi = 'http://localhost:5000/messages/get-my-messages'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ seller: user._id }),
    }
    try {
      dispatch(SetLoader(true))
      console.log(myApi, options, 'seller:', user._id)
      const response = await fetch(myApi, options)
      console.log('the response is', response)
      const myData = await response.json()
      dispatch(SetLoader(false))
      console.log('my data is', myData)
      console.log('the messages are', myData.messages)
      if (response.ok) {
        setMessages(myData.messages)
        console.log('the messages set by SetMessages are', messages)
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(SetLoader(false))
      console.log('error', error.message)
    }
  }
  const deleteMessage = async (messageId) => {
    console.log('values to pass to mingoDb is', messageId)
    const myApi = `http://localhost:5000/messages/delete-message/${messageId}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    try {
      dispatch(SetLoader(true))
      const response = await fetch(myApi, options)
      console.log('the response for delete message function is', response)
      const myData = await response.json()
      console.log('the jsoned response for delete message func is', myData)
      message.success(myData.message)
      dispatch(SetLoader(false))
      getMessagesData()
    } catch (error) {
      dispatch(SetLoader(false))
      return error.message
    }
  }
  useEffect(() => {
    console.log('messages function started')
    getMessagesData()
  }, [])
  return (
    <div>
      <section
        style={{ backgroundColor: '#eee' }}
        className="container py-5 my-3 col-10 d-flex justify-content-center"
      >
        <div
          className="container row d-flex justify-content-center"
          style={{ fontSize: '18px' }}
        >
          {messages.length > 0 &&
            messages.map((message) => (
              <div
                key={message._id}
                className="row justify-content-center mb-3"
              >
                <div className="col-md-12 col-xl-10">
                  <div className="card shadow-0 border rounded-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                          <div
                            className="image-zoom"
                            onMouseEnter={(e) =>
                              (e.target.style.transform = 'scale(1.4)')
                            }
                            onMouseLeave={(e) =>
                              (e.target.style.transform = 'scale(1)')
                            }
                          >
                            <img
                              src={getImageSrc(message)}
                              className="w-100"
                              style={{
                                width: '85px',
                                height: '165px',
                                borderRadius: '5px',
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-6">
                          <h6 className="text-uppercase">
                            Regards: {message.product.name}
                          </h6>
                          <h6 className="text-uppercase">
                            From: {message.fromAuthor.name}
                          </h6>

                          <div className="d-flex flex-row">
                            <div className="text-danger mb-1 me-2">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>
                          </div>
                          <div
                            className="mt-1 mb-0 text-muted small"
                            style={{ fontSize: '16px' }}
                          >
                            <span className="text-primary"> • </span>
                            <span>Message text: {message.message}</span>
                          </div>
                          <div className="mb-2 text-muted small"></div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                          <div className="d-flex flex-row align-items-center mb-1">
                            <h4 className="mb-1 me-1">
                              Posted price: ${message.product.price}
                            </h4>
                          </div>
                          <div className="d-flex flex-column mt-4">
                            <button
                              className="btn btn-outline-primary btn-sm mt-2"
                              type="button"
                              style={{
                                fontSize: '15px',
                                background: '#26A69A',
                                color: 'ButtonFace',
                              }}
                              onClick={() => {
                                deleteMessage(message._id)
                              }}
                            >
                              Delete the message
                              <DeleteOutlined style={{ marginLeft: '10px' }} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}

export default Messages
