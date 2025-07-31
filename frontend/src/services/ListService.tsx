import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row, Table } from 'react-bootstrap'
import { IServiceBackend } from '../Interfaces'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { EditService } from './EditService'

export const ListService = () => {
    const [services, setServices] = useState<IServiceBackend[]>()
    const navigate = useNavigate()
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [currentService, setCurrentService] = useState<IServiceBackend>()
    useEffect(() => {
        getServices();
    }, [])
    const getServices = async () => {
        try {
            Swal.fire("Cargando servicios")
            Swal.showLoading()
            const { data } = await axios.get("http://127.0.0.1:5000/services/get-all")
            setServices(data.services)
            Swal.close()
        } catch (error) {
            Swal.fire("Ocurrio un error al traer las servicios")
            console.log(error)
        }
    }

    const deleteService = async (id: number | undefined) => {
        Swal.fire({
            title: "¿Seguro de eliminar el servicio?",
            showCancelButton: true,
            confirmButtonText: "Sí",
            denyButtonText: `Cancelar`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    Swal.fire("Eliminando servicio")
                    Swal.showLoading()
                    await axios.delete(`http://127.0.0.1:5000/services/delete/${id}`)
                    Swal.fire("Servicio eliminado con exito", "", "success")
                    getServices();
                } catch (error) {
                    console.log(error)
                    Swal.fire("Ocurrio un error al eliminar el servicio")
                }
            }
        });
    }


    return (
        <Container className='mt-5'>
            <Card>
                <Card.Body>
                    <Card.Title className='text-center'>Listado de servicios</Card.Title>
                    <div className='text-end m-2'>
                        <Button onClick={() => navigate("/service/create")} variant='success'>Crear servicio</Button>
                    </div>
                    <Table>
                        <tr>
                            <th>#</th>
                            <th>Nombre:</th>
                            <th>Descripcion:</th>
                            <th>Precio:</th>
                            <th>Opciones:</th>
                        </tr>
                        {
                            services?.map((s, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{s.name}</td>
                                    <td>{s.description}</td>
                                    <td>${s.price}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <Button
                                                    onClick={
                                                        () => {
                                                            setCurrentService(s)
                                                            setShowModalEdit(true)
                                                        }
                                                    }
                                                >Editar</Button>
                                            </Col>
                                            <Col>
                                                <Button onClick={() => { deleteService(s.id) }} variant='danger'>Eliminar</Button>
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
                    <Modal.Title>Editar servicio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        currentService && (
                            <EditService close={setShowModalEdit} reload={getServices} service={currentService} />
                        )
                    }
                </Modal.Body>
            </Modal>
        </Container>
    )
}
