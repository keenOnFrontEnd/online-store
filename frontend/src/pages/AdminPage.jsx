import React from 'react'
import { useState } from 'react'
import { Container, Row, Form, Button } from 'react-bootstrap'
import { CreateBrand, CreateType, DeleteBrand, DeleteItem, DeleteType, ItemCreate } from '../http/adminApi'

const AdminPage = () => {

    const [brandName, setBrandName] = useState('')

    const [brandNameToDelete, setBrandNameToDelete] = useState('')

    const [typeName, setTypeName] = useState('')

    const [typeNameToDelete, setTypeNameToDelete] = useState('')

    const [itemName, setItemName] = useState('')
    const [itemPrice, setItemPrice] = useState(0)
    const [itemBrand, setItemBrand] = useState('')
    const [itemType, setItemType] = useState('')
    const [itemInfo, setItemInfo] = useState('')
    const [itemImage, setItemImage] = useState('')

    const [itemNameToDelete, setItemNameToDelete] = useState('')




    const addBrand = () => {

        if (brandName) {
            CreateBrand({ name: brandName })
        }
        else {
            console.log('no info')
        }
    }
    const deleteBrand = () => {

        if (brandNameToDelete) {
            DeleteBrand({ name: brandNameToDelete })
        }
        else {
            console.log('no info')
        }
    }
    const createType = () => {
        if (typeName) {
            CreateType({ name: typeName })
        } else {
            console.log('no info')
        }

    }
    const deleteType = () => {

        if (typeNameToDelete) {
            DeleteType({ name: typeNameToDelete })
        } else {
            console.log('no info')
        }

    }
    const addItem = () => {
        if (itemName && itemPrice && itemBrand && itemType && itemImage) {
            let data = {
                name: itemName,
                price: itemPrice,
                brandName: itemBrand,
                typeName: itemType,
                info: itemInfo,
                img: itemImage
            }
            ItemCreate(data)
        } else {
            console.log('no info')
        }
    }

    const deleteItem = () => {
        if (itemNameToDelete) {
            DeleteItem({ name: itemNameToDelete })
        } else {
            console.log('no info')
        }
    }



    return (
        <Container fluid='lg'>

            <Row>
                <Form>
                    <Form.Label>Brand create</Form.Label>
                    <Form.Group className='mb3 d-flex-column' style={{ height: 100 }}  >
                        <Form.Control type='text' placeholder='Brand Name' value={brandName} onChange={(e) => setBrandName(e.target.value)} />
                        <Button variant='outline-primary' className='mt-2' onClick={() => addBrand()}>Add</Button>
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <Form>
                    <Form.Label>Brand delete</Form.Label>
                    <Form.Group className='mb3 d-flex-column' style={{ height: 100 }}  >
                        <Form.Control type='text' placeholder='Brand Name' value={brandNameToDelete} onChange={(e) => setBrandNameToDelete(e.target.value)} />
                        <Button variant='outline-danger' className='mt-2' onClick={() => deleteBrand()}>Delete</Button>
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <Form>
                    <Form.Label>Item create</Form.Label>
                    <Form.Group className='mb-3 d-flex-column' style={{ height: 300 }}  >
                        <Form.Control type='text' placeholder='Item Name' value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        <Form.Control type='number' min={1} placeholder='Item Price' value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                        <Form.Control type='text' placeholder='Item Brand' value={itemBrand} onChange={(e) => setItemBrand(e.target.value)} />
                        <Form.Control type='text' placeholder='Item Type' value={itemType} onChange={(e) => setItemType(e.target.value)} />
                        <Form.Control type='text' placeholder='Item info' value={itemInfo} onChange={(e) => setItemInfo(e.target.value)} />
                        <Form.Control type='file' placeholder='Item Image' onChange={(e) => setItemImage(e.target.files[0])} />
                        <Button variant='outline-primary' className='mt-2' onClick={() => addItem()}>Add</Button>
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <Form>
                    <Form.Label>Item delete</Form.Label>
                    <Form.Group className='mb3 d-flex-column' style={{ height: 100 }}  >
                        <Form.Control type='text' placeholder='Item Name' value={itemNameToDelete} onChange={(e) => setItemNameToDelete(e.target.value)} />
                        <Button variant='outline-danger' className='mt-2' onClick={() => deleteItem()}>Delete</Button>
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <Form>
                    <Form.Label>Type create</Form.Label>
                    <Form.Group className='mb3 d-flex-column' style={{ height: 100 }}  >
                        <Form.Control type='text' placeholder='Type Name' value={typeName} onChange={(e) => setTypeName(e.target.value)} />
                        <Button variant='outline-primary' className='mt-2' onClick={() => createType()}>Add</Button>
                    </Form.Group>
                </Form>
            </Row>
            <Row>
                <Form>
                    <Form.Label>Type delete</Form.Label>
                    <Form.Group className='mb3 d-flex-column' style={{ height: 100 }}  >
                        <Form.Control type='text' placeholder='Type Name' value={typeNameToDelete} onChange={(e) => setTypeNameToDelete(e.target.value)} />
                        <Button variant='outline-danger' className='mt-2' onClick={() => deleteType()}>Delete</Button>
                    </Form.Group>
                </Form>
            </Row>
        </Container>
    )
}

export default AdminPage
