import axios from 'axios'
import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { IUser } from '../Interfaces'

export const CreateUser = () => {
    const [data, setData] = useState({
        state: false
    })
    const navigate = useNavigate()

    const submit = async () => {
        try {
            Swal.fire("Guardando usuario")
            Swal.showLoading()
            await axios.post("http://127.0.0.1:5000/users/register", data)
            Swal.fire("Usuario creado con exito", "", "success").then(() => navigate("/users"))
        } catch (error) {
            console.log(error)
            Swal.fire("Ocurrio un error al guardar el usuario")
        }
    }

    const onChange = (e: any) => {
        e.preventDefault()
        const newData: any = data
        newData[e.target.name] = e.target.value
        if(e.target.name == "state"){
            newData.state = e.target.checked
        }
        console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIII", newData)
        setData({ ...newData })
    }
    return (
        <Container className='mt-5'>
            <Card>
                <Card.Body>
                    <Card.Title>Creación de usuarios</Card.Title>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control name='name' onChange={onChange} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Correo:</Form.Label>
                            <Form.Control name='email' onChange={onChange} required />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control name='password' onChange={onChange} required />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Rol:</Form.Label>
                            <Form.Select
                                name='rol'
                                onChange={onChange}
                                required
                            >
                                <option value=""></option>
                                <option value="administrator">Administrador</option>
                                <option value="user">Usuario Normal</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Estado: <span style={{
                                color: data?.state ? "green" : "red"
                            }}> {data?.state ? "Activo" : "Inactivo"}</span></Form.Label>
                            <Form.Switch defaultChecked={data?.state} name='state' onChange={onChange} required />
                        </Form.Group>
                        <div className='text-center'>
                            <Button onClick={() => submit()}>Guardar</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
