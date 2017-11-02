import React from 'react';
import { connect } from 'easy-react/store'
import ReactDOM from 'react-dom'
import './Mo.less'

class Mo extends React.Component {
    static defaultProps = {
        size: 120,
        title: "Mo",
        total: 0,
        color: "#4CA6EB",
        loop: false
    }
    constructor(props) {
        super(props)
        this.percent = 0
        this.total = this.props.total
    }
    dasharray = () => {
        if (this.total < 1) {
            return ""
        }
        return this.total + 50 + ""
    }
    dashoffset = () => {
        if (this.total < 1) {
            return ""
        }
        return this.total * this.percent - this.total + ""
    }
    paly = () => {
        if (+this.percent >= 1) {
            if (this.props.loop)
                this.percent = 0
            else
                return
        }
        this.percent += 0.01
        this.g.setAttribute("stroke-dashoffset", "" + this.dashoffset())
        this.g.setAttribute("stroke-dasharray", "" + this.dasharray())
        setTimeout(this.paly, 2000 / 100)
    }
    componentDidMount() {
        var dom = ReactDOM.findDOMNode(this)
        this.g = dom.querySelector("g")
        this.total = this.total || dom.querySelector("text").getComputedTextLength()
        this.paly()
    }
    render() {
        const fontSize = this.props.size
        const len = this.props.title.length
        const width = len * fontSize;
        const margin = `${-fontSize/2}px ${-len/2*fontSize}px`
        return (
            <svg style={ { width, margin } } className="Mo" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
              <g strokeWidth="2" fillOpacity="1" strokeLinecap="" strokeDashoffset={ this.dashoffset() } fill="none" strokeDasharray={ this.dasharray() } strokeOpacity="1" stroke={ this.props.color }>
                <text x="0" y="120" style={ { fontSize } }>
                  { this.props.title }
                </text>
              </g>
            </svg>
        )
    }
}

Mo = connect()(Mo)

export default Mo