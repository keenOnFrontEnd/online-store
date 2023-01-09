import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useDispatch} from 'react-redux';
import { LoginThunk } from '../store/features/auth/authSlice';


const LoginPage = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    let dispatch = useDispatch()
    let login = () => {
        let user = {email: email, password: password}
        console.log(user)
        dispatch(LoginThunk(user))
    }


    return (
        <Form className=''>
            <Container className='bg-light border'>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3 " controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button className='mb-3' onClick={() => login()}>Login</Button>
            </Container>
        </Form>
    )
}


export default LoginPage
