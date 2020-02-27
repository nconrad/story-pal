import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const SearchItem = (props) => {
  const {matches, item, nodeId, onClick} = props
  const {name, path} = item

  const getHighlighted = () => {
    let nameMarkup = name
    let pathMarkup = path

    for (const match of matches) {
      const { key } = match

      if (key == 'name') {
        for (const [s, e] of matches[0].indices) {
          nameMarkup = name.slice(0, s) + `<b class="primary">${name.slice(s, e+2)}</b>` + name.slice(e+2)
        }
      } else if (key == 'path') {
        for (const [s, e] of matches[0].indices) {
          pathMarkup = path.slice(0, s) + `<b class="primary">${path.slice(s, e+2)}</b>` + path.slice(e+2)
       }
      }
    }

    return `${nameMarkup} <small class="muted">${pathMarkup}</small>`
  }

  return (
    <Linky to={item.fullPath}>
      <ItemChoice
        dangerouslySetInnerHTML={{__html: getHighlighted()}}
        className={props.focused == nodeId && 'active'}
        onClick={() => onClick(item, nodeId)}
      />
    </Linky>

  )
}

let Linky = styled(Link)`
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    color: initial;
    text-decoration: none;
  }
`

const ItemChoice = styled.div`
  padding: .5rem;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }

  &.active {
    background-color: #f2f2f2;
  }

  & > small {
    padding-left: .2rem;
  }
`

export default SearchItem