import React, { useState, useEffect, useRef, forwardRef } from 'react'
import styled from 'styled-components'
import Fuse from 'fuse.js'

import SearchMenu from './SearchMenu'


const searchOptions = {
  shouldSort: true,
  includeMatches: true,
  threshold: .8,
  tokenize: false,
  distance: 800,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "name",
    "path"
  ]
}


const SearchBox = (props) => {
  const {items} = props

  const boxRef = useRef(null)
  const menuRef = useRef(null)

  const fuse = new Fuse(items, searchOptions)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeydown)

    return () => {
      document.addEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeydown);
    }
  }, [])


  // focus on cmd-P, close menu on escape
  const onKeydown = (evt) => {
    if (evt.key == 'Escape')
      setResults(null)

    if (!(evt.metaKey && evt.key == 'p')) return
    evt.preventDefault()

    boxRef.current.focus();
  }

  const handleClick = () => {
    setDefaultItems()
  }

  const onSearch = (e) => {
    const query = e.target.value;
    setQuery(query)

    if (!query.length) {
      setDefaultItems()
      return
    }

    setResults(fuse.search(query))
  }

  const onNavigate = () => {
    // reset results (closing selector) and reset query
    setResults(null)
    setQuery('')
  }

  const onClickOutside = (evt) => {
    const {target} = evt;
    const boxNode = boxRef.current,
      menuNode = menuRef.current;

    if (boxNode && boxNode.contains(target) ||
      menuNode && menuNode.contains(target))
      return

    setResults(null)
  }

  const setDefaultItems = () => {
    const subList = items.slice(0, 10)
      .map(o => ( {item: o, matches: []} ))

    setResults(subList)
  }

  return (
    <SearchRoot>
      <Search type="text"
        ref={boxRef}
        value={query}
        onChange={e => onSearch(e)} placeholder="Search"
        onClick={e => handleClick(e)}
      />

      {
        results &&
        <MenuContainer ref={menuRef}>
          <SearchMenu
            results={results}
            onNavigate={onNavigate}
          />
        </MenuContainer>
      }
    </SearchRoot>
  )
}

const SearchRoot = styled.div`
  position: relative;
  margin: 10px auto;
  color: #444;
  width: 60%;
  display: flex;
`

const Search = styled.input`
  width: 100%;
  padding-left: 5;
  &:focus {
    outline: none;
    border: 2px solid #049ea4;
  }
`

const MenuContainer = styled.div`

`


export default SearchBox
