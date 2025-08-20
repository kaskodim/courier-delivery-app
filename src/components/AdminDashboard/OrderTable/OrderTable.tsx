'use client'

import React, { useMemo, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import TablePagination from '@mui/material/TablePagination'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { Order, OrderStatus } from '@/types/orderTypes'
import { useOrderData } from '@/hooks/useOrderData'
import DeleteConfirmationDialog from '@components/AdminDashboard/DeleteConfirmationDialog/DeleteConfirmationDialog'
import { DataGrid } from '@mui/x-data-grid'

type OrderTableProps = {
  orders: Order[]
  loading: boolean
}

export default function OrderTable({ orders, loading }: OrderTableProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null)

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [deletionOrder, setDeletionOrder] = useState<{ id: string; number: string } | null>(null)

  const { deleteOrder } = useOrderData()

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

  const handleEdit = (id: string) => {
    console.log('Редактировать заказ:', id)
    // Логика редактирования
  }

  const viewOrderHandler = (id: string) => {
    console.log('клик по иконке:', id)
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

  const sortedOrders = useMemo(() => {
    const result = [...orders]
    if (sortDirection) {
      result.sort((a, b) => {
        if (sortDirection === 'asc') {
          return a.orderNumber.localeCompare(b.orderNumber)
        } else {
          return b.orderNumber.localeCompare(a.orderNumber)
        }
      })
    }
    return result
  }, [orders, sortDirection])

  const filteredOrders = useMemo(() => {
    return sortedOrders.filter((order) => {
      const term = searchTerm.toLowerCase()
      return (
        order.orderNumber.toLowerCase().includes(term) ||
        order.sender.toLowerCase().includes(term) ||
        order.recipient.toLowerCase().includes(term) ||
        order.orderStatus.toLowerCase().includes(term) ||
        order.comment?.toLowerCase().includes(term)
      )
    })
  }, [sortedOrders, searchTerm])

  const paginatedOrders = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSort = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
  }

  return (
    <>
      <TableContainer component={Paper}>
        <div className={'p-2'}>
          <TextField
            placeholder="Поиск по номеру, отправителю, получателю, статусу..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            variant="outlined"
            size="small"
          />
        </div>

        <div className={'flex items-center justify-between'}>
          <div className={'pl-4'}>Заказов всего: {orders.length}</div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Строк на странице:"
          />
        </div>



        <Table size={'small'}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e6f3ff' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={handleSort}>
                Номер заказа
                {sortDirection === 'asc' && <ArrowDropUpIcon fontSize="small" color="primary" />}
                {sortDirection === 'desc' && <ArrowDropDownIcon fontSize="small" color="primary" />}
                {!sortDirection && <ArrowDropUpIcon fontSize="small" sx={{ color: '#888' }} />}{' '}
                {/* CHANGE: Added default gray arrow */}
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Тип</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Отправитель</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Получатель</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Статус заказа</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Комментарий к заказу</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Принят курьером</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Courier ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  Нет доступных заказов
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>
                    <IconButton
                      color="default"
                      onClick={() => {
                        viewOrderHandler(order.id)
                      }}
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>{order.orderNumber}</TableCell>
                  <TableCell>{order.orderType}</TableCell>
                  <TableCell>{order.sender}</TableCell>
                  <TableCell>{order.recipient}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.orderStatus}
                      color={getStatusColor(order.orderStatus)}
                      variant="outlined"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{order.comment}</TableCell>
                  <TableCell>{order.accepted ? 'Да' : 'Нет'}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 50,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={order.courierId ? order.courierId : ''}
                  >
                    {order.courierId || 'N/A'}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 50,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={order.userId ? order.userId : ''}
                  >
                    {order.userId || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(order.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setDeletionOrder({ id: order.id, number: order.orderNumber })
                        setOpenDialog(true)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        deletionOrder={deletionOrder}
        handleDelete={handleDelete}
      />
    </>
  )
}
