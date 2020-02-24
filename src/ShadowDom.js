import React, {createRef} from 'react';
import ReactDOM from 'react-dom';


export default class ShadowDom extends React.PureComponent {
  state = { init: false }

  constructor() {
    super()
    this.placeholder = createRef()
  }

  componentDidMount() {
    this.shadowRoot = this.placeholder.current.parentNode.attachShadow({
      mode: 'closed'
    })

    const sheet = new CSSStyleSheet()
    sheet.replaceSync(':host { all: initial; }')
    this.shadowRoot.adoptedStyleSheets = [...this.shadowRoot.adoptedStyleSheets, sheet]

    this.setState({init: true})
  }

  render() {
    if (!this.state.init)
      return <div ref={this.placeholder}></div>

    return ReactDOM.createPortal(this.props.children, this.shadowRoot)
  }
}
