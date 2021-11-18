import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import router from 'next/router'
import styles from './ResetPassword.module.scss'
import globalStyles from 'styles/GlobalStyles.module.scss'
import LoginImage from 'assets/images/login.png'
import CloseIcon from 'assets/images/close.svg'
import KeyImage from 'assets/images/key.png'
import toast from 'react-hot-toast'
import ReactLoading from 'react-loading'
import EyeCrossIcon from 'assets/images/eye-cross.svg'
import EyeIcon from 'assets/images/eye.svg'

import { Auth } from 'aws-amplify'

const ResetPassword = () => {
  const [progressStatus, setProgressStatus] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [showRepeatPass, setShowRepeatPass] = useState(false)

  const [email, setEmail] = useState('')
  const [verifyCode, setVerifyCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    setEmail(localStorage.getItem('email'))
  }, [])

  const handleSetShowPass = bool => {
    setShowPass(bool)
  }

  const handleSetShowRepeatPass = bool => {
    setShowRepeatPass(bool)
  }
  const handleChangeVerifyCode = event => {
    setVerifyCode(event.target.value)
  }
  const handleChangePassword = event => {
    setPassword(event.target.value)
  }
  const handleChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value)
  }

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error('Please confirm the password!')
      return
    }
    setProgressStatus(true)
    Auth.forgotPasswordSubmit(email.trim(), verifyCode.trim(), confirmPassword.trim())
      .then(response => {
        console.log(response)
        setProgressStatus(false)
        localStorage.removeItem('email')
        toast.success('Succesfully reset password!')
        router.push('/login')
      })
      .catch(error => {
        console.log(error)
        setProgressStatus(false)
        toast.error(error.message)
      })
  }

  return (
    <div className={'relative'}>
      <div className={'w-full h-screen flex grid grid-cols-12'}>
        <div className={'w-full col-span-6 flex flex-wrap justify-center items-center ' + styles.whiteArea}>
          <div className={styles.whiteAreaContent}>
            <div styles={'w-full'}>
              <Image src={LoginImage} alt="" width={484} height={416} />
            </div>
            <div className={'w-full text-center ' + styles.title}>El cambio comienza aqui</div>
            <div className={'w-full text-center ' + styles.text}>Estás a un paso de cambiar tu contraseña</div>
          </div>
        </div>
        <div className={'w-full col-span-6 flex flex-wrap justify-center items-center relative ' + styles.grayArea}>
          <div className={styles.closeButton}>
            <button
              className={'duration-200 hover:bg-gray-300 rounded-full p-3 flex justify-center items-center'}
              onClick={() => router.push('/')}
            >
              <Image src={CloseIcon} alt="" width={19} height={20} />
            </button>
          </div>
          <div className={styles.grayAreaContent}>
            <div className={'w-full flex justify-center'}>
              <Image src={KeyImage} alt="" width={167} height={136} />
            </div>
            <div className={'w-full text-center ' + styles.changePassTitle}>Cambia la contraseña</div>
            <div className={'w-full text-center mt-9 ' + styles.changePassText}>
              Estás a un paso de cambiar tu contraseña
            </div>
            <div className={'w-full mt-9 ' + styles.inputArea}>
              <input
                id="email"
                type="text"
                autoComplete="new-password"
                placeholder="Código de verificación"
                className={'w-full h-full border border-white rounded bg-transparent py-1 px-2 text-white'}
                value={email}
                disabled={true}
                onChange={handleChangeVerifyCode}
              />
            </div>
            <div className={'w-full mt-9 ' + styles.inputArea}>
              <input
                id="verify-code"
                type="text"
                autoComplete="new-password"
                placeholder="Código de verificación"
                className={'w-full h-full border border-white rounded bg-transparent py-1 px-2 text-white'}
                value={verifyCode}
                onChange={handleChangeVerifyCode}
              />
            </div>
            {/* password input */}
            <div className={'w-full relative flex items-center mt-5 ' + styles.inputArea}>
              <input
                id="new-password"
                type={showPass === true ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Contraseña"
                className={'w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10'}
                value={password}
                onChange={handleChangePassword}
              />
              <div className={'absolute right-3 cursor-pointer'}>
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
                id="confirm-password"
                autoComplete="new-password"
                type={showRepeatPass === true ? 'text' : 'password'}
                placeholder="Repetir contraseña"
                className={'w-full h-full border border-white rounded bg-transparent py-1 pl-2 text-white pr-10'}
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
              />
              <div className={'absolute right-3 cursor-pointer'}>
                {showRepeatPass === true ? (
                  <Image src={EyeIcon} alt="" width={17} height={17} onClick={() => handleSetShowRepeatPass(false)} />
                ) : (
                  <Image
                    src={EyeCrossIcon}
                    alt=""
                    width={17}
                    height={17}
                    onClick={() => handleSetShowRepeatPass(true)}
                  />
                )}
              </div>
            </div>
            {/* login button part */}

            {/* login button part */}
            <div className={'mt-5 flex justify-end items-center'}>
              <button className={styles.enterButton} onClick={handleResetPassword}>
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
      {progressStatus && (
        <div className={globalStyles.loadingArea}>
          <div className={globalStyles.loading}>
            <ReactLoading type={'spinningBubbles'} color="#006600" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
