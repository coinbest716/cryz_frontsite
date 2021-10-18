import React from 'react'

// next components
import Image from 'next/image'
import router from 'next/router'

// custom components
import CommonButton from 'components/components/purchaseLogin/CommonButton'

// styles
import styles from 'pages/login/login.module.scss'

// images
import LoginImage from 'assets/images/login.png'
import CloseIcon from 'assets/images/close.svg'
import EyeCrossIcon from 'assets/images/eye-cross.svg'
import EyeIcon from 'assets/images/eye.svg'

const Login = () => {
  const [showPass, setShowPass] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)

  const handleSetShowPass = bool => {
    setShowPass(bool)
  }

  const handleSetRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  const handleClickFacebook = () => {
    console.log('handleClickFacebook')
  }

  const handleClickGoogle = () => {
    console.log('handleClickGoogle')
  }

  return (
    <div className="w-full h-screen flex grid grid-cols-12">
      <div className={'w-full col-span-6 flex flex-wrap justify-center items-center ' + styles.whiteArea}>
        <div className={styles.whiteAreaContent}>
          <div styles={'w-full'}>
            <Image src={LoginImage} alt="" width={484} height={416} />
          </div>
          <div className={'w-full text-center ' + styles.title}>El cambio comienza aqui</div>
          <div className={'w-full text-center ' + styles.text}>
            Siéntete mejor y con mayor calidad de vida desde ahora mismo.
          </div>
        </div>
      </div>
      <div className={'w-full col-span-6 flex flex-wrap justify-center items-center relative ' + styles.grayArea}>
        <div className={styles.closeButton}>
          <button
            className="duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center"
            onClick={() => router.push('/')}
          >
            <Image src={CloseIcon} alt="" width={19} height={20} />
          </button>
        </div>
        <div className={styles.grayAreaContent}>
          <div className="w-full flex justify-start">
            <button className={styles.loginButton} onClick={() => router.push('/login')}>
              LOGIN
            </button>
            <button className={styles.registerButton} onClick={() => router.push('/register')}>
              REGISTRO
            </button>
          </div>
          {/* email input */}
          <div className={'w-full mt-9 ' + styles.inputArea}>
            <input
              type="text"
              placeholder="Email"
              className="w-full h-full border border-white rounded bg-transparent py-1 px-2 text-white"
            />
          </div>
          {/* password input */}
          <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
            <input
              type={showPass === true ? 'text' : 'password'}
              placeholder="Contraseña"
              className="w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10"
            />
            <div className="absolute right-3 cursor-pointer">
              {showPass === true ? (
                <Image src={EyeIcon} alt="" width={17} height={17} onClick={() => handleSetShowPass(false)} />
              ) : (
                <Image src={EyeCrossIcon} alt="" width={17} height={17} onClick={() => handleSetShowPass(true)} />
              )}
            </div>
          </div>
          {/* login button part */}
          <div className="mt-5 flex justify-between items-center">
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className={'form-checkbox cursor-pointer ' + styles.checkbox}
                  onChange={() => handleSetRememberMe()}
                  checked={rememberMe}
                />
                <span className="ml-2" onChange={() => handleSetRememberMe()}>
                  Recuérdame
                </span>
              </label>
            </div>
            <div>
              <button className={styles.enterButton}>Entrar</button>
            </div>
          </div>
          {/* forgot password part */}
          <div
            className={'mt-3.5 flex justify-end items-center ' + styles.forgotPass}
            onClick={() => router.push('forgot-password')}
          >
            Olvidaste contraseña
          </div>
          {/* ------------------- or ------------------- part */}
          <div className="mt-11 flex justify-between items-center">
            <div className={styles.line} />
            <div className={styles.orText}>or</div>
            <div className={styles.line} />
          </div>
          {/* facebook button */}
          <div className="mt-11">
            <CommonButton handleClick={handleClickFacebook} label={'LOGIN CON FACEBOOK'} type={'facebook'} />
          </div>
          {/* google button */}
          <div className="mt-6">
            <CommonButton handleClick={handleClickGoogle} label={'LOGIN CON GOOGLE'} type={'google'} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
