import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react'
import React from 'react'
import Products from '../Products/productsPage'
import Messages from '../Products/messagesPage'
// import { Button } from 'antd'
function Profile(user) {
  console.log(user)
  console.log(user.user)
  console.log(user.user.name)
  return (
    <div className="container-fluid " style={{ backgroundColor: '#eee' }}>
      <div className="container bg-light pb-2">
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="profile" title="Profile" className="mb-2"></Tab>
        </Tabs>
        <Card className="container">
          <Card.Body className="mb-3 pb-2">
            <Card.Title>
              Hi, <span className="text-uppercase">{user.user.name}</span>.
            </Card.Title>
            <Card.Text>
              Your last visit on GROWPLACE: {user.user.lastvisit}.
            </Card.Text>
          </Card.Body>
        </Card>
        <Tabs>
          <Tab eventKey="Sales" title="Sales" className="mb-2">
            <div className="d-flex justify-content-end">
              <Products></Products>
            </div>
          </Tab>
          <Tab eventKey="Orders" title="Messages" className="mb-2">
            <Messages></Messages>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
