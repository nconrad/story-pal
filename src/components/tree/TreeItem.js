import React, {useState} from 'react'
import { useParams, useLocation } from 'react-router-dom'
import styled from 'styled-components'


const renderChildren = (children) =>
  <>{
    React.Children.map(children, (c, i) =>
      <TreeItem
        label={c.props.label}
        noCaret
        indent
        {...c.props}
      />
    )
  }</>


const TreeItem = (props) => {
  const {nodeId, label, noCaret, indent, onClick} = props

  const {pathname} = useLocation();
  const [open, setOpen] = useState(false)

  const handleClick = (e) => {
    setOpen(prev => !prev)
    if (onClick) onClick(e)
  }

  return (
    <>
      <TreeItemRoot
        onClick={handleClick}
        className={`${pathname == nodeId && 'active'} ${props.children && 'is-root'}`}
      >
        {!noCaret &&
          <Icon className={`material-icons ${open && 'active'}`}>
            keyboard_arrow_right
          </Icon>
        }
        <span style={{paddingLeft: indent ? 30 : 0}}>
          {label}
        </span>
      </TreeItemRoot>

      { open && renderChildren(props.children) }
    </>
  )
}

const activeColor = '#1ecad0'

const TreeItemRoot = styled.li`
  display: inline-flex;
  vertical-align: middle;
  padding: 2px 10px;
  line-height: 1.5;
  user-select: none;
  position: relative;

  &:hover {
    background: #f2f2f2;
    cursor: pointer;
  }

  &:hover i {
    color: ${activeColor}
  }

  &.active {
    font-weight: 800;
  }

  &:before {
    content: '';
    color: #663399;
    border-radius: 100%;
    transform: scale(0);
    position: absolute;
    left: calc(2.5rem - 1rem);
    top: .7rem;
  }

  &:hover:not(.active):not(.is-root):before {
    height: 8px;
    width: 8px;
    background-color: ${activeColor};
    transition: transform .2s;
    transform: scale(1);
  }

  &.active:before {
    height: 8px;
    width: 8px;
    background-color: #666;
    transition: transform .2s;
    transform: scale(1);
  }
`

const Icon = styled.i`
  -webkit-transition: transform .15s;
  transition: transform .15s;

  &.active {
    transform: rotate(90deg);
  }
`


export default TreeItem