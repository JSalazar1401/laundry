import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const CreateClient = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const submit = async () => {
        try {
            Swal.fire("Guardando cliente")
            Swal.showLoading()
            await axios.post("http://127.0.0.1:5000/clients/create", data)
            Swal.fire("Cliente creado con exito", "", "success").then(()=>navigate("/clients"))
        } catch (error) {
            console.log(error)
            Swal.fire("Ocurrio un error al cargar los clientes")
        }
    }

    const onChange = (e: any) => {
        e.preventDefault()
        const newData: any = data
        newData[e.target.name] = e.target.value
        setData(newData)
    }
    return (
        <Container className='mt-5'>
            <Card>
                <Card.Body>
                    <Card.Title>Creación de clientes</Card.Title>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control name='name' onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Numero telefonico:</Form.Label>
                            <Form.Control name='phone_number' onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Dirección:</Form.Label>
                            <Form.Control name='address' onChange={onChange} />
                        </Form.Group>
                        <div className='text-center'>
                            <Button onClick={() => submit()}>Crear</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
