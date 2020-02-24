import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import SearchBox from './SearchBox'

const NavBar = (props) => {
  const {searchData} = props

  return (
    <Nav>
      <Link to="/" style={{textDecoration: 'none'}}>
        <Logo>
          Story<span>Pal</span>
        </Logo>
      </Link>

      <SearchBox items={searchData} />
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