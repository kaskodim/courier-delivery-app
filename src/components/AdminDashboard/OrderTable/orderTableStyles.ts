import { SxProps, Theme } from '@mui/material'

export const orderTableStyles: SxProps<Theme> = {
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#9dbfd9',
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
    backgroundColor: '#D8E9F4FF',
  },
}

export const boxStyles: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

export const tableContainerStyles: SxProps<Theme> = {
  flex: 1,
  maxHeight: '100%',
}
