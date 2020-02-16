import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Fuse from 'fuse.js'


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
  const searchBox = useRef(null)

  const fuse = new Fuse(items, searchOptions)

  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)

  useEffect(() => {
    document.addEventListener('keydown', onKeydown, true)
    return () => {
      document.removeEventListener('keydown', onKeydown, true);
    }
  }, [])

  const onKeydown = (evt) => {
    // only focus on cmd-P
    if (!(evt.metaKey && evt.key == 'p')) return
    evt.preventDefault()

    searchBox.current.focus();
  }

  const onSearch = (e) => {
    const query = e.target.value;
    setQuery(query)
    setResults(fuse.search(query))
  }

  const onNavigate = () => {
    // reset results (closing selector) and reset query
    setResults(null)
    setQuery('')
  }

  return (
    <SearchRoot>
      <Search type="text"
        ref={searchBox}
        value={query}
        onChange={e => onSearch(e)} placeholder="Search"
      />

      {results && <SearchMenu results={results} onNavigate={onNavigate} />}
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

`

const SearchMenu = (props) => {
  const {results, onNavigate} = props

  const [focusIdx, setFocusIdx] = useState(0)

  const onArrowKey = (e) => {
    // arrow up
    if (e.keyCode == 38) {
      setFocusIdx(f => f - 1)

    // arrow down
    } else if (e.keyCode == 40) {
      setFocusIdx(f => f + 1)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onArrowKey, true)
    return () => {
      document.removeEventListener('keydown', onArrowKey, true);
    }
  }, [])


  const onSelect = (item, nodeId) => {
    setFocusIdx(nodeId)
    onNavigate(item)
  }

  return (
    <SearchMenuRoot>
      {
        results.map((obj, i) =>
          <Item
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
  top: calc(100%);
  width: 100%;
  background-color: #fff;
  border: 2px solid #f2f2f2;

  &:empty {
    display: none;
  }

  & .active {
    background-color: #f2f2f2;
  }
`


const Item = (props) => {
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




export default SearchBox

