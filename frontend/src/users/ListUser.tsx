import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { IUser } from '../Interfaces'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { EditUser } from './EditUser'

export const ListUser = () => {
    const [users, setUsers] = useState<IUser[]>()
    const navigate = useNavigate()
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [currentUser, setCurrentUser] = useState<IUser>()
    useEffect(() => {
        getUser();
    }, [])
    const getUser = async () => {
        try {
            Swal.fire("Cargando usuarios")
            Swal.showLoading()
            const { data } = await axios.get("http://127.0.0.1:5000/users/get-all")
            setUsers(data)
            Swal.close()
        } catch (error) {
            Swal.fire("Ocurrio un error al traer los usuarios")
            console.log(error)
        }
    }

    const deleteUser = async (id: number | undefined) => {
        Swal.fire({
            title: "¿Seguro de eliminar el usuario?",
            showCancelButton: true,
            confirmButtonText: "Sí",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.fire("Eliminando usuario")
                    Swal.showLoading()
                    await axios.delete(`http://127.0.0.1:5000/users/delete/${id}`)
                    Swal.fire("Usuario eliminado con exito", "", "success")
                    getUser();
                } catch (error) {
                    console.log(error)
                    Swal.fire("Ocurrio un error al eliminar el usuario")
                }
            }
        });
    }


    return (
        <Container className='mt-5'>
            <Card>
                <Card.Body>
                    <Card.Title className='text-center'>Listado de usuarios</Card.Title>
                    <div className='text-end m-2'>
                        <Button onClick={() => navigate("/user/create")} variant='success'>Crear usuario</Button>
                    </div>
                    <Table>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Fecha de creación:</th>
                            <th>Opciones:</th>
                        </tr>
                        {
                            users?.map((c, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{c.name}</td>
                                    <td>{c.email}</td>
                                    <td>{c.rol}</td>
                                    <td>{c.state}</td>
                                    <td>{c.created_at}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <Button
                                                    onClick={
                                                        () => {
                                                            setCurrentUser(c)
                                                            setShowModalEdit(true)
                                                        }
                                                    }
                                                >Editar</Button>
                                            </Col>
                                            <Col>
                                                <Button onClick={() => { deleteUser(c.id) }} variant='danger'>Eliminar</Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            ))
                        }
                    </Table>
                </Card.Body>
            </Card>
            <Modal show={showModalEdit} onHide={() => setShowModalEdit(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        currentUser && (
                            <EditUser close={setShowModalEdit} reload={getUser} user={currentUser} />
                        )
                    }
                </Modal.Body>
            </Modal>
        </Container>
    )
}
