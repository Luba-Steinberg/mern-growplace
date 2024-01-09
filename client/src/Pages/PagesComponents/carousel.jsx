import Bags from './homePagePic//bags.jpg'
import Bath from './homePagePic/bath.jpg'
import Hair from './homePagePic/hair.jpg'

import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit'

function MyCarousel() {
  return (
    <div style={{background:"#EDE7F6"}}>
    <div className="h-25 container col-3" style={{background:"#EDE7F6"}}>
      <MDBCarousel showControls fade>
        <MDBCarouselItem
          className="w-100 d-block active"
          style={{ height: '225px', padding:"3px", borderRadius:"15px"}}
          itemId={1}
          src={Bags}
          alt="Bags"
        >

        </MDBCarouselItem>

        <MDBCarouselItem
          className="w-100  d-block"
          style={{ height: '225px', padding:"3px", borderRadius:"15px" }}
          itemId={2}
          src={Bath}
          alt="Bath"
        >
        </MDBCarouselItem>

        <MDBCarouselItem
          className="w-100 d-block"
          style={{ height: '225px', padding:"3px", borderRadius:"15px" }}
          itemId={3}
          src={Hair}
          alt="Hair"
        >
        </MDBCarouselItem>

      </MDBCarousel>
    </div>
    </div>
  )
}
export default MyCarousel
