import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// custom components
import BackButton from 'components/components/BackButton'
import ProductCounter from 'components/Store/ProductCounter'
import Selecter from 'components/Store/Selecter'

// third party components
import ImageGallery from 'react-image-gallery'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './mobile-detail.module.scss'

const MobileDetail = props => {
  const router = useRouter()
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  useEffect(() => {
    if (isMounted === true) {
      dispatch({ type: 'set', isLoading: false })
    }
  }, [isMounted, dispatch])
  // loading part end #######################

  // variables
  const { viewport } = props
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/',
    },
  ]
  const [productCount, setProductCount] = useState(1)

  const [variant, setVariant] = useState(-1)
  const [variantList, setVariantList] = useState([
    { id: 0, label: 'Material Deportivo' },
    { id: 1, label: 'Accessorios' },
    { id: 2, label: 'Salud y Belleza' },
    { id: 3, label: 'Productos Bio' },
  ])

  // handlers
  useEffect(() => {
    if (viewport !== 'mobile') {
      router.push('/store')
    }
  }, [viewport])

  const handleChangeCount = count => {
    if (count < 0) {
      setProductCount(0)
    } else {
      setProductCount(count)
    }
  }

  const handleChangeVariant = event => {
    setVariant(Number(event.target.value))
  }

  return (
    <>
      {viewport === 'mobile' && (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={'relative ' + globalStyles.container}>
              <div className={'absolute top-4 z-10'}>
                <BackButton viewport={viewport} />
              </div>
              <div>
                <div className="-ml-4 -mr-4">
                  <ImageGallery items={images} />
                </div>
                <div className={styles.contentContainer}>
                  <div className="flex justify-between">
                    <div className={styles.productRef}>Ref. 34790686</div>
                    <div className={styles.productRef}>NIKE</div>
                  </div>
                  <div className={'mt-4 ' + styles.productName}>
                    Fashion axe vegan single-origin cotton keffiyeh shoe
                  </div>

                  <div className="mt-4">
                    <ProductCounter count={productCount} onChange={count => handleChangeCount(count)} />
                  </div>
                  <div className={'mt-5 ' + styles.productDescription}>
                    In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. Integer et
                    elit eget elit facilisis tristique. Nam vel iaculis mauris. Sed ullamcorper tellus erat, non
                    ultrices sem tincidunt euismod. Fusce rhoncus porttitor velit, eu bibendum nibh aliquet vel. Fusce
                    lorem leo, vehicula at nibh quis, facilisis accumsan turpis.
                  </div>
                  <div className="w-full my-8">
                    <Selecter
                      title="Material Deportivo"
                      list={variantList}
                      value={variant}
                      onChange={event => handleChangeVariant(event)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={'w-full h-20 flex justify-between items-center ' + styles.bottomArea}>
            <div className="flex">
              <div className={'line-through mr-3 ' + styles.orgPrice}>200€</div>
              <div className={styles.disPrice}>120€</div>
            </div>
            <button className={'p-2 px-7 ' + styles.button} onClick={() => {}}>
              Comprar
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default MobileDetail
