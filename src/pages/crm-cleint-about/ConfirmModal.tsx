import React from 'react'
import ModalDialog from '../../components/Crm-Modal-Confirmation/ModalDialog'
import { Button } from '../../components/UI/Button'
import { User } from './CrmClientAbout'

type ConfirmModalProps = {
  user: User
  openModal: boolean
  setOpenModal: (open: boolean) => void // Функція для зміни стану
  changeRole: any
  selectedRole: any
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  user,
  openModal,
  setOpenModal,
  changeRole,
  selectedRole
}) => {
  console.log(selectedRole)

  return (
    <ModalDialog
      open={openModal}
      // onClose={handleClose}
      onClose={() => setOpenModal(false)}
      title="Змінити роль користувача"
      content={`Ви впевнені, що хочете змінити роль користувача ${user.email}?`}
      actions={
        <React.Fragment>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Скасувати
          </Button>
          <Button
            onClick={() => changeRole(selectedRole)}
            color="primary"
            autoFocus
          >
            Так, змінити
          </Button>
        </React.Fragment>
      }
    />
  )
}

export default ConfirmModal
