import styles from './crmClientAbout.module.scss'

import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import DoneIcon from '@mui/icons-material/Done'

import { ROLE_TRANSLATIONS } from '../crm-clients-page/CrmTableStickyHead'
import { Role } from '../../types'
import axiosInstance from '../../axios/settings'
import { changeRoleStyle, roleList, saveNewRole } from './style'
import ConfirmModal from './ConfirmModal'
import { User } from './CrmClientAbout'

const ROLES = ['admin', 'moderator', 'user']

type BasicMenuProps = {
  user: User
  userRole: string
  setUserRole: (role: Role) => void
}

export default function BasicMenu({
  user,
  userRole,
  setUserRole
}: BasicMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedRole, setSelectedRole] = React.useState<string>(user.role)
  const [openModal, setOpenModal] = React.useState<boolean>(false)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const handleMenuItemClick = (role: string) => setSelectedRole(role)

  const fetchChangeRole = async (role: string) => {
    try {
      const { data } = await axiosInstance.put(`/api/users/change_role`, {
        id: user.id,
        role,
        updated_at: new Date().toISOString()
      })
      setUserRole(data.role)
      setOpenModal(false)
    } catch (error) {
      console.error('Помилка зміни ролі:', error)
    }
  }

  const changeRole = () => fetchChangeRole(selectedRole)

  return (
    <Box className={styles.aboutClientBlock}>
      <ConfirmModal
        user={user}
        openModal={openModal}
        setOpenModal={setOpenModal}
        changeRole={changeRole}
        selectedRole={selectedRole}
      />
      <Box sx={changeRoleStyle}>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Typography variant="caption">Змінити роль</Typography>
          <KeyboardArrowDownIcon fontSize="large" />
        </Button>
        <Menu
          sx={roleList}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          {ROLES.map((item) => (
            <MenuItem onClick={() => handleMenuItemClick(item)} key={item}>
              {selectedRole === item && <DoneIcon />}
              <Typography variant="caption" className={styles[item]}>
                {ROLE_TRANSLATIONS[item as Role]}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Button
        disabled={selectedRole === userRole}
        onClick={() => setOpenModal(true)}
        sx={saveNewRole}
      >
        Зберегти
      </Button>
    </Box>
  )
}
