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
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import Chip from '@mui/material/Chip'
import { Order, OrderStatus } from '@/types/orderTypes'

type OrderTableProps = {
  orders: Order[]
  loading: boolean
}

export default function OrderTable({ orders, loading }: OrderTableProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  // Обработчик удаления
  const handleDelete = (id: string) => {
    console.log('Удалить заказ:', id)
    // Логика удаления
  }

  // Обработчик редактирования
  const handleEdit = (id: string) => {
    console.log('Редактировать заказ:', id)
    // Логика редактирования
  }

  // Функция для определения цвета статуса
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

  // Фильтрация заказов (оптимизировано с useMemo)
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const term = searchTerm.toLowerCase()
      return (
        order.orderNumber.toLowerCase().includes(term) ||
        order.sender.toLowerCase().includes(term) ||
        order.recipient.toLowerCase().includes(term) ||
        order.orderStatus.toLowerCase().includes(term) ||
        order.comment?.toLowerCase().includes(term)
      )
    })
  }, [orders, searchTerm])

  // Пагинация
  const paginatedOrders = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TableContainer component={Paper}>
      <div className={'p-2'}>
        <TextField
          placeholder="Поиск по номеру, отправителю, получателю, статусу..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: '16px' }}
        />
      </div>

      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#e6f3ff' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Номер заказа</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Тип</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Отправитель</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Получатель</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Статус заказа</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Комментарий к заказу</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Принят</TableCell>
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
                <TableCell>{order.courierId || 'N/A'}</TableCell>
                <TableCell>{order.userId || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(order.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(order.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
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
    </TableContainer>
  )
}