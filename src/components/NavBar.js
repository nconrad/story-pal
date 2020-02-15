import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const NavBar = () => {

  const onSearch = (e) => {
    console.log(e.target.value)
  }

  return (
    <Nav>
      <Link to="/" style={{textDecoration: 'none'}}>
        <Logo>
          Story<span>Pal</span>
        </Logo>
      </Link>

      <Search type="text" onChange={e => onSearch(e)} placeholder="Search" />
    </Nav>
  )
}

const Logo = styled.h2`
  margin: 10px 20px;
  color: #333;
  span {
    color: #1ecad0;
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

const Search = styled.input`
  margin: 10px auto;
  color: #444;
  width: 60%;
  display: flex;
  padding-left: 5;

  span {
    color: #1ecad0;
  }
`


export default NavBar