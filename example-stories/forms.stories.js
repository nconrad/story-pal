import React from 'react'
import styled from 'styled-components'

export const someInput = () => (
  <Thing>
    I'm some other component
  </Thing>
)

const Thing = styled.div`
  margin: 1rem;
`


export const inputTwo = () => (
  <div>
    <input type="text" placeholder="foobar" />
  </div>
)
