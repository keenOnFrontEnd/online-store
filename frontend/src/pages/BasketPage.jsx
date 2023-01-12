import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getBasket, RemoveItemFromBasket } from '../store/features/basket/basketSlice'
import { getItem } from '../store/features/items/itemsSlice'



let BasketItem = ({id, index}) => {

  let [isLoading,setisLoading] = useState(true)
  let [quantity,setQuantity] = useState(1)
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItem(id))
  },[])
  
  let item = useSelector((state) => state.basket.basketItems)

  let basket = useSelector((state) => state.basket.basket)

  useEffect(() => {
    if(item[index]) {
      setisLoading(false)
    }
  },[item])

  let Delete = () => {
    dispatch(RemoveItemFromBasket(basket.rows[index].id))
  }


  if(isLoading) {
    return <div> Loading </div>
  }

  return  <Card.Body className='p-4'>
  <Row className="align-items-center">
    <Col className='mb-2'>
      <Card.Img src={'http://localhost:7000/' + item[index].img} alt="Image" />
    </Col>
    <Col className="d-flex justify-content-center flex-column">
      <p className="small text-muted mb-4 pb-2">Name</p>
      <p className="lead fw-normal mb-0">{item[index].name}</p>
    </Col>
    <Col className="d-flex justify-content-center flex-column">
      <p className="small text-muted mb-4 pb-2">Brand</p>
      <p className="lead fw-normal mb-0">{item[index].brandId ? item[index].brandId : "No Brand" }</p>
    </Col>
    <Col className="d-flex justify-content-center flex-column">
      <p className="small text-muted mb-4 pb-2">Quantity</p>
      <p className="lead fw-normal mb-0">{quantity}</p>
    </Col>
    <Col className="d-flex justify-content-center flex-column">
      <p className="small text-muted mb-4 pb-2">Price</p>
      <p className="lead fw-normal mb-0">{item[index].price}</p>
    </Col>
    <Col className="d-flex justify-content-center flex-column">
      <p className="small text-muted mb-4 pb-2">Total</p>
      <p className="lead fw-normal mb-0">{item[index].price*quantity}</p>
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

  useEffect(() => {
    if (user_id) {
      dispatch(getBasket(user_id))
    }
  }, [user_id, dispatch,basket])

  let totalPrice = useSelector((state) => state.basket.basketItems)

  return (
    <section className='vh-100'>
      <Container className='h-100'>
        <Row className="justify-content-center align-items-start h-100">
          <Col className="mt-5 text-center">
            <span className="h2">Shopping Cart </span>
            <span className="h4">(1 item in your cart)</span>
            <Card className='mt-5' bg='light'>
            {basket?.rows ? 
            basket.rows.map((i,index) => <BasketItem key={i.id} id={i.itemId} index={index}/>) : ''}
            </Card>
            <Card className='mt-3'>
              <Card.Body className='p-4'>
              <div className="float-end">
                  <p className="mb-0 me-5 d-flex align-items-center">
                    <span className="small text-muted me-2">Order total:</span>
                    <span className="lead fw-normal">$799</span>
                  </p>
                </div>
              </Card.Body>
            </Card>
            <div className="d-flex justify-content-end align-items-center mt-5" style={{height: '3rem'}}>
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
