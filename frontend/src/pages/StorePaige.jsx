import queryString from 'query-string';
import React, { useEffect } from 'react'
import { useCallback } from 'react';
import { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import ItemComponent from '../components/ItemComponent';
import SearchComponent from '../components/SearchComponent';
import { getItems } from '../store/features/items/itemsSlice';

const StorePaige = () => {

  let dispatch = useDispatch()
  let items = useSelector((state) => state.items)
  let location = useLocation()
  
  let query = queryString.parse(location.search)

  useEffect(() => {
    if(query) {
      let url = '?' + queryString.stringify(query)
      console.log(url)
      dispatch(getItems(url))
    } else {
      dispatch(getItems())
    }
  }, [])

  return (
    <Container fluid="md" className='d-flex'>
      <Row lg="auto">
        <Col>
          <SearchComponent/>
        </Col>
        <Row>
          {items?.items?.map((item) => <ItemComponent key={item.id} {...item} />)}
          {items.items.length === 0 ? <div className='text-center'> <h3>No elements found</h3>  </div> : ''}
        </Row>
      </Row>
    </Container>
  )
}

export default StorePaige