import React, { useEffect } from 'react'
import { Container,Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ItemComponent from '../components/ItemComponent';
import { getItems } from '../store/features/items/itemsSlice';

const StorePaige = () => {

let dispatch = useDispatch()
let items = useSelector((state) => state.items)

useEffect(() => {
  dispatch(getItems())
}, [])

  return (
   <Container fluid="md">
    <Row md="auto" className="d-flex flex-wrap">
      {items?.items?.map((item) => <ItemComponent key={item.id} {...item}/>)}
      </Row>
   </Container>
  )
}

export default StorePaige