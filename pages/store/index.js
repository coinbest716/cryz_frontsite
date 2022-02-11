import React, { useEffect, useState } from 'react'

// next components
import { useRouter } from 'next/router'
import Image from 'next/image'

// redux
import { useDispatch } from 'react-redux'

// third party components
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'
import StoreProductCard from 'components/Store/StoreProductCard'
import Selecter from 'components/Store/Selecter'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from './store.module.scss'

// images and icons
import Brand01 from 'assets/images/brand1.svg'
import Brand02 from 'assets/images/brand2.svg'
import Brand03 from 'assets/images/brand3.svg'
import Brand04 from 'assets/images/brand4.svg'

const Store = props => {
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
  const router = useRouter()
  const { viewport } = props
  const [category, setCategory] = useState(-1)
  const [products, setProducts] = useState([])
  const categoryList = [
    { id: 0, label: 'Material Deportivo' },
    { id: 1, label: 'Accessorios' },
    { id: 2, label: 'Salud y Belleza' },
    { id: 3, label: 'Productos Bio' },
  ]
  const [brandsList, setBrandsList] = useState([])

  const newProductList = [
    {
      id: 0,
      url: '/images/accessory.svg',
      name: 'Poke flannel marfa swag slow-carb narwhal',
      price: '265',
      discountPrice: '154',
    },
    {
      id: 1,
      url: '/images/accessory.svg',
      name: 'Poke flannel marfa swag slow-carb narwhal',
      price: '265',
      discountPrice: '',
    },
    {
      id: 2,
      url: '/images/accessory.svg',
      name: 'Poke flannel marfa swag slow-carb narwhal',
      price: '265',
      discountPrice: '154',
    },
    {
      id: 3,
      url: '/images/accessory.svg',
      name: 'Poke flannel marfa swag slow-carb narwhal',
      price: '265',
      discountPrice: '',
    },
    {
      id: 4,
      url: '/images/accessory.svg',
      name: 'Poke flannel marfa swag slow-carb narwhal',
      price: '265',
      discountPrice: '154',
    },
    {
      id: 5,
      url: '/images/accessory.svg',
      name: 'Poke flannel marfa swag slow-carb narwhal',
      price: '265',
      discountPrice: '',
    },
  ]

  // handlers
  useEffect(() => {
    setProducts(newProductList)
    setBrandsList([Brand01, Brand02, Brand03, Brand04])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickProduct = id => {
    router.push({
      pathname: '/store/detail',
      query: {
        id: id,
      },
    })
  }

  const handleChangeCategory = event => {
    setCategory(Number(event.target.value))
    router.push({
      pathname: '/store/category',
      query: {
        category: Number(event.target.value),
      },
    })
  }

  return (
    <>
      {viewport === 'mobile' ? (
        <div className={styles.m_container}>
          <div className="w-full p-4 my-5">Mobile Store Page</div>
        </div>
      ) : (
        <div className="pt-20">
          <div className={styles.header + ' mt-11 py-7'}>
            <div className={styles.subContainer}>
              <div className={globalStyles.container}>
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex justify-start items-center">
                    <Image src={'/images/product-2.svg'} alt="" width={23} height={20} />
                    <div className={styles.headerTitle + ' ml-3'}>Calidad garantizada</div>
                  </div>
                  <div className="flex justify-start items-center">
                    <Image src={'/images/product-2.svg'} alt="" width={23} height={20} />
                    <div className={styles.headerTitle + ' ml-3'}>Envio 48 / 72 horas</div>
                  </div>
                  <div className="flex justify-start items-center">
                    <Image src={'/images/product-3.svg'} alt="" width={23} height={20} />
                    <div className={styles.headerTitle + ' ml-3'}>Devolución 30 dias</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <div className={globalStyles.container + ' mt-8 mb-20'}>
              <div className="relative flex justify-center">
                <Image src={'/images/team-03.png'} alt="" width={1108} height={310} />
                <div className={'absolute top-11 left-8 ' + styles.mainImageTitle}>Descubre nuestras categorias</div>
                <div className="absolute -bottom-4">
                  <Selecter
                    title="Material Deportivo"
                    list={categoryList}
                    value={category}
                    onChange={event => handleChangeCategory(event)}
                  />
                </div>
              </div>
              <div className="mt-12">
                <div className={styles.newLabel + ' mb-3'}>Novedades</div>
                <div className={'grid grid-cols-3 gap-8 flex justify-center'}>
                  {products.map((item, index) => (
                    <StoreProductCard item={item} key={index} handleClickProduct={id => handleClickProduct(id)} />
                  ))}
                </div>
              </div>
              <div className="mt-20 mb-10">
                <div className={styles.brandTitle}>Nuestras Marcas</div>
                <div className="w-full flex flex-wrap justify-around items-center my-6">
                  <Carousel
                    showArrows={true}
                    showThumbs={false}
                    autoPlay={true}
                    stopOnHover={true}
                    showStatus={false}
                    showIndicators={true}
                    infiniteLoop={true}
                    centerMode={true}
                    centerSlidePercentage={20}
                    interval={2500}
                    className={'w-full'}
                  >
                    {brandsList?.map((item, index) => (
                      <div key={index}>
                        <Image src={item} alt="" width={100} height={40} />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Store

Store.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
