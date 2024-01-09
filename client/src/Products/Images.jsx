import Upload from 'antd/es/upload/Upload'
import { Button, message } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
function Images({ selectedProduct, getData, setShowProductForm }) {
  const [file, setFile] = React.useState()
  const formData = new FormData()
  formData.append('file', file)
  const dispatch = useDispatch()
  const upload = async () => {
    console.log('file to be sent', file)
    console.log('type of file', typeof file)
    console.log('id to be sent', selectedProduct._id)
    console.log('type of id', typeof selectedProduct._id)
    const myApi = `http://localhost:5000/products/upload-image-to-product/${selectedProduct._id}`
    const options = {
      method: 'POST',
      headers: {
        //No need to set Content-Type for FormData to prevent j-son expectations on server side
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }
    try {
      dispatch(SetLoader(true))
      console.log('file to be sent to api right now', file)
      console.log('id to be sent to api right now', selectedProduct._id)
      const response = await fetch(
        myApi,
        options
        // file
      )
      dispatch(SetLoader(false))
      console.log('The response for uploading image is', response)
      if (response.ok) {
        message.success('The image was uploaded successfully')
        getData()
      }
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message)
    }
  }
  return (
    <div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file)
        }}
      >
        <Button type="dashed">Upload Image</Button>
      </Upload>

      <div className="d-flex justify-content-end gap-5 mt-4">
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false)
          }}
        >
          Cancel
        </Button>

        <Button
          type="default"
          onClick={() => {
            setShowProductForm(false)
            upload()
          }}
          disabled={!file}
        >
          Upload
        </Button>
      </div>
    </div>
  )
}

export default Images
