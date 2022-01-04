import React from 'react'

// styles
import styles from 'components/components/ReadMoreButton.module.scss'

const ReadMoreButton = props => {
  console.log(props)
  const { currentState, onClick, type, viewport } = props
  const handleOnClick = () => {
    if (currentState === 'more') {
      onClick('less')
    } else {
      onClick('more')
    }
  }
  return viewport === 'mobile' ? (
    <div>
      {type === 'physiotherapy' ? (
        <p
          onClick={() => handleOnClick()}
          className={styles.m_p_readMore + ' ' + (currentState === 'less' ? ' ' : styles.expand)}
        >
          {currentState === 'less' ? '[leer mas…]' : '[Leer menos...]'}
          <span className={styles.p_bgArea} />
        </p>
      ) : type === 'nutrition' ? (
        <p
          onClick={() => handleOnClick()}
          className={styles.m_n_readMore + ' ' + (currentState === 'less' ? ' ' : styles.expand)}
        >
          {currentState === 'less' ? '[leer mas…]' : '[Leer menos...]'}
          <span className={styles.n_bgArea} />
        </p>
      ) : (
        <p
          onClick={() => handleOnClick()}
          className={styles.m_readMore + ' ' + (currentState === 'less' ? ' ' : styles.expand)}
        >
          {currentState === 'less' ? '[leer mas…]' : '[Leer menos...]'}
          <span className={styles.bgArea} />
        </p>
      )}
    </div>
  ) : (
    <div>
      {type === 'physiotherapy' ? (
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
      )}
    </div>
  )
}

export default ReadMoreButton
