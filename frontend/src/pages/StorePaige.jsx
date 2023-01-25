import queryString from 'query-string';
import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom/dist/umd/react-router-dom.development';
import ItemComponent from '../components/ItemComponent';
import SearchComponent from '../components/SearchComponent';
import { getItems } from '../store/features/items/itemsSlice';
import { getbrands, gettypes } from '../store/features/search/searchSlice';

const StorePaige = () => {

  let dispatch = useDispatch()
  let items = useSelector((state) => state.items)
  let location = useLocation()
  
  let query = queryString.parse(location.search)

  useEffect(() => {
    if(query) {
      let url = '?' + queryString.stringify(query)
      dispatch(getItems(url))
    } else {
      dispatch(getItems())
    }
  }, [location.search])

  useEffect(() => {
    dispatch(getbrands())
    dispatch(gettypes())
  },[])


  return (
    <Container fluid="auto" className='d-flex'>
        <Col>
           <SearchComponent/>
        </Col>
        <Row style={{
        width: "80%"
        }}>
          {items?.items?.map((item) => <ItemComponent key={item.id} {...item} />)}
          {!items.items.length ? <div className='text-center'> <h3>No elements found</h3>  </div> : ''}
        </Row>
    </Container>
  )
}

export default StorePaige