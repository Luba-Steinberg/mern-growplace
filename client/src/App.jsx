import './App.css'
import MyLayout from './Pages/layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import Spinner from './components/Spinner'
import { useSelector } from 'react-redux'

function App() {
  const {loading} = useSelector(state => state.loaders)
  return (
    <>
      {loading && <Spinner />}
      <MyLayout></MyLayout>
    </>
  )
}

export default App
