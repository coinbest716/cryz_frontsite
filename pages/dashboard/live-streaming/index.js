import SecondaryLayout from 'components/Layout/SecondaryLayout'
import styles from './LiveStreaming.module.scss'
import NotificationButton from 'components/components/dashboard/NotificationButton'
import Profile from 'components/components/dashboard/Profile'
import ReactPlayer from 'react-player'

const LiveStreaming = () => {
  const url = 'https://www.w3schools.com/html/mov_bbb.mp4'
  const materials = [
    {
      url: '/images/card1.jpg',
      label: 'Pesas de 2kg',
      count: '2 unidades',
    },
    {
      url: '/images/card1.jpg',
      label: 'Esterilla fina',
      count: '1 unidades',
    },
    {
      url: '/images/card1.jpg',
      label: 'Gomas elásticas',
      count: '3 unidades',
    },
  ]

  return (
    <div className={'h-fll pt-12 pl-14 pr-8 h-screen ' + styles.container}>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8 sm:col-span-12 pt-4">
          <div className={styles.title}>1 to 1 Streaming</div>
          <div className="pt-14">
            <ReactPlayer url={url} width="100%" height="100%" className={styles.reactPlayer} controls={true} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-4 sm:col-span-12">
          <div className="flex justify-end items-center">
            <div className="pr-4">
              <NotificationButton />
            </div>
            <Profile />
          </div>
          <div className="rounded-xl bg-white py-4 px-16 pb-10 mt-10">
            <div className={styles.material}>Material necesario</div>
            <div className="pt-7">
              {materials.map((item, index) => (
                <div className="flex justify-start py-2" key={index}>
                  <img
                    src={item.url}
                    alt=""
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                  <div className="pl-4 flex flex-col justify-around">
                    <div className={styles.label}>{item.label}</div>
                    <div className={styles.count}>{item.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LiveStreaming

LiveStreaming.getLayout = function getLayout(page) {
  return <SecondaryLayout>{page}</SecondaryLayout>
}
