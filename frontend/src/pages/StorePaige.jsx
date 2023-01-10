import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
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
   <Container fluid="md" className='flex'>
     {items?.items?.map((item) => <ItemComponent key={item.id} {...item}/>)}
   </Container>
  )
}

export default StorePaige