import React, { useState, useEffect, useRef} from 'react'
import {unmountComponentAtNode} from 'react-dom'
import styled from 'styled-components'

import SearchItem from './SearchItem'


const SearchMenu = (props) => {
  const {results, onNavigate} = props

  const ref = useRef()
  const [focusIdx, setFocusIdx] = useState(0)


  const onArrowKey = (e) => {
    if (e.keyCode == 38) { // arrow up
      setFocusIdx(f => f - 1)
    } else if (e.keyCode == 40) { // arrow down
      setFocusIdx(f => f + 1)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onArrowKey, true)

    return () => {
      document.removeEventListener('keydown', onArrowKey, true);
    }
  }, [])

  const onClickOutside = (evt) => {
    const node = ref.current
    if (node.contains(event.target)
      || node.parentNode.contains(event.target))
      return

    unmountComponentAtNode(node)
  }


  const onSelect = (item, nodeId) => {
    setFocusIdx(nodeId)
    onNavigate(item)
  }

  return (
    <SearchMenuRoot ref={ref}>
      {
        results.map((obj, i) =>
          <SearchItem
            key={i}
            matches={obj.matches}
            item={obj.item}
            focused={focusIdx}
            nodeId={i}
            onClick={(item, nodeId) => onSelect(item, nodeId)}
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
