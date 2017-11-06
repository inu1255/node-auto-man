import React from 'react';
import { Select, AutoComplete, Input as AntInput } from 'antd';
import './Input.less'

const TextArea = AntInput.TextArea;
const InputGroup = AntInput.Group;
const Option = Select.Option

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onChange = (v) => {
        if (v.target)
            v = v.target.value;
        const {data, k} = this.props;
        if (typeof data === "object")
            data[k] = v;
        if (this.props.onChange && this.props.onChange(v, k)) {
            return true
        }
        this.setState({});
    }
    update = () => {
        let kv = {}
        for ( let item of this.kv ) {
            if (item.k) {
                kv[item.k] = item.v
            }
        }
        this.onChange(kv)
    }
    render() {
        let {dataSource, data, k, type, title, ...rest} = this.props;
        const value = data[k];
        if (type === "select") {
            return this.renderSelect()
        }
        if (type === "kv") {
            return this.renderKv()
        }
        if (type === "textarea") {
            return <TextArea autosize={ {minRows: 3, maxRows: 18} } placeholder={ title } {...rest} value={ value } onChange={ this.onChange } />;
        }
        if (dataSource instanceof Array) {
            return (
                <AutoComplete onSelect={ this.onChange } onChange={ this.onChange } value={ value } dataSource={ dataSource }>
                  <AntInput onPressEnter={ this.props.onClick } {...rest} addonBefore={ title }></AntInput>
                </AutoComplete>
            )
        }
        return <AntInput onPressEnter={ this.props.onClick } {...rest} addonBefore={ title } value={ value } onChange={ this.onChange }></AntInput>;
    }
    renderSelect() {
        let {dataSource, data, k, title, ...rest} = this.props;
        const value = data[k];
        dataSource = dataSource || []
        if (!(dataSource instanceof Array) && typeof dataSource === "object") {
            let list = []
            for ( let k in dataSource ) {
                let v = dataSource[k]
                list.push({k, v})
            }
            dataSource = list
        }
        return (
            <InputGroup className="easy-select">
              <span className="ant-input-group-addon">{ title }</span>
              <Select style={ {width: "100%"} } {...rest} value={ value } onChange={ this.onChange }>
                { dataSource.map((item, i) => {
                      if (item instanceof Array) {
                          if (item.length > 1)
                              item = {k: item[0], v: item[1]}
                          else
                              item = {k: item[0], v: item[0]}
                      } else if (typeof item !== "object") {
                          item = {k: item, v: item}
                      }
                      return (
                          <Option key={ item.k } value={ item.v }>
                            { item.k }
                          </Option>
                      )
                  }) }
              </Select>
            </InputGroup>
        )
    }
    renderKv() {
        let {dataSource, data, k, grow, disabled} = this.props;
        const value = data[k];
        // 数组
        let kv = []
        // 哪些值已经在数组中
        let hasK = (k) => {
            for ( let item of kv ) {
                if (item.k === k) {
                    return true
                }
            }
        }
        if (grow) {
            kv = this.kv || kv
        } else {
            for ( let item of ( this.kv || []) ) {
                if (value && value[item.k]) {
                    kv.push(item)
                }
            }
        }
        for ( let k in value ) {
            if (!hasK(k)) {
                let v = value[k]
                kv.push({k, v})
            }
        }
        let x = kv[kv.length - 1]
        if (grow)
            if (!x || x.k || x.v) kv.push({})
        this.kv = kv || []
        dataSource = dataSource || {}
        return this.kv.map((item, i) => {
            return (
                <InputGroup className="easy-kv" compact key={ i }>
                  <Input disabled={ disabled } onChange={ this.update } data={ item } k="k" dataSource={ Object.keys(dataSource) }></Input>
                  <Input onChange={ this.update } data={ item } k="v" dataSource={ dataSource[item.k] || [] }></Input>
                </InputGroup>
            )
        })
    }
}

export default Input;