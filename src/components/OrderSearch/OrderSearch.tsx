import React, { useMemo } from 'react'
import { Order } from '@/types/orderTypes'
import { Box, Button, Paper, TextField } from '@mui/material'

type OrderSearchProps = {
  orders: Order[]
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const messages = {
  searchPlaceholder: 'Поиск по номеру заказа',
  totalOrders: 'Заказов всего: ',
  foundOrders: 'Найдено: ',
  resetButton: 'Сбросить',
}

export default function OrderSearch({
  orders,
  searchQuery,
  setSearchQuery,
}: OrderSearchProps) {
  const filteredOrders = useMemo(
    () =>
      orders.filter((order) =>
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [orders, searchQuery],
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            gap: 2,
            padding: 2,
          }}
        >
          <TextField
            size="small"
            placeholder={messages.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: '100%' }}
          />

          <Button variant="outlined" onClick={() => setSearchQuery('')}>
            {messages.resetButton}
          </Button>
        </Box>
        <Box
          sx={{
            paddingX: 2,
            display: 'flex',
            gap: 2,
          }}
        >
          <span>
            <strong>{messages.totalOrders}</strong>
            {orders.length}
          </span>
          {searchQuery && (
            <span>
              <strong>{messages.foundOrders}</strong>
              {filteredOrders.length}
            </span>
          )}
        </Box>
      </Paper>
    </Box>
  )
}
