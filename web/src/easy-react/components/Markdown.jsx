import React from 'react';
import './Markdown.less';

const md = require('markdown-it')();

class Markdown extends React.Component {
    constructor(props) {
        super(props)
        this.state = {__html: props.text ? md.render(props.text) : ""}
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.text != this.props.text) {
            this.setState({__html: nextProps.text ? md.render(nextProps.text) : ""})
        }
    }
    render() {
        let {text, className, ...rest} = this.props
        return (
            <div {...rest} className={ "Markdown" + ((" " + className) || "") } dangerouslySetInnerHTML={ this.state }></div>
        )
    }
}

export default Markdown