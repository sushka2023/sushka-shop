import styles from '../BurgerMenu.module.scss'

import { motion } from 'framer-motion'
import { Fragment } from 'react/jsx-runtime'
import { useSelector } from 'react-redux'

import { AboutUsLink } from '../../header-nav/header-nav-list/AboutUsLink'
import { CatalogLink } from '../../header-nav/header-nav-list/CatalogLink'
import { ReviewLink } from '../../header-nav/header-nav-list/ReviewLink'
import { CooperationLink } from '../../header-nav/header-nav-list/CooperationLink'
import CrmLink from '../../header-nav/CrmLink'
import { RootState } from '../../../../../redux/store'
import { AccountButton } from './AccountButton'
import { FavoriteButton } from './FavoriteButton'
import { LoginButton } from './LoginButton'
import { MenuItemProps } from '../BurgerMenu'
import SearchBurger from '../../global-search/SearchBurger'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 0.3
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.3
    }
  }
}

export const MenuItem = ({ toggleOpen, isLessThan600px }: MenuItemProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)

  const menuItems = [
    {
      key: 'search',
      component: <SearchBurger />,
      condition: isLessThan600px
    },
    {
      key: 'account',
      component: <AccountButton />,
      condition: isLoggedIn
    },
    {
      key: 'favorite',
      component: <FavoriteButton />,
      condition: isLoggedIn
    },
    {
      key: 'catalog',
      component: <CatalogLink />,
      condition: true
    },
    {
      key: 'review',
      component: <ReviewLink />,
      condition: true
    },
    {
      key: 'aboutUs',
      component: <AboutUsLink toggleOpen={toggleOpen} />,
      condition: true
    },
    {
      key: 'cooperation',
      component: <CooperationLink />,
      condition: true
    },
    {
      key: 'crm',
      component: <CrmLink />,
      condition: isLoggedIn
    },
    {
      key: 'login',
      component: <LoginButton toggleOpen={toggleOpen} />,
      condition: true,
      className: isLoggedIn ? styles.loggedIn : '',
      disableClick: true
    }
  ]

  return (
    <Fragment>
      {menuItems.map(
        ({ key, component, condition, className = '', disableClick = false }) =>
          condition && (
            <motion.li
              onClick={disableClick ? undefined : () => toggleOpen(false)}
              key={key}
              className={`${styles.exampleLi} ${className}`}
              variants={variants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {component}
            </motion.li>
          )
      )}
    </Fragment>
  )
}
