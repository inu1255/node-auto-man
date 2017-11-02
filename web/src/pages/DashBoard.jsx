import React from 'react';
import './DashBoard.less';
import { connect } from 'easy-react/store'
import { Modal, Button, Layout, Menu, message } from 'antd';
import request from "../common/request";
import moment from 'moment'
import { Input, Markdown, Table } from 'easy-react/components'

const {Content, Sider} = Layout;
const {Item} = Menu

class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            where: {}
        }
    }
    columns =[{
        key: "title",
        dataIndex: "title",
        title: "标题"
    }, {
        key: "create_at",
        dataIndex: "create_at",
        title: "上次执行",
        render: (text) => {
            if (!text) {
                return "尚未执行"
            }
            return moment(text).fromNow()
        }
    }, {
        key: "msg",
        dataIndex: "msg",
        title: "执行结果"
    }, {
        key: "tools",
        title: "操作",
        render: (text, record) => {
            let list = []
            let index = 0
            list.push(<Button onClick={ () => this.setState({edit: record}) } type="primary" key={ index++ }>修改</Button>)
            if (record.active) {
                list.push(<Button onClick={ this.active.bind(this, record) } key={ index++ }>禁用</Button>)
                list.push(<Button onClick={ this.run.bind(this, record) } key={ index++ }>立即执行</Button>)
            // list.push(<Button key={ index++ }>查看记录</Button>)
            }
            else
                list.push(<Button onClick={ this.active.bind(this, record) } key={ index++ }>启用</Button>)
            return list
        }
    },]
    query = (where) => {
        return request("/service/mine", where)
    }
    clickMenu = ({key}) => {
        switch (key) {
        case "active":
            this.state.where.active = true;
            this.setState({})
            break;
        case "inactive":
            this.state.where.active = false;
            this.setState({})
            break;
        default:
        }
    }
    setParams = async () => {
        const {edit} = this.state
        edit.sid = edit.id
        await request("/service/params", edit)
        this.setState({edit: false})
    }
    run = async (record) => {
        let data = await request("/service/run?sid=" + record.id)
        Object.assign(record, data)
        message.success("执行成功")
        this.setState({})
    }
    async active(record) {
        await request("/service/params", {sid: record.id, active: +(!record.active)})
        this.refs.table.query(null, true)
    }
    render() {
        const {data, edit, where} = this.state
        return (
            <Layout className="DashBoard">
              <Sider width={ 200 }>
                <Menu onClick={ this.clickMenu } defaultSelectedKeys={ ["active"] } mode="inline">
                  <Item key="active">使用中</Item>
                  <Item key="inactive">未启用的</Item>
                </Menu>
              </Sider>
              <Layout className="content">
                <Content>
                  <Table ref="table" query={ this.query } where={ where } columns={ this.columns }></Table>
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
        edit.values = typeof edit.values === "object" ? edit.values : JSON.parse(edit.values || "{}")
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

DashBoard = connect(["user"])(DashBoard)

export default DashBoard