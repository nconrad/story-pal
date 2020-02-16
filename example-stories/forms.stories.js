import React from 'react'
import styled from 'styled-components'

export const someComponent = () => (
  <Thing>
    I'm some other component
  </Thing>
)

export const inputTwo = () => (
  <Thing>
    <input type="text" placeholder="foobar" />
  </Thing>
)

export const inputThree = () => (
  <Thing>
    <input type="text" placeholder="foobar3" />
  </Thing>
)

export const inputFour = () => (
  <Thing>
    <input type="button" value="foobar4 button" />
  </Thing>
)

export const inputFive = () => (
  <Thing>
    <input type="text" placeholder="foobar5" />
  </Thing>
)

const Thing = styled.div`
  margin: 1rem;
`