import React, { useState } from 'react'
import { Button, Form, Accordion } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development'

const SearchComponent = () => {

  let navigate = useNavigate()

  let brands = useSelector((state) => state.search.brands)
  let types = useSelector((state) => state.search.types)

  let [queryName, setQueryName] = useState('')
  let [queryBrands, setQueryBrands] = useState([])
  let [queryTypes, setQueryTypes] = useState([])



  let search = () => {
    let params = {
      name: queryName,
      brand: queryBrands.toString(),
      type: queryTypes.toString()
    }
    navigate({
      pathname: '/',
      search: `?name=${params.name}&brand=${params.brand}&type=${params.type}`
    })
  }

  let check = ({ name, type }) => {
    if (type === 'brands') {
      let candidate = queryBrands.find(element => element === name)
      if (candidate) {
        setQueryBrands((current) => current.filter((item) => item !== name))
      } else {
        setQueryBrands((current) => [...current, `${name}`])
      }
    }
    if (type === 'types') {
      let candidate = queryTypes.find(element => element === name)
      if (candidate) {
        setQueryTypes((current) => current.filter((item) => item !== name))
      } else {
        setQueryTypes((current) => [...current, `${name}`])
      }
    }
  }

  let reset = () => {
    setQueryBrands([])
    setQueryTypes([])
    setQueryName('')
    navigate({
      pathname: '/'
    })
  }

  return (
    <div className='d-md-flex flex-column p-3'>
      <span className='h3'>Searching</span>
      <Form.Control
        placeholder="Item Label"
        type="text"
        value={queryName}
        onChange={(e) => setQueryName(e.target.value)}
        className="mt-3"
      />
      <Accordion alwaysOpen className='mt-3'>
        <Accordion.Item eventKey='0'>
          <Accordion.Header>Brands</Accordion.Header>
          <Accordion.Body>
            {brands.length ? brands.map((item) => <Form.Check key={item.id} type="checkbox" id={item.id} label={item.name} onChange={(e) => check({ name: item.name, type: 'brands'})} />) : "Pending brands..."}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey='1' className='mt-3'>
          <Accordion.Header>Types</Accordion.Header>
          <Accordion.Body>
            {types.length ? types.map((item) => <Form.Check key={item.id} type="checkbox" id={item.id} label={item.name} onChange={(e) => check({ name: item.name, type: 'types' })} />) : "Pending types..."}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button onClick={() => search()} className='mt-3'>Search</Button>
      <Button type='reset' variant='outline-danger' className='mt-3' onClick={() => reset()}>Clear Fields</Button>
    </div>
  )
}

export default SearchComponent
