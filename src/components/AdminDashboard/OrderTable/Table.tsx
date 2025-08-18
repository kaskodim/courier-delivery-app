import * as React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { CircularProgress, IconButton } from '@mui/material'
import { Order } from '@/types/orderTypes'
import DeleteIcon from '@mui/icons-material/Delete'
import { useOrderData } from '@/hooks/useOrderData'

type OrderTableProps = {
  orders: Order[]
  loading: boolean
}

export default function BasicTable({ orders, loading }: OrderTableProps) {

  const {deleteOrder} = useOrderData()



  // Обработчик удаления (пример)
  const handleDelete = (id: string) => {
    console.log('Удалить заказ:', id)
    // Логика удаления
    deleteOrder(id).then(()=>{
      console.log('deleted', id)
    }).catch((err)=>{
      console.log('ошибочка: ' , err)
    })





  }

  // Обработчик редактирования (пример)
  const handleEdit = (id: string) => {
    console.log('Редактировать заказ:', id)
    // Логика редактирования
  }

  // Определение колонок
  const columns: GridColDef[] = [
    {
      field: 'orderNumber',
      headerName: 'Номер заказа',
      minWidth: 150,
    },

    {
      field: 'orderType',
      headerName: 'Тип',
      width: 70,
      sortable: false,
    },

    { field: 'sender', headerName: 'Отправитель', width: 150, sortable: false },
    {
      field: 'recipient',
      headerName: 'Получатель',
      width: 150,
      sortable: false,
    },
    { field: 'orderStatus', headerName: 'Статус заказа', width: 150 },
    {
      field: 'comment',
      headerName: 'Комментарий к заказу',
      width: 200,
      sortable: false,
    },
    {
      field: 'accepted',
      headerName: 'Принят',
    },
    {
      field: 'id',
      headerName: 'ID',
      sortable: false,
      width: 50,
    },
    {
      field: 'courierId',
      headerName: 'Courier ID',
      width: 120,
      sortable: false,
    },
    { field: 'userId', headerName: 'User ID', width: 120, sortable: false },
    {
      field: 'actions',
      headerName: 'Действия',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleDelete(params.row.id)}
          color="error"
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]

  // Преобразование данных для DataGrid
  const rows = orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    orderType: order.orderType,
    sender: order.sender,
    recipient: order.recipient,
    orderStatus: order.orderStatus,
    comment: order.comment,
    accepted: order.accepted,
    courierId: order.courierId || '',
    userId: order.userId || '',
  }))

  // Состояние для пагинации
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading ? (
        <CircularProgress style={{ display: 'block', margin: 'auto' }} />
      ) : rows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Нет доступных заказов
        </div>
      ) : (
        <DataGrid
          sx={{
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#f1ecec',
            },
            '& .MuiDataGrid-columnSeparator': {
              color: 'black', // Черный цвет для полоски изменения ширины
            },
            '& .MuiDataGrid-iconSeparator': {
              color: 'black', // Черный цвет для иконки разделителя
            },
            '& .MuiDataGrid-columnHeadersInner': {
              '&:hover': {
                '& .MuiDataGrid-columnSeparator': {
                  visibility: 'visible', // Всегда показывать разделитель при наведении
                },
              },
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-row.Mui-selected': {
              backgroundColor: 'transparent',
            },
          }}
          disableColumnMenu={true}
          rows={rows}
          columns={columns}
          loading={loading}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25]}
          pagination
          getRowId={(row) => row.id}
          density="compact"
          columnHeaderHeight={70}
        />
      )}
    </div>
  )
}
