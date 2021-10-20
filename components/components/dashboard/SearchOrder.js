import React from 'react'

// next component
import Image from 'next/image'

// styles
import styles from 'components/components/dashboard/SearchOrder.module.scss'

// images
import SearchIcon from 'assets/images/search.svg'

const SearchOrder = () => {
  return (
    <div className={styles.container}>
      <div className={'mr-4 flex items-center'}>
        <Image src={SearchIcon} alt="" width={18} height={18} />
      </div>
      <div className={styles.text}>
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 leading-tight focus:outline-none"
          type="text"
          placeholder="Buscar pedido"
          aria-label="Search Order"
        />
        {/* Buscar pedido */}
      </div>
    </div>
  )
}

export default SearchOrder
