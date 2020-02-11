import React from 'react'
import styled from 'styled-components'


const TreeItem = ({label}) => {

  const onClick = (label) => {
    console.log('clicked', label)
  }

  return (
    <TreeItemRoot onClick={() => onClick(label)}>
      <i className="material-icons">keyboard_arrow_right</i>
      <span>{label}</span>
    </TreeItemRoot>
  )
}

const TreeItemRoot = styled.li`
  display: inline-flex;
  vertical-align: middle;
  padding: 2px 10px;
  border-left: 4px solid rgba(0, 0, 0, 0);
  line-height: 1.5;

  &:hover {
    background: #f2f2f2;
    border-left: 4px solid #33c3ff;
    cursor: pointer;
  }
`

export default TreeItem