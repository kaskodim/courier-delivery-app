import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { Chip, IconButton } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { getStatusColor } from '@lib/utils/getStatusColor'

export const getOrderTableColumns = (
  handleViewOrder: (id: string) => void,
  handleEditOrder: (id: string) => void,
  setDeletionOrder: (order: { id: string; number: string } | null) => void,
  setOpenDialog: (open: boolean) => void,
): GridColDef[] => {
  return [
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
          onClick={() => handleViewOrder(params.row.id)}
          size="small"
          title="Посмотреть заказ"
          disabled
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
      flex: 1,
      sortable: false,
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
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleEditOrder(params.row.id)}
            disabled
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            size="small"
            onClick={() => {
              setDeletionOrder({
                id: params.row.id,
                number: params.row.orderNumber,
              })
              setOpenDialog(true)
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ]
}
