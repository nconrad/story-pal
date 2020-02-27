import React, { useState, useEffect} from 'react'
import styled from 'styled-components'

import SearchItem from './SearchItem'


const SearchMenu = (props) => {
  const {results, onClick, onEnter} = props

  const [focusIdx, setFocusIdx] = useState(0)


  const onKeyDown = (evt) => {
    if (evt.key == 'Enter') {
      onEnter(results[focusIdx].item)
    } else if (evt.key == 'ArrowUp') {
      setFocusIdx(f => f - 1 < 0 ? 0 : f - 1)
    } else if (evt.key == 'ArrowDown') {
      setFocusIdx(f =>
        f + 1 >= results.length ? results.length - 1 :  f + 1
      )
    }
  }


  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  })


  return (
    <SearchMenuRoot>
      {
        results.map((obj, i) =>
          <SearchItem
            key={i}
            matches={obj.matches}
            item={obj.item}
            focused={focusIdx}
            nodeId={i}
            onClick={item => onClick(item)}
          />
        )
      }
    </SearchMenuRoot>
  )
}

const SearchMenuRoot = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: calc(100% - 4px);
  background-color: #fff;
  border: 2px solid #f2f2f2;

  &:empty {
    display: none;
  }

  & .active {
    background-color: #f2f2f2;
  }
`

export default SearchMenu
