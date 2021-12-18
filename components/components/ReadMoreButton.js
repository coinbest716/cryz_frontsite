import React from 'react'

// styles
import styles from 'components/components/ReadMoreButton.module.scss'

const ReadMoreButton = props => {
  const { currentState, onClick, type } = props
  const handleOnClick = () => {
    if (currentState === 'more') {
      onClick('less')
    } else {
      onClick('more')
    }
  }
  return type === 'physiotherapy' ? (
    <p
      onClick={() => handleOnClick()}
      className={styles.p_readMore + ' ' + (currentState === 'less' ? ' ' : styles.expand)}
    >
      {currentState === 'less' ? '[leer mas…]' : '[Leer menos...]'}
      <span className={styles.p_bgArea} />
    </p>
  ) : type === 'nutrition' ? (
    <p
      onClick={() => handleOnClick()}
      className={styles.n_readMore + ' ' + (currentState === 'less' ? ' ' : styles.expand)}
    >
      {currentState === 'less' ? '[leer mas…]' : '[Leer menos...]'}
      <span className={styles.n_bgArea} />
    </p>
  ) : (
    <p
      onClick={() => handleOnClick()}
      className={styles.readMore + ' ' + (currentState === 'less' ? ' ' : styles.expand)}
    >
      {currentState === 'less' ? '[leer mas…]' : '[Leer menos...]'}
      <span className={styles.bgArea} />
    </p>
  )
}

export default ReadMoreButton
