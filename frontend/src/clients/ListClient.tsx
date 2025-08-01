import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap'
import { IClient } from '../Interfaces'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { EditClient } from './EditClient'

export const ListClient = () => {
    const [clients, setClients] = useState<IClient[]>()
    const [parameter, setParameter] = useState("")
    const navigate = useNavigate()
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [currentClient, setCurrentClient] = useState<IClient>()
    useEffect(() => {
        getClients();
    }, [])
    const getClients = async () => {
        try {
            Swal.fire("Cargando clientes")
            Swal.showLoading()
            const { data } = await axios.get("http://127.0.0.1:5000/clients/search")
            setClients(data)
            Swal.close()
        } catch (error) {
            Swal.fire("Ocurrio un error al traer los clientes")
            console.log(error)
        }
    }

    const deleteClient = async (id: number | undefined) => {
        Swal.fire({
            title: "¿Seguro de eliminar el client?",
            showCancelButton: true,
            confirmButtonText: "Sí",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.fire("Eliminando client")
                    Swal.showLoading()
                    await axios.delete(`http://127.0.0.1:5000/clients/delete/${id}`)
                    Swal.fire("Cliente eliminado con exito", "", "success")
                    getClients();
                } catch (error) {
                    console.log(error)
                    Swal.fire("Ocurrio un error al eliminar el cliente")
                }
            }
        });
    }

    const search_by = async (filter: string) => {
        try {
            const { data } = await axios.get(`http://127.0.0.1:5000/clients/search?filter=${filter}&parameter=${parameter}`)
            setClients(data)
        } catch (error) {
            Swal.fire("Ocurrio un error al traer los clientes")
            console.log(error)
        }
    }


    return (
        <Container className='mt-5'>
            <Card>
                <Card.Body>
                    <Card.Title className='text-center'>Listado de clientes</Card.Title>
                    <div className='text-end m-2'>
                        <Button onClick={() => navigate("/client/create")} variant='success'>Crear cliente</Button>
                    </div>
                    <Card.Title>Busqueda rapida:</Card.Title>
                    <Row className='text-center'>
                        <Col className='m-2' md={8}>
                            <Form.Control name='parameter' onChange={(e) => setParameter(e.target.value)} />
                        </Col>
                        <Col className='m-2' md={1}>
                            <Button variant='info' onClick={() => search_by("phone")}>Telefono</Button>
                        </Col>
                        <Col className='m-2' md={1}>
                            <Button variant='info' onClick={() => search_by("name")}>Nombre</Button>
                        </Col>
                        <Col className='m-2' md={1}>
                            <Button variant='warning' onClick={() => getClients()}>Reset</Button>
                        </Col>
                    </Row>
                    <Table>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Numero telefonico</th>
                            <th>Dirección:</th>
                            <th>Fecha de creación:</th>
                            <th>Opciones:</th>
                        </tr>
                        {
                            clients?.map((c, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{c.name}</td>
                                    <td>{c.phone_number}</td>
                                    <td>{c.address}</td>
                                    <td>{c.created_at}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <Button
                                                    onClick={
                                                        () => {
                                                            setCurrentClient(c)
                                                            setShowModalEdit(true)
                                                        }
                                                    }
                                                >Editar</Button>
                                            </Col>
                                            <Col>
                                                <Button onClick={() => { deleteClient(c.id) }} variant='danger'>Eliminar</Button>
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
                    <Modal.Title>Editar cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        currentClient && (
                            <EditClient close={setShowModalEdit} reload={getClients} client={currentClient} />
                        )
                    }
                </Modal.Body>
            </Modal>
        </Container>
    )
}
