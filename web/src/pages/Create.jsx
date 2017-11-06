import React from 'react';
import './Create.less';
import { connect } from 'easy-react/store'
import { Button, Layout, message } from 'antd';
import request from "../common/request";
import { Input, Markdown, Table } from 'easy-react/components'
import HEADERS from 'easy-react/data/headers'

const {Content} = Layout;

class Create extends React.Component {
    constructor(props) {
        super(props)
        this.state = {edit: {}}
    }
    componentDidMount() {
        this.info()
    }
    info = async (props) => {
        const {match} = props || this.props
        if (match.params.id) {
            let edit = await request("/service/info?id=" + match.params.id)
            this.state.edit = edit
        } else {
            this.state = {
                edit: {
                    "title": "poro签到得流量",
                    "desc": "**需要Cookie**\n\n使用步骤\n\n1. 访问[此链接](http://www.poro.top/user)并登录\n2. 拿到Cookie\n3. 填入下面输入框中",
                    "url": "http://www.poro.top/user/checkin",
                    "body": "",
                    "method": "POST",
                    "headers": {"Cookie": "$COOKIE"},
                    "params": {"$COOKIE": "登录后得到的Cookie"},
                    "checks": {"ret[^\\d]+1[^\\d]": "签到成功"}
                }
            }
        }
        this.setValues()
        this.setState({})
    }
    submit = async () => {
        const {edit} = this.state
        const {match} = this.props
        if (match.params.id) {
            edit.id = match.params.id
            await request("/service/update", edit)
            message.success("添加成功")
        } else {
            await request("/service/create", edit)
            message.success("修改成功")
        }
    }
    test = async () => {
        const {edit} = this.state
        let testout = await request("/service/test", edit)
        this.setState({testout})
    }
    update = (v, k) => {
        if (k === "params") {
            this.setValues()
        }
        return this.setState({})
    }
    setValues() {
        const {edit} = this.state
        let values = {}
        edit.values = edit.values || {}
        for ( let k in edit.params ) {
            let v = edit.values[k]
            values[k] = v
        }
        edit.values = values
    }
    render() {
        const {edit, testout} = this.state
        const {match} = this.props
        return (
            <Layout className="Create">
              <Layout className="content">
                <Content>
                  <Input disabled={ match.params.id } onChange={ this.update } title="标题" data={ edit } k="title"></Input>
                  <Input onChange={ this.update } title="介绍" data={ edit } k="desc" type="textarea"></Input>
                  <Input onChange={ this.update } title="URL" data={ edit } k="url"></Input>
                  <Input onChange={ this.update } title="METHOD" data={ edit } k="method" type="select" dataSource={ ["POST", "GET"] }></Input>
                  <span>header</span>
                  <Input onChange={ this.update } data={ edit } k="headers" type="kv" grow dataSource={ HEADERS }></Input>
                  <span>body</span>
                  <Input onChange={ this.update } data={ edit } k="body" type="textarea"></Input>
                  <span>参数用于替换body/header中的占位符(左边占位符/参数介绍)</span>
                  <Input onChange={ this.update } data={ edit } k="params" type="kv" grow></Input>
                  <span>检查项目(左边正则表达式/右边检查结果)</span>
                  <Input onChange={ this.update } data={ edit } k="checks" type="kv" grow></Input>
                  <Button onClick={ this.submit }>提交</Button>
                </Content>
              </Layout>
              <Layout className="content">
                <Content className="view">
                  <h1>{ edit.title }</h1>
                  <Markdown text={ edit.desc }></Markdown>
                  <Input onChange={ this.update } data={ edit } k="values" type="kv"></Input>
                  <Button onClick={ this.test }>测试</Button>
                  { testout ? <span>测试结果</span> : null }
                  { testout ? <Table pagination={ false } data={ testout }></Table> : null }
                </Content>
              </Layout>
            </Layout>
        )
    }
}

Create = connect(["user"])(Create)

export default Create