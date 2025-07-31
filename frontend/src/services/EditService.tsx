import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { IServiceBackend } from '../Interfaces'

interface props {
  service: IServiceBackend;
  reload: () => Promise<void>;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditService = ({ service, reload, close }: props) => {
  const [data, setData] = useState({})

  const submit = async () => {
    try {
      Swal.fire("Actualizando servicio")
      Swal.showLoading()
      await axios.put(`http://127.0.0.1:5000/services/update/${service.id}`, data)
      Swal.fire("Servicio actualizado con exito", "", "success").then(()=>{
        close(false);
        reload();
      })
    } catch (error) {
      console.log(error)
      Swal.fire("Ocurrio un error al actualizar el servicio")
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
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Tipo:</Form.Label>
              <Form.Control defaultValue={service.name} name='name' onChange={onChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Descripcion:</Form.Label>
              <Form.Control defaultValue={service.description} name='description' onChange={onChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Precio:</Form.Label>
              <Form.Control type='number' defaultValue={service.price} name='price' onChange={onChange} />
            </Form.Group>
            <div className='text-center'>
              <Button onClick={() => submit()}>Actualizar</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
