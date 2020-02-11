import React from 'react'
import styled from 'styled-components'



const Tree = (props) => {
  return (
    <TreeRoot>
      {props.children}
    </TreeRoot>
  )
}

const TreeRoot = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0px;
`

export default Tree