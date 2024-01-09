import MyNav from './PagesComponents/nav'
import MyFooter from './PagesComponents/footer'
import Home from './home'

function MyLayout() {
  return (
    <>
      <MyNav></MyNav>
      <Home></Home>
      <MyFooter></MyFooter>
    </>
  )
}

export default MyLayout
