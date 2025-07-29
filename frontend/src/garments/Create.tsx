import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'

export const Create = () => {
    const [data, setData] = useState({})

    const submit = async () => {
        try {
            Swal.fire("Guardando prenda")
            Swal.showLoading()
            await axios.post("http://127.0.0.1:5000/garments/create", data)
            Swal.fire("Prendan creada con exito", "", "success")
        } catch (error) {
            console.log(error)
            Swal.fire("Ocurrio un error al cargar las prendas")
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
                    <Card.Title>Creacion de prendas</Card.Title>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Tipo:</Form.Label>
                            <Form.Control name='name' onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Descripcion:</Form.Label>
                            <Form.Control name='description' onChange={onChange} />
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
