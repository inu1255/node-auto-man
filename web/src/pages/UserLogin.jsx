/**
 * Created Date: 2017-10-12 11:46:17
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 * -----
 * Last Modified: 2017-10-20 15:53:24
 * Modified By: inu1255
 * -----
 * Copyright (c) 2017 gaomuxuexi
 */
import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'easy-react/store'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './UserLogin.less';

const FormItem = Form.Item;

class UserLogin extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async(err, data) => {
            if (err) {
                console.log(err);
                return
            }
            this.props.user.login(data)
        });
    }
    render() {
        const { form } = this.props
        const { getFieldDecorator } = form
        return (
            <div className="UserLoginComponent">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入用户名/手机号/邮箱!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名/手机号/邮箱" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>记住密码</Checkbox>
                        )}
                        <Link className="login-form-forgot" to="register">忘记密码?</Link>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                        没有账号? <Link to="register">现在注册!</Link>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

UserLogin = connect(["user"])(UserLogin)
UserLogin = Form.create()(UserLogin)

export default UserLogin