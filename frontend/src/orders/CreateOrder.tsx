import React, { useState } from 'react'
import { IOrder, IService } from "../Interfaces"
import { Button, Col, Container, Row, Form, Card, CloseButton } from 'react-bootstrap'
import constants from "../Contants";
import { BsFillTrash3Fill } from "react-icons/bs";
import Swal from 'sweetalert2';

const { services, garments } = constants;

export const CreateOrder = () => {
    const defaultGarment = {
        type: "Camisa",
        description: "",
        observations: "",
        services: [services[0]],
    }
    const [order, setOrder] = useState<IOrder>({
        client_id: 1,
        user_id: 1,
        state: "recibido",
        total: 0,
        estimated_delivery_date: "",
        pagado: false,
        garments: [defaultGarment],
    })

    const [total, setTotal] = useState<number>(0);

    const calculateTotal = () => {
        let subTotal = 0;
        const data = order;
        if (data.garments) {
            for (const garment of data.garments) {
                console.log(garment)
                for (const service of garment.services) {
                    console.log(service)
                    subTotal += service.quantity * service.unitPrice
                }
            }
        }
        setTotal(subTotal)
        data.total = subTotal
        setOrder(data)
    }

    const addGarment = () => {
        const data = order
        data.garments?.push(defaultGarment)
        setOrder({ ...data })
    }

    const onChangeService = (target: EventTarget & HTMLSelectElement, ig: number, is: number) => {
        const data = order;
        const newService = services.filter((s) => s.name === target.value).shift()
        if (data.garments && data.garments[ig] && newService) {
            data.garments[ig].services[is] = newService;
        }
        setOrder({ ...data })
        onChangeServiceFields("name", target.value, ig, is)
        calculateTotal()
    }

    const addServiceToGarment = (ig: number) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services.push(services[0])
        }
        setOrder({ ...data })
    }

    const deleteServiceToGarment = (ig: number, is: number) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments[ig].services = data.garments[ig].services.filter((_, i) => i != is)
        }
        setOrder({ ...data })
    }

    const deleteGarment = (ig: number) => {
        const data = order;
        if (data.garments && data.garments[ig]) {
            data.garments = data.garments.filter((_, i) => i != ig)
        }
        setOrder({ ...data })
    }

    const onChangeGarment = (key: "description" | "observations" | "type", value: string, ig: number) => {
        const data = order;
        if (data.garments) {
            data.garments[ig][key] = value
        }
    }

    const onChangeServiceFields = (key: "name" | "quantity" | "unitPrice", value: string, ig: number, is: number) => {
        const data = order;
        if (data.garments) {
            if (key == "name") {
                data.garments[ig].services[is][key] = value
            } else {
                data.garments[ig].services[is][key] = parseFloat(value)
            }
        }
    }

    const onChageDate = (date: string) => {
        const data = order
        data.estimated_delivery_date = date
        setOrder({ ...data })
    }

    const onSubmit = async () => {
        Swal.fire("Creando orden..")
        Swal.showLoading()
        try {
            console.log(order)
            /* const res = await fetch('http://127.0.0.1:5000/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order)
            }) */
            Swal.fire("Orden creada con exito","","success")
        } catch (error) {
            Swal.fire("Ocurrio un error almacenando la orden","","error")
        }
        
    }

    return (
        <Container className='mx-auto mt-5'>
            <Card>
                <Card.Body>
                    <Card.Title>Creación de Orden</Card.Title>
                    <hr></hr>
                    <Row>
                        <Col>
                            <Button onClick={addGarment}>Agregar Prenda</Button>
                        </Col>
                        <Col>
                            <Form.Label>Fecha Estimada de Entrega</Form.Label>
                            <Form.Control type='date' onChange={({ target }) => onChageDate(target.value)} />
                        </Col>
                    </Row>
                    <h2>Prendas:</h2>
                    {
                        order.garments?.map((garment, i) => (
                            <div id="garment">
                                <hr />
                                {
                                    i > 0 && (
                                        <div className='text-end m-2'>
                                            <Button variant='danger' onClick={() => deleteGarment(i)}>Eliminar prenda</Button>
                                        </div>
                                    )
                                }
                                <Row>
                                    <Col>
                                        <Form>
                                            {/* Fila para tipo y descripcion */}
                                            <h4>#{i + 1}</h4>
                                            <Row>

                                                <Col>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Tipo de prenda:</Form.Label>
                                                        <Form.Select
                                                            name='type'
                                                            onChange={({ target }) => onChangeGarment("type", target.value, i)}
                                                        >
                                                            {
                                                                garments.map(g => (
                                                                    <option
                                                                        defaultValue={garment.type}
                                                                        value={g}>
                                                                        {g}
                                                                    </option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Descripción:</Form.Label>
                                                        <Form.Control
                                                            defaultValue={garment.description}
                                                            name='description'
                                                            onChange={({ target }) => onChangeGarment("description", target.value, i)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <Form.Group className='mb-3'>
                                                        <Form.Label>Observaciones:</Form.Label>
                                                        <Form.Control
                                                            defaultValue={garment.observations}
                                                            name='observations'
                                                            onChange={({ target }) => onChangeGarment("observations", target.value, i)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                        </Form>
                                    </Col>
                                    <Col>
                                        <h4>Servicios:</h4>
                                        {
                                            garment.services.map((service, is) => (
                                                <div id='service'>
                                                    {
                                                        is > 0 && (
                                                            <div className='text-end m-2'>
                                                                <CloseButton onClick={() => deleteServiceToGarment(i, is)} />
                                                            </div>
                                                        )
                                                    }
                                                    <Form.Select name='services' onChange={({ target }) => onChangeService(target, i, is)}>
                                                        {
                                                            services.map(({ name }) => (
                                                                <option value={name}>{name}</option>
                                                            ))
                                                        }
                                                    </Form.Select>
                                                    <Row>
                                                        <Col>Nombre: {service.name}</Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <p>Cantidad:</p>
                                                            <Form.Control
                                                                name="quantity"
                                                                defaultValue={service.quantity}
                                                                type='number'
                                                                onChange={({ target }) => onChangeServiceFields("quantity", target.value, i, is)}
                                                                onBlur={() => calculateTotal()}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <p>Precio:</p>
                                                            {
                                                                ["Lavado", "Plachado"].includes(service.name) ?
                                                                    service.unitPrice :
                                                                    <Form.Control
                                                                        type='number'
                                                                        name="unitPrice"
                                                                        defaultValue={service.unitPrice}
                                                                        onChange={({ target }) => onChangeServiceFields("unitPrice", target.value, i, is)}
                                                                        onBlur={() => calculateTotal()}
                                                                    />
                                                            }
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ))

                                        }
                                        <Button variant='success' className='mt-2' onClick={() => addServiceToGarment(i)}>Agregar Servicio</Button>
                                    </Col>
                                </Row>

                            </div>
                        ))
                    }
                    <h2>Total: {total}</h2>
                    <Row className='text-center m-3'>
                        <Button onClick={onSubmit}>Guardar</Button>
                    </Row>

                </Card.Body>
            </Card>
        </Container>
    )
}
