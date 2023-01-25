import React from 'react'
import { Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { AddItemToBasket } from '../store/features/basket/basketSlice'
import s from './itemComponent.module.css'


const ItemComponent = ({ name, price, rating, img, description, id }) => {

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
    <Col className='mt-3 d-flex' sm="auto">
      <div className={s.thumbwrapper}>
        <div className={s.imgbox}>
          <img src={'http://localhost:7000/' + img} className="img-fluid" alt="" />
        </div>
        <div className={s.thumbContent}>
          <h4>{name}</h4>
          {/* <div className="star-rating">
            {rating}
          </div> */}
          <p className="item-price"><b>$ {price}</b></p>
          {isAuth ?
            <Button variant='outline-primary' onClick={() => addToCart()}>Add to cart</Button> : ''}
        </div>
      </div>
      </Col>
  )
}

export default ItemComponent
