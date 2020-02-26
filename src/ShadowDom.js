import React, {createRef} from 'react';
import { createPortal } from 'react-dom';
import { StyleSheetManager } from 'styled-components'

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

    return createPortal(
      <StyleSheetManager target={this.shadowRoot}>
        {this.props.children}
      </StyleSheetManager>,
      this.shadowRoot
    )
  }
}
