import React from 'react'
import { IOrderTable } from '../Interfaces'
import { Table } from 'react-bootstrap'

interface props {
    orders: IOrderTable[]
}

export const OrderTable = ({ orders }: props) => {
    return (
        <Table responsive striped bordered>
            <tr>
                <th>#</th>
                <th>Cliente:</th>
                <th>Recibido por:</th>
                <th>Recibido en:</th>
                <th>Estado</th>
                <th>Total</th>
            </tr>
            {
                orders.map((order, index)=>(
                    <tr>
                        <td>{index+1}</td>
                        <td>{order.client_name}</td>
                        <td>{order.user_name}</td>
                        <td>{order.created_at}</td>
                        <td>{order.state}</td>
                        <td>{order.total}</td>
                    </tr>
                ))
            }
        </Table>
    )
}
