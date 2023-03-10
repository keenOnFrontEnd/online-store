import React, { useEffect, useState } from 'react'
import { Alert, Badge, Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { LoginThunk } from '../store/features/auth/authSlice';
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState({
        error: null,
        message: null
    })

    let navigate = useNavigate();

    let dispatch = useDispatch()

    let loginError = useSelector((state) => state.auth.loginError)
    let isAuth = useSelector((state) => state.auth.email)

    let login = () => {
        let user = { email: email, password: password }
        dispatch(LoginThunk(user))
    }

    useEffect(() => {
        if (loginError.message) {
            setIsError({ error: true, message: loginError.message })
        }
        if (isAuth) {
            navigate('/')
        }
    }, [loginError])



    return (
        <Form className=''>
            <Container className='bg-light border'>
                <h1 className='text-center'><Badge bg='secondary' text='light' pill='true'>Authorization</Badge></h1>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                        setIsError({ error: null, message: null })
                    }} />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                        setIsError({ error: null, message: null })
                    }} />
                </Form.Group>
                <Button className='mb-3' onClick={() => login()}>Login</Button>
                {isError.error ? <Alert variant='danger'>{isError.message}</Alert> : ''}
            </Container>
        </Form>
    )
}


export default LoginPage
