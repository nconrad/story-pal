import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import styled from 'styled-components'

import SearchBox from './SearchBox/SearchBox'

const NavBar = (props) => {
  const {searchData} = props

  const history = useHistory()

  // Note: the searchbox has links, but needs to
  // update history on enter keypress as well
  const onEnterKey = item => {
    history.push(item.fullPath)
  }

  return (
    <Nav>
      <Link to="/" style={{textDecoration: 'none'}}>
        <Logo>
          Story<span>Pal</span>
        </Logo>
      </Link>

      <SearchBox
        items={searchData}
        onEnterKey={item => onEnterKey(item)} />
    </Nav>
  )
}

const Logo = styled.h2`
  text-decoration: underline;
  text-decoration-color: #00999e;
  margin: 10px 20px;
  color: #333;
  span {
    color: #6000e0;
  }
`

const Nav = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  background: #fff;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #eee;
  z-index: 9000;
`



export default NavBar