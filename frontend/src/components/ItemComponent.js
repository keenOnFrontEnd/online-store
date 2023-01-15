import React from 'react'
import { Button, Card,ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AddItemToBasket } from '../store/features/basket/basketSlice'



const ItemComponent = ({name,price,rating,img,description,id}) => {

let dispatch = useDispatch()

let user_id = useSelector((state) => state.auth.userId)

let addToCart = () => {
  let candidate = {
    user_id,
    item_id: id
  }
  console.log(candidate)
  dispatch(AddItemToBasket(candidate))
}

let isAuth = localStorage.getItem('isAuth')

  return (
    <Card style={{ width: '18rem', maxHeight: '20rem', marginRight: '5rem' }} text="primary">
    <Card.Img variant="top" src={'http://localhost:7000/' + img} style={{height:'100%'}} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
       {description? <Card.Text>description</Card.Text> : null}
    </Card.Body>
    <ListGroup variant='flush'>
        <ListGroup.Item>Price: {price}</ListGroup.Item>
        <ListGroup.Item>Rating: {rating}</ListGroup.Item>{ isAuth ?
        <ListGroup.Item><Button variant='outline-primary' onClick={() => addToCart() }>Add to cart</Button></ListGroup.Item> : ''}
      </ListGroup>
  </Card>
  )
}

export default ItemComponent
