import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { IClient } from '../Interfaces'

interface props {
  client: IClient;
  reload: () => Promise<void>;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditClient = ({ client, reload, close }: props) => {
  const [data, setData] = useState({})

  const submit = async () => {
    try {
      Swal.fire("Actualizando cliente")
      Swal.showLoading()
      await axios.put(`http://127.0.0.1:5000/clients/update/${client.id}`, data)
      Swal.fire("Cliente actualizado con exito", "", "success").then(()=>{
        close(false);
        reload();
      })
    } catch (error) {
      console.log(error)
      Swal.fire("Ocurrio un error al actualizar la prendas")
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
              <Form.Label>Nombre:</Form.Label>
              <Form.Control defaultValue={client.name} name='name' onChange={onChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Numero telefonico:</Form.Label>
              <Form.Control defaultValue={client.phone_number} name='phone_number' onChange={onChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Dirección:</Form.Label>
              <Form.Control defaultValue={client.address} name='address' onChange={onChange} />
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
