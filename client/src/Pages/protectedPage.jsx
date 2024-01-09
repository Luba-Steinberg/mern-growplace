import { message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../redux/loadersSlice'
import { SetUser } from '../redux/usersSlice'

function ProtectedPage({ children }) {
  const { user } = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const GetCurrentUser = async () => {
    const checkToken = localStorage.getItem('token')
    console.log('the token exists in the local storage and it is ', checkToken)
    const myApi = 'http://localhost:5000/get-current-user'
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    console.log(myApi, options)
    try {
      dispatch(SetLoader(true))
      const response = await fetch(myApi, options)
      dispatch(SetLoader(false))
      console.log('the response from get-current-user is ', response)
      const MyNewResponse = await response.json()
      console.log(
        'the jsoned response from get-current-user is ',
        MyNewResponse
      )
      return MyNewResponse
    } catch (error) {
      return error.message
    }
  }
  const validateToken = async () => {
    try {
      const myResponse = await GetCurrentUser()
      console.log(
        'data that was got from getCurrentUser function is ',
        myResponse
      )
      const checkToken = localStorage.getItem('token')
      console.log(
        'the token exists in the local storage and it is ',
        checkToken,
        'and the response is',
        myResponse
      )

      if (myResponse.success) {
        console.log(
          'after checking the myResponse.success the token exists in the local storage and it is ',
          checkToken,
          'and the response is',
          myResponse
        )
        dispatch(SetUser(myResponse.data))
      } else {
        navigate('/login')
        message.error('please log in to continue')
      }
    } catch (error) {
      dispatch(SetLoader(false))
      navigate('/login')
      console.log('error', error.message)
      message.error('please log in to continue')
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken()
    } else {
      navigate('login')
    }
  }, [])
  return (
    <div>
      {user && (
        <div>
          {React.isValidElement(children) &&
            React.cloneElement(children, { user })}
        </div>
      )}
    </div>
  )
}

export default ProtectedPage
