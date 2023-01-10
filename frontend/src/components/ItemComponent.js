import React from 'react'
import { Card,ListGroup } from 'react-bootstrap'

const ItemComponent = ({name,price,rating,img,typeId,brandId,description}) => {
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={'http://localhost:7000/' + img} />
    <Card.Body>
      <Card.Title>{name}</Card.Title>
       {description? <Card.Text>description</Card.Text> : null}
    </Card.Body>
    <ListGroup className="list-group-flush">
        <ListGroup.Item>Price: {price}</ListGroup.Item>
        <ListGroup.Item>Rating: {rating}</ListGroup.Item>
      </ListGroup>
  </Card>
  )
}

export default ItemComponent
