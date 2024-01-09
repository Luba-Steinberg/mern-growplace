import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import { message } from 'antd'
import { WechatOutlined } from '@ant-design/icons'
import defaultImage from '../Pages/PagesComponents/homePagePic/cubes.jpg'
import MessageForm from '../Products/MessageForm'

function FurniturePage() {
  const dispatch = useDispatch()
  const [furnitureProducts, setFurnitureProducts] = React.useState([])
  const [selectedProduct, setSelectedProduct] = React.useState(null)
  const [showMessagesForm, setShowMessagesForm] = React.useState()
  const {user} = useSelector((state) => state.users)
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
  const getDataForCategory = async () => {
    const myApi = `http://localhost:5000/products/get-products`
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ category: 'furniture', user: user._id }),
    }
    try {
      dispatch(SetLoader(true))
      console.log(myApi, options, user)
      const response = await fetch(myApi, options)

      console.log(response)
      const myData = await response.json()
      dispatch(SetLoader(false))
      console.log('my data is', myData)
      console.log('the products are', myData.products)
      if (response.ok) {
        setFurnitureProducts(myData.products)
        console.log(
          'the products set by SetFurnitureProducts are',
          furnitureProducts
        )
      } else {
        dispatch(SetLoader(false))
        message.error(myData.message)
      }
    } catch (error) {
      dispatch(SetLoader(false))
      console.log('error', error.message)
    }
  }
  React.useEffect(() => {
    getDataForCategory()
  }, [])

  return (
    <div className="row" style={{ backgroundColor: '#eee' }}>
      <section
        style={{ backgroundColor: '#eee' }}
        className="container py-5 my-3 col-10 d-flex justify-content-center"
      >
        <div
          className="container row d-flex justify-content-center"
          style={{ fontSize: '18px' }}
        >
          {furnitureProducts.map((product) => (
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
                            src={getImageSrc(product)}
                            className="w-100"
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
                        <h5 className="text-uppercase">{product.name} </h5>
                        
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
                          <h6 className="text-uppercase text-center">Advertised by: {product.seller.name}</h6>
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
                              setShowMessagesForm(true)
                            }}
                          >
                            Send a message to the seller
                            <WechatOutlined style={{ marginLeft: '10px' }} />
                          </button>
                        </div>
                        {showMessagesForm && (
                          <MessageForm
                            showMessagesForm={showMessagesForm}
                            setShowMessagesForm={setShowMessagesForm}
                            selectedProduct={selectedProduct}
                          ></MessageForm>
                        )}
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
export default FurniturePage
