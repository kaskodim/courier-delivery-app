'use client'

import React, { useState } from 'react'
import { Order } from '@/types/orderTypes'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import { DataGrid, GridInitialState } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import DeleteConfirmationDialog from '@components/AdminDashboard/DeleteConfirmationDialog/DeleteConfirmationDialog'
import { getOrderTableColumns } from '@components/AdminDashboard/OrderTable/getOrderTableColumns'
import {
  boxStyles,
  orderTableStyles,
  tableContainerStyles,
} from '@components/AdminDashboard/OrderTable/orderTableStyles'
import { COLUMN_HEADER_HEIGHT, PAGE_SIZE_OPTIONS } from '@/consnants'

type OrderTableProps = {
  orders: Order[]
  loading: boolean
  deleteOrder: (id: string) => void
}
const dataGridInitialState: GridInitialState = {
  pagination: {
    paginationModel: {
      pageSize: PAGE_SIZE_OPTIONS[0],
    },
  },
}

const OrderTable = ({ loading, orders, deleteOrder }: OrderTableProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [deletionOrder, setDeletionOrder] = useState<{
    id: string
    number: string
  } | null>(null)

  const handleViewOrder = (id: string) => {
    console.log('клик по иконке просмотра заказа: ', id)
  }
  const handleEditOrder = (id: string) => {
    console.log('Редактировать заказ:', id)
  }
  const handleDeleteOrder = (id: string) => {
    setOpenDialog(false)
    deleteOrder(id)
    setDeletionOrder(null)
  }

  const columns = getOrderTableColumns(
    handleViewOrder,
    handleEditOrder,
    setDeletionOrder,
    setOpenDialog,
  )

  return (
    <Box sx={boxStyles}>
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <DataGrid
          rows={orders}
          columns={columns}
          loading={loading}
          initialState={dataGridInitialState}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          disableRowSelectionOnClick
          sx={orderTableStyles}
          disableColumnMenu
          density="compact"
          columnHeaderHeight={COLUMN_HEADER_HEIGHT}
          localeText={{ noRowsLabel: 'Заказы не найдены' }}
        />
      </TableContainer>
      <DeleteConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        deletionOrder={deletionOrder}
        handleDelete={handleDeleteOrder}
      />
    </Box>
  )
}

export default OrderTable
