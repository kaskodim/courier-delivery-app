'use client'

import React, { useState } from 'react'
import { Order, OrderStatus } from '@/types/orderTypes'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Box, Chip } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteConfirmationDialog from '@components/AdminDashboard/DeleteConfirmationDialog/DeleteConfirmationDialog'
import { useOrderData } from '@/hooks/useOrderData'

type OrderTableProps = {
  orders: Order[]
  loading: boolean
}

const OrderTable = ({ orders, loading }: OrderTableProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [deletionOrder, setDeletionOrder] = useState<{ id: string; number: string } | null>(null)
  const { deleteOrder } = useOrderData()

  const viewOrderHandler = (id: string) => {
    console.log('клик по иконке просмотра: ', id)
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status.toLowerCase()) {
      case OrderStatus.delivered:
        return 'success'
      case OrderStatus.accepted:
        return 'primary'
      case OrderStatus.ready:
        return 'info'
      case OrderStatus.notReady:
        return 'warning'
      default:
        return 'default'
    }
  }

  const handleEdit = (id: string) => {
    console.log('Редактировать заказ:', id)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id)
      console.log(`заказ ${id} удален`)
    } catch (err) {
      console.error('Ошибка при удалении заказа:', err)
    } finally {
      setOpenDialog(false)
      setDeletionOrder(null)
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
      sortable: false,
    },
    {
      field: 'viewOrder',
      headerName: '',
      minWidth: 60,
      maxWidth: 60,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => {
            viewOrderHandler(params.row.id)
          }}
          size="small"
          title={'Посмотреть заказ'}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: 'orderNumber',
      headerName: 'Номер заказа',
      sortable: true,
      minWidth: 150,
    },
    {
      field: 'orderType',
      headerName: 'Тип заказа',
      minWidth: 100,
      sortable: false,
    },
    {
      field: 'sender',
      headerName: 'Отправитель',
      minWidth: 150,
      sortable: false,
      flex: 1,
    },
    {
      field: 'recipient',
      headerName: 'Получатель',
      minWidth: 150,
      sortable: false,
      flex: 1,
    },
    {
      field: 'orderStatus',
      headerName: 'Статус',
      minWidth: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={getStatusColor(params.value)}
          variant="outlined"
        />
      ),
    },
    {
      field: 'comment',
      headerName: 'Комментарий',
      minWidth: 200,
      sortable: false,
      valueGetter: (value) => value || '—',
    },
    {
      field: 'accepted',
      headerName: 'Принят',
      minWidth: 100,
      sortable: true,
      renderCell: (params) => (params.value ? 'Да' : 'Нет'),
    },
    {
      field: 'courierId',
      headerName: 'courierId',
      minWidth: 100,
      sortable: false,
    },
    {
      field: 'userId',
      headerName: 'userId',
      minWidth: 100,
      sortable: false,
    },
    {
      field: 'actions',
      headerName: 'Действия',
      minWidth: 100,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <IconButton color="primary" size={'small'} onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            size={'small'}
            onClick={() => {
              setDeletionOrder({ id: params.row.id, number: params.row.orderNumber })
              setOpenDialog(true)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ]

  const rows = orders.map((order) => ({
    ...order,
  }))

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <TableContainer component={Paper} sx={{ flex: 1, maxHeight: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[10, 15, 20]}
          disableRowSelectionOnClick
          sx={{
            height: '100%',
            width: '100%',
            boxSizing: 'border-box',


            '& .MuiDataGrid-columnHeader:focus': {
              outline: 'none !important',
            },



            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-cell:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiToolbar-root': {
              backgroundColor: '#dbebf6',
            },
          }}
          disableColumnMenu
          density="compact"
          columnHeaderHeight={70}
        />
      </TableContainer>
      <DeleteConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        deletionOrder={deletionOrder}
        handleDelete={handleDelete}
      />
    </Box>
  )
}

export default OrderTable
