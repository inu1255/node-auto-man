import React from 'react';
import './Explore.less';
import { connect } from 'easy-react/store'
import { Modal, Button, Layout, message } from 'antd';
import request from "../common/request";
import { Input, Table, Markdown } from 'easy-react/components'

const {Content} = Layout;

class Explore extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    columns =[{
        key: "title",
        dataIndex: "title",
        title: "标题"
    }, {
        key: "tools",
        title: "操作",
        render: (text, record) => {
            let i = 0
            let li = []
            li.push(record.uid ? <span key={ i++ }>已添加</span> : <Button key={ i++ } onClick={ () => this.setState({edit: record}) } type="primary">添加</Button>)
            const {user} = this.props
            if (user && user.self && user.self.id === record.create_by)
                li.push(<Button key={ i++ } onClick={ () => this.setState({edit: record}) } type="primary">修改</Button>)
            return li
        }
    },]
    query = (where) => {
        return request("/service/list", where)
    }
    setParams = async () => {
        const {edit} = this.state
        if (edit) {
            edit.sid = edit.id
            await request("/service/params", edit)
            edit.uid = true
            message.success("添加成功")
            this.setState({edit: false})
        }
    }
    render() {
        const {where, edit} = this.state
        return (
            <Layout className="Explore">
              <Layout className="content">
                <Content>
                  <Table query={ this.query } where={ where } columns={ this.columns }></Table>
                </Content>
              </Layout>
              <Modal title={ edit && edit.title } visible={ edit && true } onOk={ this.setParams } onCancel={ () => this.setState({edit: false}) }>
                { this.renderInput(edit) }
              </Modal>
            </Layout>
        )
    }
    renderInput(edit) {
        if (!edit) return
        let values = {}
        edit.values = edit.values || {}
        for ( let k in JSON.parse(edit.params) ) {
            let v = edit.values[k]
            values[k] = v
        }
        edit.values = values
        return (
            <Layout className="content">
              <Content className="view">
                <h1>{ edit.title }</h1>
                <Markdown text={ edit.desc }></Markdown>
                <Input onChange={ this.update } data={ edit } k="values" type="kv"></Input>
              </Content>
            </Layout>
        )
    }
}

Explore = connect(["user"])(Explore)

export default Explore