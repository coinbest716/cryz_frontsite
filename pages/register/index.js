import React from 'react'

// next components
import Image from 'next/image'
import router from 'next/router'

// styles
import styles from 'pages/register/Register.module.scss'

// images
import RegisterImage from 'assets/images/register.png'
import CloseIcon from 'assets/images/close.svg'
import EyeCrossIcon from 'assets/images/eye-cross.svg'
import EyeIcon from 'assets/images/eye.svg'

const Register = () => {
  const [showPass, setShowPass] = React.useState(false)
  const [showRepeatPass, setShowRepeatPass] = React.useState(false)

  const handleSetShowPass = bool => {
    setShowPass(bool)
  }

  const handleSetShowRepeatPass = bool => {
    setShowRepeatPass(bool)
  }

  return (
    <div className="w-full h-screen flex grid grid-cols-12">
      <div className={'w-full col-span-6 flex flex-wrap justify-center items-center ' + styles.whiteArea}>
        <div className={styles.whiteAreaContent}>
          <div styles={'w-full flex justify-center'}>
            <Image src={RegisterImage} alt="" width={342} height={415} />
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
          {/* repeat password input */}
          <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
            <input
              type={showRepeatPass === true ? 'text' : 'password'}
              placeholder="Repetir contraseña"
              className="w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10"
            />
            <div className="absolute right-3 cursor-pointer">
              {showRepeatPass === true ? (
                <Image src={EyeIcon} alt="" width={17} height={17} onClick={() => handleSetShowRepeatPass(false)} />
              ) : (
                <Image src={EyeCrossIcon} alt="" width={17} height={17} onClick={() => handleSetShowRepeatPass(true)} />
              )}
            </div>
          </div>
          {/* login button part */}
          <div className="mt-5 flex justify-end items-center">
            <div>
              <button className={styles.enterButton}>Entrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
