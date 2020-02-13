import React, {useState} from 'react'
import styled from 'styled-components'


const renderChildren = (children) =>
  <>{
    React.Children.map(children, c =>
      <TreeItem
        label={c.props.label}
        noCaret
        indent
        {...c.props}
      />
    )
  }</>


const TreeItem = (props) => {
  const {label, noCaret, indent, onClick} = props

  const [open, setOpen] = useState(false)

  const handleClick = (e) => {
    setOpen(prev => !prev)
    if (onClick) onClick(e)
  }

  return (
    <>
      <TreeItemRoot onClick={handleClick}>
        {!noCaret &&
          <>
            {open && <i className="material-icons">keyboard_arrow_down</i>}
            {!open && <i className="material-icons">keyboard_arrow_right</i>}
          </>
        }
        <span style={{paddingLeft: indent ? 34 : 0}}>
          {label}
        </span>
      </TreeItemRoot>
      {
        open && renderChildren(props.children)
      }
    </>
  )
}

const hoverColor = '#1ecad0'

const TreeItemRoot = styled.li`
  display: inline-flex;
  vertical-align: middle;
  padding: 2px 10px;
  line-height: 1.5;
  user-select: none;

  &:hover {
    background: #f2f2f2;
    cursor: pointer;
  }

  &:hover i {
    color: ${hoverColor}
  }

`

export default TreeItem