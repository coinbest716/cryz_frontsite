import React, { useEffect, useState } from 'react'

// redux
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import BackButton from 'components/components/BackButton'
import ProductCounter from 'components/Store/ProductCounter'
import Selecter from 'components/Store/Selecter'

// third party components
import ImageGallery from 'react-image-gallery'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './detail.module.scss'

const Detail = props => {
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
      {viewport === 'mobile' ? (
        <div className={styles.m_container}>Mobile Detail Page</div>
      ) : (
        <div className={'flex flex-wrap justify-center'}>
          <div className={styles.container}>
            <div className={globalStyles.container + ' my-20'}>
              <div className={'mt-9'}>
                <BackButton viewport={viewport} />
              </div>
              <div className={'grid grid-cols-12 gap-8'}>
                <div className={'col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-7 pt-8'}>
                  <ImageGallery items={images} />
                </div>
                <div className={'col-span-12 sm:col-span-12 md:col-span-5 lg:col-span-5 pt-8'}>
                  <div className={styles.productRef}>Ref. 34790686</div>
                  <div className={'mt-4 ' + styles.productName}>
                    Fashion axe vegan single-origin cotton keffiyeh shoe
                  </div>
                  <div className="mt-6 flex flex-wrap ">
                    <div className={'line-through mr-3 ' + styles.orgPrice}>200€</div>
                    <div className={styles.disPrice}>120€</div>
                  </div>
                  <div className={'mt-4 ' + styles.productCompanyName}>NIKE</div>
                  <div className="mt-4">
                    <ProductCounter count={productCount} onChange={count => handleChangeCount(count)} />
                  </div>
                  <div className={'mt-5 ' + styles.productDescription}>
                    In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. Integer et
                    elit eget elit facilisis tristique. Nam vel iaculis mauris. Sed ullamcorper tellus erat, non
                    ultrices sem tincidunt euismod. Fusce rhoncus porttitor velit, eu bibendum nibh aliquet vel. Fusce
                    lorem leo, vehicula at nibh quis, facilisis accumsan turpis.
                  </div>
                  <div className="mt-4">
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
        </div>
      )}
    </>
  )
}

export default Detail

Detail.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
