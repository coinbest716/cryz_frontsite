import Link from 'next/link'
import Image from 'next/image'

// images
import InstagramIcon from 'assets/images/instagram.svg'
import FacebookIcon from 'assets/images/facebook.svg'
import InstagramGrayIcon from 'assets/images/instagram-gray.svg'
import FacebookGrayIcon from 'assets/images/facebook-gray.svg'

const SocialButtonGroup = props => {
  const { color, socialURL } = props
  return (
    <div className={'flex justify-between'}>
      <div className="mx-1">
        <Link href={socialURL.instagram}>
          <button>
            <Image
              src={color === 'white' ? InstagramIcon : color === 'gray' ? InstagramGrayIcon : ''}
              alt=""
              with={24}
              height={24}
            />
          </button>
        </Link>
      </div>
      <div className="mx-1">
        <Link href={socialURL.facebook}>
          <button>
            <Image
              src={color === 'white' ? FacebookIcon : color === 'gray' ? FacebookGrayIcon : ''}
              alt=""
              with={24}
              height={24}
            />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default SocialButtonGroup
