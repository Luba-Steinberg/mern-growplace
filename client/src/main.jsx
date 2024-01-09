import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import { ConfigProvider } from 'antd'
import { FormProvider } from 'antd/es/form/context'
import store from './redux/store'
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider
    store={store}
    >
    <ConfigProvider>
      <App />
    </ConfigProvider>
     </Provider>
  // </React.StrictMode>
)
