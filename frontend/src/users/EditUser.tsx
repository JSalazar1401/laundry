import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { IUser } from '../Interfaces'

interface props {
  user: IUser;
  reload: () => Promise<void>;
  close: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditUser = ({ user, reload, close }: props) => {
  const [data, setData] = useState(user)

  const submit = async () => {
    try {
      Swal.fire("Actualizando usuario")
      Swal.showLoading()
      await axios.put(`http://127.0.0.1:5000/users/update/${user.id}`, data)
      Swal.fire("Usuario actualizado con exito", "", "success").then(() => {
        close(false);
        reload();
      })
    } catch (error) {
      console.log(error)
      Swal.fire("Ocurrio un error al actualizar el usuario")
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
              <Form.Control defaultValue={data.name} name='name' onChange={onChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Correo:</Form.Label>
              <Form.Control defaultValue={data.email} name='email' onChange={onChange} />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Rol:</Form.Label>
              <Form.Select
                name='rol'
                onChange={onChange}
                defaultValue={data.rol}
              >
                <option value=""></option>
                <option value="administrator">Administrador</option>
                <option value="user">Usuario Normal</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado: <span color={data.state ? "green" : "red"}> {data.state ? "Activo" : "Inactivo"}</span></Form.Label>
              <Form.Switch defaultChecked={data.state} name='state' onChange={onChange} />
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
