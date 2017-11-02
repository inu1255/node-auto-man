/**
 * Created Date: 2017-10-12 11:46:25
 * Author: inu1255
 * E-Mail: 929909260@qq.com
 */
import React from 'react';
import './UserRegister.less';
import { connect } from 'easy-react/store'
import { Route, Redirect, Link } from 'react-router-dom'
import { Form, Icon, Input, Button, Checkbox, Steps } from 'antd';
import './UserLogin.less';
import request from '../common/request'

const FormItem = Form.Item;
const Step = Steps.Step;

class UserRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { form, history } = this.props
        form.validateFields(async(err, data) => {
            if (err) {
                console.log(err);
                return
            }
            let index = this.getStep()
            if (!index) {
                await request("/user/send-code?title=" + data.title)
                this.state.title = data.title
                history.push({ search: "step=1" })
                return
            }
            if (index===1) {
                await request(`/user/send-code-check?title=${this.state.title}&code=${data.code}`)
                this.state.code = data.code
                history.push({ search: "step=2" })
                return
            }
            Object.assign(this.state, data)
            this.props.user.register(this.state)
        });
    }
    getStep(){
        if (!this.state.title) {
            return 0
        }
        const { location } = this.props
        let index = location.search.indexOf("step=")
        index = index < 0 ? 0 : location.search[index + 5]
        if (index>1 && !this.state.code) {
            index = 1
        }
        return +index
    }
    renderStep0(index) {
        const { form } = this.props
        const { getFieldDecorator } = form
        if (!index) {
            return (
                <div>
                    <FormItem>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入手机号/邮箱!' }],
                            initialValue: this.state.title,
                        })(
                            <Input size="large" prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="手机号/邮箱" />
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit">下一步</Button>
                    已有账号? <Link to="login">现在登录!</Link>
                </div>
            )
        }
    }
    renderStep1(index) {
        const { form } = this.props
        const { getFieldDecorator } = form
        if (index===1) {
            return (
                <div>
                    <FormItem>
                        {getFieldDecorator('code', {
                            rules: [{ required: true, message: '请输入验证码!' }],
                            initialValue: this.state.code,
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="验证码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">下一步</Button>
                        已有账号? <Link to="login">现在登录!</Link>
                    </FormItem>
                </div>
            )
        }
    }
    renderStep2(index) {
        const { form } = this.props
        const { getFieldDecorator } = form
        if (index===2) {
            return (
                <div>
                    <FormItem>
                        {getFieldDecorator('account', {
                            rules: [{ required: true, message: '请输入账号!' }],
                            initialValue: this.state.account,
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="账号" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                            initialValue: this.state.password,
                        })(
                            <Input size="large" prefix={<Icon type="lock" style={{ fontSize: 13 }} />} placeholder="密码" type="password" />
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">注册</Button>
                        已有账号? <Link to="login">现在登录!</Link>
                    </FormItem>
                </div>
            )
        }
    }
    render() {
        const index = this.getStep()
        return (
            <div className="UserRegisterComponent">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Steps current={+index}>
                        <Step title="邮箱/手机" />
                        <Step title="验证码" />
                        <Step title="密码" />
                    </Steps>
                    { this.renderStep0(index) }
                    { this.renderStep1(index) }
                    { this.renderStep2(index) }
                </Form>
            </div>
        )
    }
}

UserRegister = connect("user")(UserRegister)
UserRegister = Form.create()(UserRegister)

export default UserRegister