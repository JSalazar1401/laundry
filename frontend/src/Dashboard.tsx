import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { IOrderTable, Counting } from './Interfaces';
import { OrderTable } from './components/OrderTable';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState<IOrderTable[]>()
    const [pendingOrders, setPendingOrders] = useState<IOrderTable[]>()
    const [counting, setCounting] = useState<Counting>()

    useEffect(() => {
        Swal.fire("Cargando información...")
        Swal.showLoading()
        getOrders()
        getPendingOrders()
        getCounting()
        Swal.close()
    }, [])

    const getOrders = async () => {
        try {
            const { data } = await axios.get("http://127.0.0.1:5000/orders/get-orders-dashboard?pagination=1")
            console.log(data)
            setOrders(data)
        } catch (error) {
            Swal.fire("Ocurrio un error al obtener las ordenes")
            console.log(error)
        }
    }

    const getPendingOrders = async () => {
        try {
            const { data } = await axios.get("http://127.0.0.1:5000/orders/get-pending-orders-dashboard?pagination=1")
            console.log(data)
            setPendingOrders(data)
        } catch (error) {
            Swal.fire("Ocurrio un error al obtener las ordenes pendientes")
            console.log(error)
        }
    }
    const getCounting = async () => {
        try {
            const { data } = await axios.get("http://127.0.0.1:5000/orders/get-counting")
            console.log(data)
            setCounting(data)
        } catch (error) {
            Swal.fire("Ocurrio un error al obtener el conteo de elementos")
            console.log(error)
        }
    }

    return (
        <Container>
            <Card className='m-3'>
                <Card.Body>
                    <Card.Title>Lavanderia</Card.Title>
                    <Card className='m-5'>
                        <Card.Body>
                            <Card.Title>Conteo por unidad</Card.Title>
                            <Row>
                                <Col onClick={() => navigate("/garments")} className='text-center'>
                                    <p>Numero Prendas</p>
                                    <p>{counting?.quantity_garments}</p>
                                </Col>
                                <Col onClick={() => navigate("/services")} className='text-center'>
                                    <p>Numero de Servicio</p>
                                    <p>{counting?.quantity_services}</p>
                                </Col>
                                <Col onClick={() => navigate("/clients")} className='text-center'>
                                    <p>Numero de Clientes</p>
                                    <p>{counting?.quantity_clients}</p>
                                </Col>
                                <Col onClick={() => navigate("/users")} className='text-center'>
                                    <p>Numero de Usuarios</p>
                                    <p>{counting?.quantity_users}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <div className='m-3 text-end'>
                        <Button onClick={() => navigate("/")}>Crear Orden</Button>
                    </div>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Listado de ordenes</Card.Title>
                                    <OrderTable orders={orders ?? []} />
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Ordenes Pendientes</Card.Title>
                                    <OrderTable orders={pendingOrders ?? []} />
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}
