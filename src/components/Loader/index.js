import { DotSpinner } from '@uiball/loaders'
import React from 'react'

import styles from './Loader.module.css'

export const Loader = () => {
  return (
    <div className={styles.loader_container}>
      <DotSpinner color="#fff" />
    </div>
  )
}
