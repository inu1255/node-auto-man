/**
 * Created Date: 2017-10-20 14:16:41
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 */
import React from 'react';
import './Header.less';
import { connect } from 'easy-react/store'
import { Menu, Icon } from 'antd';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const {location} = this.props
        return (
            <div className="Header">
              <Menu selectedKeys={ [location.pathname] } mode="horizontal">
                <Menu.Item key="/">
                  <Link to="/">
                  <Icon type="home" />千与签到</Link>
                </Menu.Item>
                <Menu.Item key="/dashboard">
                  <Link to="/dashboard">
                  <Icon type="team" />个人中心</Link>
                </Menu.Item>
                <Menu.Item key="/explore">
                  <Link to="/explore">
                  <Icon type="compass" />发现</Link>
                </Menu.Item>
                <Menu.Item key="/create">
                  <Link to="/create">
                  <Icon type="create" />创建服务</Link>
                </Menu.Item>
                { this.renderLogin() }
              </Menu>
            </div>
        )
    }
    renderLogin() {
        const {user} = this.props
        if (user.logined && user.self) {
            return [
                <Menu.Item className="right" key="logout">
                  <a onClick={ user.logout }>
                    <Icon type="logout" />注销</a>
                </Menu.Item>,
                <Menu.Item className="right" key="name">
                  { user.self.name || user.self.account }
                </Menu.Item>,
            ]
        }
    }
}

Header = connect("user")(Header)
Header = withRouter(Header)

export default Header