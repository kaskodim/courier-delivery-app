'use client'

import React from 'react'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Order } from '@/types/orderTypes'

type OrderTableProps = {
  orders: Order[]
  loading: boolean
}

const OrderTable = ({ orders, loading }: OrderTableProps) => {
  // Конфигурация колонок
  const columns = [
    { field: 'id', header: 'id', sortable: true },
    { field: 'orderNumber', header: 'Номер заказа', sortable: true },
    { field: 'orderType', header: 'Тип' },
    { field: 'sender', header: 'Отправитель' },
    { field: 'recipient', header: 'Получатель' },
    { field: 'orderStatus', header: 'Статус заказа' },
    { field: 'comment', header: 'Комментарий к заказу' },
    { field: 'accepted', header: 'принят', sortable: true },
    { field: 'courierId', header: 'courier_id' },
    { field: 'userId', header: 'user_id' },
  ]

  // Шаблон для колонки "Действия"
  const actionBodyTemplate = (rowData: Order) => (
    <div className="flex gap-2">
      <Button icon="pi pi-trash" severity="danger" text size="small" />
      <Button icon="pi pi-pencil" severity="warning" text size="small" />
    </div>
  )

  return (
    <DataTable
      value={orders}
      loading={loading}
      paginator
      rows={10}
      emptyMessage="Нет доступных заказов"
      size="small"
      rowsPerPageOptions={[5, 10, 25, 50]}
    >
      {columns.map((col) => (
        <Column
          key={col.field} // нормальная ли практика? как исправить?
          field={col.field}
          header={col.header}
          sortable={col.sortable}
        />
      ))}
      <Column header="Действия" body={actionBodyTemplate} />
    </DataTable>
  )
}

export default OrderTable