import React, { useEffect } from 'react'
import { message } from 'antd'
import ProductsForm from './productsForm'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import defaultImage from '../Pages/PagesComponents/homePagePic/cubes.jpg'
function Products() {
  const [passProductValuesToFields, setPassProductValuesToFields] =
    React.useState()
  const [selectedProduct, setSelectedProduct] = React.useState(null)
  const [showProductForm, setShowProductForm] = React.useState(false)
  const [products, setProducts] = React.useState([])
  const { user } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const getImageSrc = (product) => {
    if (product.image && product.image.data) {
      const blob = new Blob([new Uint8Array(product.image.data)], {
        type: 'image/jpeg',
      })
      return URL.createObjectURL(blob)
    } else {
      return defaultImage
    }
  }

  const getData = async () => {
    const myApi = 'http://localhost:5000/products/get-products'
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
      console.log(response)
      const myData = await response.json()
      dispatch(SetLoader(false))
      console.log('my data is', myData)
      console.log('the products are', myData.products)
      if (response.ok) {
        setProducts(myData.products)
        console.log('the products set by SetProducts are', products)
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(SetLoader(false))
      console.log('error', error.message)
    }
  }
  const deleteProduct = async (productId) => {
    console.log('values to pass to mingoDb is', productId)
    const myApi = `http://localhost:5000/products/delete-product/${productId}`
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      //in this case this line isn't needed: body: JSON.stringify(productId),
    }
    try {
      dispatch(SetLoader(true))
      const response = await fetch(myApi, options)
      message.success('The product was deleted')
      console.log(response)

      dispatch(SetLoader(false))
      getData()
    } catch (error) {
      dispatch(SetLoader(false))
      return error.message
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-sm mt-2 border-solid border-secondary mx-2"
          style={{
            background: '#26A69A',
            color: 'ButtonFace',
            fontSize: '18px',
          }}
          onClick={() => {
            setShowProductForm(true),
              setPassProductValuesToFields(false),
              setSelectedProduct(null)
          }}
        >
          Add a new product
        </button>
      </div>
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          passProductValuesToFields={passProductValuesToFields}
          getData={getData}
        ></ProductsForm>
      )}
      <section
        style={{ backgroundColor: '#eee' }}
        className="container py-5 my-3 col-10 d-flex justify-content-center"
      >
        <div
          className="container row d-flex justify-content-center"
          style={{ fontSize: '18px' }}
        >
          {products.map((product) => (
            <div key={product._id} className="row justify-content-center mb-3">
              {/* Render a card for each product */}
              {/* Use the product data dynamically */}
              {/* Use product.name, product.price, product.description, etc. */}
              <div className="col-md-12 col-xl-10">
                <div className="card shadow-0 border rounded-3">
                  <div className="card-body">
                    {/* Render product details dynamically */}
                    <div className="row">
                      {/* start an image design in the next line*/}
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
                            // src={WhiteBad}
                            src={getImageSrc(product)}
                            className="w-100"
                            // alt="White Bad"
                            style={{
                              width: '85px',
                              height: '165px',
                              borderRadius: '5px',
                            }}
                          />
                        </div>
                      </div>
                      {/* ended image design in the previous line */}
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <h5 className="text-uppercase">{product.name}</h5>
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
                          <span>Category: {product.category}</span>

                          <span>
                            <br />
                          </span>
                          <span className="text-primary"> • </span>
                          <span>Materials: {product.materials}</span>
                          <span>
                            <br />
                          </span>
                          <span className="text-primary"> • </span>

                          <span>Special traits: {product.description}</span>
                          <span>
                            <br />
                          </span>
                          <span className="text-primary"> • </span>
                          <span>From age {product.fromAge}</span>

                          <span>
                            <br />
                          </span>
                          <span className="text-primary"> • </span>
                          <span>Till age {product.tillAge}</span>
                          <span>
                            <br />
                          </span>
                        </div>
                        <div className="mb-2 text-muted small"></div>
                      </div>
                      <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div className="d-flex flex-row align-items-center mb-1">
                          <h4 className="mb-1 me-1">price: ${product.price}</h4>
                          <span className="text-danger">
                            <s>${product.oldPrice}</s>
                          </span>
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
                              setSelectedProduct(product)
                              deleteProduct(product._id)
                            }}
                          >
                            Delete a product
                            <DeleteOutlined style={{ marginLeft: '10px' }} />
                          </button>
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
                              setSelectedProduct(product)
                              setShowProductForm(true)
                              setPassProductValuesToFields(true)
                            }}
                          >
                            Edit a product
                            <EditOutlined style={{ marginLeft: '10px' }} />
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

export default Products
