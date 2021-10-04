import Link from 'next/link'
import Image from 'next/image'

// images
import PinterestIcon from 'assets/images/pinterest.svg'
import FacebookIcon from 'assets/images/facebook.svg'
import TwitterIcon from 'assets/images/twitter.svg'
import LinkedinIcon from 'assets/images/linkedin.svg'
import PinterestGrayIcon from 'assets/images/pinterest-gray.svg'
import FacebookGrayIcon from 'assets/images/facebook-gray.svg'
import TwitterGrayIcon from 'assets/images/twitter-gray.svg'
import LinkedinGrayIcon from 'assets/images/linkedin-gray.svg'

const SocialButtonGroup = props => {
  const { color, socialURL } = props
  return (
    <div className={'flex justify-between'}>
      <div className="mx-1">
        <Link href={socialURL.pinterest}>
          <button>
            <Image
              src={color === 'white' ? PinterestIcon : color === 'gray' ? PinterestGrayIcon : ''}
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
      <div className="mx-1">
        <Link href={socialURL.twitter}>
          <button>
            <Image
              src={color === 'white' ? TwitterIcon : color === 'gray' ? TwitterGrayIcon : ''}
              alt=""
              with={24}
              height={24}
            />
          </button>
        </Link>
      </div>
      <div className="mx-1">
        <Link href={socialURL.linkedin}>
          <button>
            <Image
              src={color === 'white' ? LinkedinIcon : color === 'gray' ? LinkedinGrayIcon : ''}
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
