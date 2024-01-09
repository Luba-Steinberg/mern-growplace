import React from 'react'
import { useRef, useEffect } from 'react'
import { Modal, Tabs, Form, Input, Row, Col, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import Images from './Images'

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  passProductValuesToFields,
  getData,
}) {
  console.log('the selected produt details are', selectedProduct)
  const [selectedTab = '1', setSelectedTab] = React.useState('1')
  // api-call for editing a product:
  const editProduct = async (payload) => {
    console.log('values to pass to mingoDb is', payload)
    console.log('values to pass to mingoDb is', payload._id)
    const myApi = 'http://localhost:5000/products/edit-product'
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    }
    try {
      const response = await fetch(myApi, options, payload)
      console.log(response)
      const myData = await response.json()
      console.log('my data is', myData)
      if (response.ok) {
        const myData = await response.json()
        console.log('The product was updated successfully', myData)

        message.success('The product was updated successfully')
        return response.data
      }
    } catch (error) {
      console.log('error', error.message)
      return error.message
    }
  }

  //api call for adding a product
  const addProduct = async (values) => {
    const myApi = 'http://localhost:5000/products/add-product'
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
    dispatch(SetLoader(false))
    if (myData) {
      message.success('The product was added successfully')
      getData()
      setShowProductForm(false)
    } else {
      message.error(myData.message)
    }
  }
  const rules = [
    {
      required: true,
      message: 'Required ',
    },
  ]
  useEffect(() => {
    if (selectedProduct && passProductValuesToFields) {
      formReference.current.setFieldsValue(selectedProduct)
    }
  }, [selectedProduct, passProductValuesToFields])

  const formReference = React.useRef(null)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  console.log(
    'the users details for value pass to the fetch function are',
    user
  )
  const onFinishFunc = async (values) => {
    console.log('the values in onFinish func are', values)
    values.seller = user._id

    console.log('values to submit', values)
    dispatch(SetLoader(true))
    // let response;
    try {
      if (selectedProduct && passProductValuesToFields) {
        values._id = selectedProduct._id
        const response = await editProduct(values)
        dispatch(SetLoader(false))
        message.success('The product was updated successfully')
        setShowProductForm(false)
        getData()
      } else {
        const response = await addProduct(values)
        const myData = await response.json()
        setShowProductForm(false)
        message.success(myData.message)
        dispatch(SetLoader(false))
      }
    } catch (error) {
      dispatch(SetLoader(false))
      console.log('error')
    }
  }
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      style={{ color: '#5E35B1' }}
      okText="Save"
      onOk={() => {
        formReference.current.submit()
      }}
      {...(selectedTab === '2' && { footer: false })}
    >
      <div className="text-primary" style={{ textAlign: 'center' }}>
        <h3>
          {selectedProduct && passProductValuesToFields
            ? 'Edit your product'
            : 'Add a new product'}
        </h3>
      </div>
      <Tabs
        defaultActiveKey="1"
        activeKey={selectedTab}
        onChange={(key) => setSelectedTab(key)}
        style={{ color: '#5E35B1', fontSize: '16px' }}
      >
        <Tabs.TabPane tab="General" key="1">
          <Form layout="vertical" ref={formReference} onFinish={onFinishFunc}>
            <Form.Item label="Name" name="name" rules={rules}>
              <Input type="text" />
            </Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={14}>
                <Form.Item label="Description" name="description" rules={rules}>
                  <TextArea type="text" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="Materials" name="materials" rules={rules}>
                  <TextArea type="text" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={4}>
                <Form.Item label="Price" name="price" rules={rules}>
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Suitable from age"
                  name="fromAge"
                  rules={rules}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Suitable till age"
                  name="tillAge"
                  rules={rules}
                >
                  <Input type="number" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Category" name="category" rules={rules}>
                  <select
                    name=""
                    id=""
                    style={{ height: '26px', width: '100%' }}
                  >
                    <option value="">Select</option>
                    <option value="furniture">Furniture</option>
                    <option value="strollers">Strollers</option>
                    <option value="clothes">Clothes</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Old price" name="oldPrice" rules={rules}>
                  <Input type="number" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Images" key="2" disabled={!selectedProduct}>
          <Images
            selectedProduct={selectedProduct}
            getData={getData}
            setShowProductForm={setShowProductForm}
          />
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  )
}

export default ProductsForm
