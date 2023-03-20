

import { Icon } from '@iconify/react'
import { DotSpinner } from '@uiball/loaders'

import styles from './Button.module.css'

export default function Button ({ text, type, icon, onClick, isLoading }) {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {isLoading
        ? (
          <DotSpinner size={20} color='#000' />
          )
        : (
          <>
            <p className={styles.text}>{text}</p>
            {icon && <Icon className={styles.icon} icon={icon} width='24' height='24' />}
          </>
          )}
    </button>
  )
}
