import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { DecrementCount, getBasket, IncrementCount, RemoveItemFromBasket, Total} from '../store/features/basket/basketSlice'
import { getItem } from '../store/features/items/itemsSlice'



let BasketItem = ({ id, index, count, user_id }) => {

  let [isLoading, setisLoading] = useState(true)
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItem(id))
  }, [id,dispatch])

  let item = useSelector((state) => state.basket.basketItems)

  let basket = useSelector((state) => state.basket.basket)

  useEffect(() => {
    if (item[index]) {
      setisLoading(false)
    }
  }, [item, index])

  let Delete = () => {
    dispatch(RemoveItemFromBasket({id: basket.rows[index].id, user_id}))
  }

  let Increment = () => {
    dispatch(IncrementCount({ id: basket.rows[index].id, index, user_id }))
  }
  let Decrement = () => {
    if(count === 1) {
      Delete()
    } else {
      dispatch(DecrementCount({ id: basket.rows[index].id, index, user_id }))
    }
  }

  if (isLoading) {
    return <div> Loading </div>
  }



  return <Card.Body className='p-4'>
    <Row className="align-items-center">
      <Col className='mb-2'>
        <Card.Img src={'http://localhost:7000/' + item[index].img} alt="Image" className='img-thumbnail'/>
      </Col>
      <Col className="d-flex justify-content-center flex-column">
        <p className="small text-muted mb-4 pb-2">Name</p>
        <p className="lead fw-normal mb-0">{item[index].name}</p>
      </Col>
      <Col className="d-flex justify-content-center flex-column">
        <p className="small text-muted mb-4 pb-2">Brand</p>
        <p className="lead fw-normal mb-0">{item[index].brandId ? item[index].brandId : "No Brand"}</p>
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
        <p className="lead fw-normal mb-0">{item[index].price}</p>
      </Col>
      <Col className="d-flex justify-content-center flex-column">
        <p className="small text-muted mb-4 pb-2">Total</p>
        <p className="lead fw-normal mb-0">{item[index].price * count}</p>
      </Col>
      <Col className='d-flex justify-content-center'>
        <Button size='sm' variant='outline-danger' onClick={() => Delete()}>Delete</Button>
      </Col>
    </Row>
  </Card.Body>
}


const BasketPage = () => {

  let dispatch = useDispatch()

  let user_id = useSelector((state) => state.auth.userId)
  let basket = useSelector((state) => state.basket.basket)
  let total = useSelector((state) => state.basket.totalCount)

  useEffect(() => {
    if (user_id) {
      dispatch(getBasket(user_id))
    }
  }, [user_id, dispatch])

  useEffect(() => {
    if(user_id ) {
      dispatch(Total(user_id))
    }
  }, [])
  

  return (
    <section className='vh-100'>
      <Container className='h-100'>
        <Row className="justify-content-center align-items-start h-100">
          <Col className="mt-5 text-center">
            <span className="h2">Shopping Cart </span>
            <span className="h4">( {basket?.count ? basket.count : 0} item in your cart)</span>
            <Card className='mt-5' bg='light'>
              {basket?.rows.length ?
                basket.rows.map((i, index) => <BasketItem key={i.id} id={i.itemId} index={index} count={i.count} user_id={user_id}/>) :

                <span className='h3'> No elements in the shopping cart </span>

              }
            </Card>
            <Card className='mt-3'>
              <Card.Body className='p-4'>
                <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>
                    <span className="lead fw-normal">{total}</span>
                  </p>
                </div>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-end align-items-center mt-5" style={{ height: '3rem' }}>
              <Button variant='outline-primary' size='lg' className='me-2'>
                Buy
              </Button>
            </div>
          </Col>
        </Row>

      </Container>
    </section>
  )
}

export default BasketPage
