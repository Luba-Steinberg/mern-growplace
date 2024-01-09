import MyContent from './PagesComponents/content'
import MyCarousel from './PagesComponents/carousel'


function Home(props) {
  return (
    <>
      <MyContent
      ></MyContent>
      {/* <SalesPage></SalesPage> */}
      {/* <OrdersPage></OrdersPage> */}
      {/* <WishlistPage></WishlistPage> */}
      <MyCarousel></MyCarousel>
    </>
  )
}
export default Home
