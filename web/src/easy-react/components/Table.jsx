import React from 'react';
import { Table as AntTable } from 'antd';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            where: {page: 0},
            dataSource: []
        }
    }
    query = async (body, force) => {
        if (!this.props.query) return
        let where = this.state.where
        body = body || {}
        for ( let k in body ) {
            if (where[k] !== body[k]) {
                force = true;
                where[k] = body[k]
            }
        }
        if (force) {
            let dataSource = await this.props.query(where)
            let columns
            if (dataSource[0]) {
                columns = Object.keys(dataSource[0]).map(x => ({title: x, dataIndex: x, key: x}))
                if (!dataSource[0].id) {
                    for ( var i = 0; i < dataSource.length; i++ ) {
                        dataSource[i].id = i;
                    }
                }
            }
            this.setState({dataSource, where, columns})
        }
    }
    componentDidMount() {
        this.query(this.props.where, true)
    }
    componentWillReceiveProps(nextProps) {
        this.query(nextProps.where)
    }
    changePage = (p) => {
        if (this.props.onChange) {
            this.props.onChange.apply(this, arguments)
        }
        this.query({page: p.current})
    }
    render() {
        let {dataSource, columns} = this.state
        const {data, ...rest} = this.props
        if (data) {
            dataSource = []
            columns = []
            if (data instanceof Array) {
                columns = columns = Object.keys(data[0]).map(x => ({title: x, dataIndex: x, key: x}))
                dataSource = data;
            } else if (typeof data === "object") {
                columns = [{title: "变量名", key: "k", dataIndex: "k"}, {title: "值", key: "v", dataIndex: "v"}]
                for ( let k in data ) {
                    let v = data[k]
                    dataSource.push({id: k, k, v})
                }
            }
        }
        return (
            <AntTable rowKey="id" {...rest} onChange={ this.changePage } dataSource={ dataSource } columns={ this.props.columns || columns }></AntTable>
        )
    }
}

export default Table