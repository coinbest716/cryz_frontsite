import React from 'react'

// styles
import styles from 'components/components/ReadMoreButton.module.scss'

const ReadMoreButton = props => {
  const { currentState, onClick } = props
  const handleOnClick = () => {
    if (currentState === 'more') {
      onClick('less')
    } else {
      onClick('more')
    }
  }
  return (
    <p
      onClick={() => handleOnClick()}
      className={styles.readMore + ' ' + (currentState === 'less' ? ' ' : styles.expand)}
    >
      {/* currentState: more && less */}
      {currentState === 'less' ? '[leer mas…]' : '[Leer menos...]'}
    </p>
  )
}

export default ReadMoreButton