import React from 'react'
import styled from 'styled-components'

export const componentOne = () => (
  <Thing>
    I'm some other component
  </Thing>
)

export const componentTwo = () => (
  <Thing2>
    I'm some component 2
  </Thing2>
)

export const inputThree = () => (
  <Thing3>
    <input type="text" placeholder="foobar3" />
  </Thing3>
)

export const inputFour = () => (
  <Thing3>
    <input type="button" value="foobar4 button" />
  </Thing3>
)

export const inputFive = () => (
  <Thing3>
    <input type="text" placeholder="foobar5" />
  </Thing3>
)

const Thing = styled.div`
  margin: 1rem;
  color: red;
  font-weight: bold;
`

const Thing2 = styled.div`
  margin: 1rem;
  color: blue;
  font-family: 'Courier New', Courier, monospace;
`


const Thing3 = styled.div`
    margin: 5rem;
`