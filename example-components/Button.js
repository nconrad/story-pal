import React from 'react'

export default function Button() {

  return (
    <input type="button"
      value="I'm a button"
      onClick={() => alert('click!')}
    />
  )
}
