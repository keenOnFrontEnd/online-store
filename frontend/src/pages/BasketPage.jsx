import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import BasketItem from '../components/BasketItem'
import { getBasket, Total } from '../store/features/basket/basketSlice'

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
    if (user_id) {
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
              {basket?.rows?.length > 0 ?
                basket.rows.map((i, index) => <BasketItem key={i.id} itemId={i.itemId} basketItemId={i.id} count={i.count} user_id={user_id} index={index}/>) :

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
