import React, { useState } from 'react'

// next components
import Image from 'next/image'

// images and icons
import FilterGrayIcon from 'assets/images/filter-gray.svg'

// styles
import styles from './CategoryFilter.module.scss'

const CategoryFilter = props => {
  const { categoryList, brandList, onClick } = props
  const [openCategory, setOpenCategory] = useState(false)
  return (
    <div className="relative">
      <div
        className={'flex justify-between items-center cursor-pointer ' + styles.filterContainer}
        onClick={() => setOpenCategory(!openCategory)}
      >
        <p className={styles.filter}>Filtrar por</p>
        <Image src={FilterGrayIcon} alt="" width={17} height={14} />
      </div>
      {openCategory && (
        <div className={'absolute top-12 right-0 z-10 ' + styles.categoryArea}>
          <div className={styles.title}>Categorias</div>
          {categoryList.length !== 0 &&
            categoryList.map((item, index) => (
              <div key={index} className={styles.text} onClick={() => onClick(item.id)}>
                {item.label}
              </div>
            ))}
          <div className={styles.title}>MARCAS</div>
          {brandList.length !== 0 &&
            brandList.map((item, index) => (
              <div key={index} className={styles.text} onClick={() => onClick(item.id)}>
                {item.label}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default CategoryFilter
