import React, { useState } from 'react'
import { Button,Form } from 'react-bootstrap'
import { useNavigate,createSearchParams } from 'react-router-dom/dist/umd/react-router-dom.development'

const SearchComponent = () => {

let navigate = useNavigate()
let [query, setQuery] = useState('')

let search = () => {
  let params = {
    name: query
  }
  navigate({
    pathname: '/',
    search: `?${createSearchParams(params)}`
  })
}


  return (
    <div className='d-md-flex flex-column align-items-center'>
      <span className='h3'>poisk</span>
      <Form.Control
          placeholder="Name"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value) }
        />
      <Button onClick={() => search()}>Push me</Button>
    </div>
  )
}

export default SearchComponent
