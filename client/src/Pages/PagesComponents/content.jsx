import Furniture from './homePagePic/furniture.jpg'
import Strollers from './homePagePic/strollers.jpg'
import Clothing from './homePagePic/clothing.jpg'
import Accessories from './homePagePic/accessories.jpg'
import FurniturePage from '../furniture.jsx'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import StrollersPage from '../strollers.jsx'
import Profile from '../profile.jsx'

function MyContent(props) {
  console.log('hi, content', props.currentPage)

  return (
    <main className="container-fluid" style={{ backgroundColor: '#B39DDB' }}>
      <div className="row px-5 g-15 d-flex flex-wrap">
        <div className="col-sm-2 m-15 col-md pe-md-4">
          <div className="card mt-5 mb-5 ">
            <div className="card-header text-center">Furniture</div>
            <div className="card-body text-center">
              <img
                src={Furniture}
                alt="cube"
                width="120"
                height="120"
                style={{ borderRadius: 120 / 2 }}
                className="d-inline-block align-text-top"
              />
              <p>Find a comfortable pattern for your baby, at great prices.</p>
              <div className="card-footer">
                {/* <Link to="/furniture" onClick={() => props.setCurrentPage(3)}> */}
                Best quality in any quantity
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2 m-15 col-md pe-md-4">
          <div className="card mt-5  mb-5">
            <div className="card-header text-center">Strollers</div>
            <div className="card-body text-center">
              <img
                src={Strollers}
                alt="cube"
                width="120"
                height="120"
                style={{ borderRadius: 120 / 2 }}
                className="d-inline-block align-text-top"
              />
              <p>
                All kinds of strollers, both for journies and everyday
                situations
              </p>
              <div className="card-footer">
                {/* <Link to="/strollers" onClick={() => props.setCurrentPage(4)}> */}
                Well-known trends and suppliers
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2 m-15 col-md pe-md-4">
          <div className="card mt-5 mb-5">
            <div className="card-header text-center">Clothes</div>
            <div className="card-body text-center">
              <img
                src={Clothing}
                alt="cube"
                width="120"
                height="120"
                style={{ borderRadius: 120 / 2 }}
                className="d-inline-block align-text-top"
              />
              <p>
                Pleasant and beautiful garments for all ages, designed
                especially for you
              </p>
              <div className="card-footer">
                {/* <Link to="/clothes" onClick={() => props.setCurrentPage(5)}> */}
                Any color or clothing, for any occasions
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-2 m-15 col-md pe-md-4">
          <div className="card mt-5  mb-5">
            <div className="card-header text-center">
              Accessories and occupation
            </div>
            <div className="card-body text-center">
              <img
                src={Accessories}
                alt="cube"
                width="120"
                height="120"
                style={{ borderRadius: 120 / 2 }}
                className="d-inline-block align-text-top"
              />
              <p>Purchase accerrosries for different cases and activities.</p>
              <div className="card-footer">
                {/* <Link
                    to="/accessories"
                    onClick={() => props.setCurrentPage(6)}
                  > */}
                Numerous types of accessories
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
export default MyContent
