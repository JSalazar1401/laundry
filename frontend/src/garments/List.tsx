import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { IGarments } from '../Interfaces'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export const List = () => {
    const [garments, setGarments] = useState<IGarments[]>()
    const navigate = useNavigate()
    useEffect(() => {
      getGarments();
    }, [])
    const getGarments = async ()=>{
        try {
            Swal.fire("Cargando prendas")
            Swal.showLoading()
            const {data} = await axios.get("http://127.0.0.1:5000/garments/get-all")
            setGarments(data.garments)
            Swal.close()
        } catch (error) {
            Swal.fire("Ocurrio un error al traer las prendas")
            console.log(error)
        }
    }
    

    return (
        <Container className='mt-5'>
            <Card>
                <Card.Body>
                    <Card.Title className='text-center'>Listado de prendas</Card.Title>
                    <div className='text-end m-2'>
                        <Button onClick={()=>navigate("/garment/create")} variant='success'>Crear prenda</Button>
                    </div>
                    <Table>
                        <tr>
                            <th>#</th>
                            <th>Tipo:</th>
                            <th>Descripcion:</th>
                            <th>Opciones:</th>
                        </tr>
                        {
                            garments?.map((g, i) => (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{g.type}</td>
                                    <td>{g.description}</td>
                                    <td>
                                        <Row>
                                            <Col>
                                                <Button>Editar</Button>
                                            </Col>
                                            <Col>
                                                <Button variant='danger'>Eliminar</Button>
                                            </Col>
                                        </Row>
                                    </td>
                                </tr>
                            ))
                        }
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}
