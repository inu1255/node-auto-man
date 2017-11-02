/**
 * Created Date: 2017-10-12 10:06:42
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-10-15 20:21:12
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
import React from 'react'
import Route from '../components/Route'
import Login from './UserLogin'
import Register from './UserRegister'
import { connect } from 'easy-react/store'
import { Button } from 'antd'

const Index = connect("user")(({user}) => {
    return (
        <div>
            <Button onClick={()=>user.login("inu1255","123456")}>user</Button>
        </div>
    )
})

export default ({ match }) => (
    <div>
        <Route auth exact path={`${match.url}`} component={Index}/>
        <Route path={`${match.url}/login`} component={Login}/>
        <Route path={`${match.url}/register`} component={Register}/>
    </div>
)