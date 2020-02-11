import React from 'react'
import styled from 'styled-components'

const NavBar = () => {

  const onSearch = (e) => {
    console.log(e.target.value)
  }


  return (
    <Nav>
      <Logo>
        Story<span>Pal</span>
      </Logo>

      <Search type="text" onChange={e => onSearch(e)} placeholder="Search" />
    </Nav>
  )
}

const Logo = styled.h2`
  margin: 10px 20px;
  color: #444;
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