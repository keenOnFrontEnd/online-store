import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { DecrementCount, IncrementCount, RemoveItemFromBasket} from '../store/features/basket/basketSlice'
import { getItem } from '../store/features/items/itemsSlice'


let BasketItem = ({ itemId, basketItemId, index, count, user_id }) => {

    let [isLoading, setisLoading] = useState(true)
    let dispatch = useDispatch()
  
    useEffect(() => {
      dispatch(getItem(itemId))
    }, [itemId, dispatch])
  
    let items = useSelector((state) => state.basket.basketItems)
  
    let item = items.find(item => item.id === itemId)
  
  
  
    useEffect(() => {
      if (items) {
        if (items.find(item => item.id === itemId)) {
          setisLoading(false)
          console.log('item' + itemId)
        }
      }
    }, [item])
  
    let Delete = useCallback(() => {
      dispatch(RemoveItemFromBasket({ id: basketItemId, itemId: itemId, user_id }))
    }, [dispatch, item])
  
    let Increment = () => {
      dispatch(IncrementCount({ id: basketItemId, index, user_id }))
    }
    let Decrement = () => {
      if (count === 1) {
        Delete()
      } else {
        dispatch(DecrementCount({ id:basketItemId, index, user_id }))
      }
    }
  
    if (isLoading) {
      return <div> Loading </div>
    }
  
    return <Card.Body className='p-4'>
      <Row className="align-items-center">
        <Col className='mb-2'>
          <Card.Img src={'http://localhost:7000/' + item.img} alt="Image" />
        </Col>
        <Col className="d-flex justify-content-center flex-column">
          <p className="small text-muted mb-4 pb-2">Name</p>
          <p className="lead fw-normal mb-0">{item.name}</p>
        </Col>
        <Col className="d-flex justify-content-center flex-column">
          <p className="small text-muted mb-4 pb-2">Brand</p>
          <p className="lead fw-normal mb-0">{item.brandId ? item.brandId : "No Brand"}</p>
        </Col>
        <Col className="d-flex justify-content-center flex-column">
          <p className="small text-muted mb-4 pb-2">Quantity</p>
          <p className="lead fw-normal mb-0">
            <Button onClick={() => Decrement()} size='sm' className='mr-3' variant='light'>-</Button>
            {count}
            <Button onClick={() => Increment()} size='sm' className='ml-3' variant='light'>+</Button></p>
        </Col>
        <Col className="d-flex justify-content-center flex-column">
          <p className="small text-muted mb-4 pb-2">Price</p>
          <p className="lead fw-normal mb-0">{item.price}</p>
        </Col>
        <Col className="d-flex justify-content-center flex-column">
          <p className="small text-muted mb-4 pb-2">Total</p>
          <p className="lead fw-normal mb-0">{item.price * count}</p>
        </Col>
        <Col className='d-flex justify-content-center'>
          <Button size='sm' variant='outline-danger' onClick={() => Delete()}>Delete</Button>
        </Col>
      </Row>
    </Card.Body>
  }

  export default BasketItem