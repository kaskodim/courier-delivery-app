'use client'

import React, { useState } from 'react'
import { Order } from '@/types/orderTypes'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import DeleteConfirmationDialog from '@components/AdminDashboard/DeleteConfirmationDialog/DeleteConfirmationDialog'
import { useOrderData } from '@/hooks/useOrderData'
import { getOrderTableColumns } from '@components/AdminDashboard/OrderTable/getOrderTableColumns'
import {
  boxStyles,
  orderTableStyles,
  tableContainerStyles,
} from '@components/AdminDashboard/OrderTable/orderTableStyles'
import { COLUMN_HEADER_HEIGHT, PAGE_SIZE_OPTIONS } from '@/consnants'
import { GridInitialState } from '@mui/x-data-grid'

type OrderTableProps = {
  orders: Order[]
  loading: boolean
}
const dataGridInitialState: GridInitialState = {
  pagination: {
    paginationModel: {
      pageSize: PAGE_SIZE_OPTIONS[0],
    },
  },
}

const OrderTable = ({ orders, loading }: OrderTableProps) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [deletionOrder, setDeletionOrder] = useState<{ id: string; number: string } | null>(null)
  const { deleteOrder } = useOrderData()

  const handleViewOrder = (id: string) => {
    console.log('клик по иконке просмотра заказа: ', id)
  }
  const handleEditOrder = (id: string) => {
    console.log('Редактировать заказ:', id)
  }
  const handleDeleteOrder = async (id: string) => {
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
