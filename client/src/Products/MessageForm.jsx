import React from 'react'
import { Modal, Tabs, Form, Input, Row, Col, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
function MessageForm({
  answerMessage,
  setAnswerMessage,
  showMessagesForm,
  setShowMessagesForm,
  selectedProduct,
}) {
  console.log(
    'showMessagesForm',
    showMessagesForm,
    'selectedProduct',
    selectedProduct,
    'answerMessage',
    answerMessage,

  )
  const formReference = React.useRef(null)
  const {user} = useSelector((state) => state.users)
  const rules = [
    {
      required: true,
      message: 'Required ',
    },
  ]
  const dispatch = useDispatch()
  const sendMessage = async (values) => {
    console.log('values to pass to mingoDb send a message are', values)
    const myApi = 'http://localhost:5000/messages/create-message'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(values),
    }
    const response = await fetch(myApi, options)
    console.log(response)
    const myData = await response.json()
    if (myData) {
      message.success('The message was sent successfully')
    }
    else {
      message.error(myData.message)
    }
  }
  const onFinishFunc = async (values) => {
    values.seller = selectedProduct.seller
    values.productId = selectedProduct._id
    values.messageAuthor = user._id
    console.log('the values in onFinish func are', values, 'selectedProduct in onFinishFunction is',
    selectedProduct)
    setShowMessagesForm(false)
    setAnswerMessage(false)
    try {
      dispatch(SetLoader(true))
      sendMessage(values)
      dispatch(SetLoader(false))
    } catch (error) {
      dispatch(SetLoader(false))
      // message.error(myData.message)
    }
  }
  return (
    <Modal
      title=""
      open={showMessagesForm}
      onCancel={() => setShowMessagesForm(false)}
      centered
      width={1000}
      style={{ color: '#5E35B1' }}
      okText="Save"
      onOk={() => {
        formReference.current.submit()
      }}
    >
      <div className="text-primary" style={{ textAlign: 'center' }}>
        {answerMessage ? <h3>Chat with the author </h3> : <h3>Chat with the seller </h3>}
      </div>
      <Tabs
        style={{ color: '#5E35B1', fontSize: '16px' }}
      >
        <Tabs.TabPane 
        tab="Type a message here" 
        >
          <Form layout="vertical" ref={formReference} 
          onFinish={onFinishFunc}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item label="Your text" name="message" 
                rules={rules}
                >
                  <TextArea type="text" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  )
}

export default MessageForm
