import { Icon } from '@iconify/react'
import React from 'react'

import styles from './ButtonFilter.module.css'

export default function ButtonFilter({ text, icon }) {
  return (
    <button className={styles.btn_filter} type='button'>
      <Icon icon={icon} className={styles.btn_icon} />
      <span>{text}</span>
    </button>
  )
}
