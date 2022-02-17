import React, { useState } from 'react'

// next components
import Image from 'next/image'

// images and icons
import FilterGrayIcon from 'assets/images/filter-gray.svg'
import CloseGrayIcon from 'assets/images/close-gray.svg'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './CategoryFilter.module.scss'

const CategoryFilter = props => {
  const { categoryList, brandList, onClick, viewport } = props
  const [openCategory, setOpenCategory] = useState(false)
  return viewport === 'mobile' ? (
    <div className="relative w-full">
      <div
        className={'flex justify-between items-center cursor-pointer ' + styles.mobileFilterContainer}
        onClick={() => setOpenCategory(!openCategory)}
      >
        <p className={styles.filter}>Filtrar por</p>
        <Image src={FilterGrayIcon} alt="" width={17} height={14} />
      </div>
      {openCategory && (
        <div className={styles.mobileCategoryArea}>
          <div className={'flex justify-between pt-10 ' + styles.mobileTitleArea}>
            <div className={styles.mobileTitle}>Filtro</div>
            <button onClick={() => setOpenCategory(!openCategory)}>
              <Image src={CloseGrayIcon} alt="" width={16} height={16} />
            </button>
          </div>
          <div className="p-4">
            <div className={'flex justify-start ' + styles.mobileTitle}>Categorias</div>
            <div className="flex flex-wrap">
              {categoryList.length !== 0 &&
                categoryList.map((item, index) => (
                  <div key={index} className={styles.mobileChip} onClick={() => onClick(item.id)}>
                    {item.label}
                  </div>
                ))}
            </div>
            <div className={'flex justify-start mt-16 ' + styles.mobileTitle}>MARCAS</div>
            <div className="flex flex-wrap">
              {brandList.length !== 0 &&
                brandList.map((item, index) => (
                  <div key={index} className={styles.mobileChip} onClick={() => onClick(item.id)}>
                    {item.label}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
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
