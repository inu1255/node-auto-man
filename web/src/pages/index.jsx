/**
 * Created Date: 2017-10-12 10:04:39
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-10-20 14:34:38
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
import React from 'react'
import { Switch } from 'react-router-dom'
import { Router } from 'react-router'
import Route from '../components/Route'
import User from './User'
import DashBoard from './DashBoard'
import Explore from './Explore'
import Create from './Create'
import NotFound from './NotFound'
import './index.less'
import Header from '../components/Header'
import his from '../common/history'
import { Mo } from "easy-react/components";

const Index = () => (
  <div className="index">
    <Mo title="千与签到" total={ 0 }></Mo>
  </div>
)

const App = () => {
  return (
    <Router history={ his }>
      <div>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={ Index } />
          <Route path="/user" component={ User } />
          <Route auth path="/dashboard" component={ DashBoard } />
          <Route auth path="/explore" component={ Explore } />
          <Route auth path="/create" component={ Create } />
          <Route component={ NotFound } />
        </Switch>
      </div>
    </Router>
  )
}

export default App