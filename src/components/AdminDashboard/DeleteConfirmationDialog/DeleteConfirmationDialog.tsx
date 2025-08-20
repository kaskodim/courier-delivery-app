import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Backdrop,
} from '@mui/material'

type DeleteConfirmationDialogType = {
  open: boolean
  setOpen: (isOpen: boolean) => void
  deletionOrder: { id: string; number: string } | null
  handleDelete: (id: string) => void
}

const DeleteConfirmationDialog = ({
  handleDelete,
  deletionOrder,
  setOpen,
  open,
}: DeleteConfirmationDialogType) => {
  return (
    <>
      <Backdrop
        sx={{
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}
        open={open}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить заказ <strong>{deletionOrder?.number}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button
            onClick={() => deletionOrder && handleDelete(deletionOrder.id)}
            color="error"
            variant="contained"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteConfirmationDialog
