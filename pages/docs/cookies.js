import React, { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

// redux
import { useDispatch } from 'react-redux'

// custom components
import PrimaryLayout from 'components/Layout/PrimaryLayout'

// styles
import globalStyles from 'styles/GlobalStyles.module.scss'
import styles from 'pages/docs/index.module.scss'

const Cookies = () => {
  // loading part ###########################
  const dispatch = useDispatch()
  const [isMounted, setIsMounted] = useState(false)
  const [mobile, setMobile] = useState(null)

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

  useEffect(() => {
    setMobile(isMobile)
  }, [setMobile])

  return (
    <div className={'flex justify-center'}>
      <div className={globalStyles.container}>
        <div className={mobile ? styles.mobileTitle : styles.title}>Política de cookies</div>
        <div className={mobile ? styles.mobileDivider : styles.divider} />
        <div className={mobile && styles.mobileContent}>
          {/* paragraph */}
          <div className={styles.text}>Crody Salud S.L. informa acerca del uso de las cookies en su página web:</div>
          {/* paragraph */}
          <div className={styles.text}>
            <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <strong>¿Qué son las cookies?</strong>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            Las cookies son archivos que se pueden descargar en su equipo a través de las páginas web. Son herramientas
            que tienen un papel esencial para la prestación de numerosos servicios de la sociedad de la información.
            Entre otros, permiten a una página web almacenar y recuperar información sobre los hábitos de navegación de
            un usuario o de su equipo y, dependiendo de la información obtenida, se pueden utilizar para reconocer al
            usuario y mejorar el servicio ofrecido.
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <strong>Tipos de cookies</strong>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            Según quien sea la entidad que gestione el dominio desde donde se envían las cookies y trate los datos que
            se obtengan se pueden distinguir dos tipos:
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies propias: Aquéllas que se envían al equipo terminal del usuario desde un equipo o dominio
              gestionado por el propio editor y desde el que se presta el servicio solicitado por el usuario.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies de terceros: Aquéllas que se envían al equipo terminal del usuario desde un equipo o dominio que
              no es gestionado por el editor, sino por otra entidad que trata los datos obtenidos través de las cookies.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            En el caso de que las cookies sean instaladas desde un equipo o dominio gestionado por el propio editor pero
            la información que se recoja mediante éstas sea gestionada por un tercero, no pueden ser consideradas como
            cookies propias.
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            Existe también una segunda clasificación según el plazo de tiempo que permanecen almacenadas en el navegador
            del cliente, pudiendo tratarse de:
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies de sesión: Diseñadas para recabar y almacenar datos mientras el usuario accede a una página web.
              Se suelen emplear para almacenar información que solo interesa conservar para la prestación del servicio
              solicitado por el usuario en una sola ocasión (p.e. una lista de productos adquiridos).
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies persistentes: Los datos siguen almacenados en el terminal y pueden ser accedidos y tratados
              durante un periodo definido por el responsable de la cookie, y que puede ir de unos minutos a varios años.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            En el caso de que las cookies sean instaladas desde un equipo o dominio gestionado por el propio editor pero
            la información que se recoja mediante éstas sea gestionada por un tercero, no pueden ser consideradas como
            cookies propias.
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            Existe también una segunda clasificación según el plazo de tiempo que permanecen almacenadas en el navegador
            del cliente, pudiendo tratarse de:
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies de sesión: Diseñadas para recabar y almacenar datos mientras el usuario accede a una página web.
              Se suelen emplear para almacenar información que solo interesa conservar para la prestación del servicio
              solicitado por el usuario en una sola ocasión (p.e. una lista de productos adquiridos).
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies persistentes: Los datos siguen almacenados en el terminal y pueden ser accedidos y tratados
              durante un periodo definido por el responsable de la cookie, y que puede ir de unos minutos a varios años.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <strong>
              Por último, existe otra clasificación con seis tipos de cookies según la finalidad para la que se traten
              los datos obtenidos:
            </strong>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies técnicas: Aquellas que permiten al usuario la navegación a través de una página web, plataforma o
              aplicación y la utilización de las diferentes opciones o servicios que en ella existan como, por ejemplo,
              controlar el tráfico y la comunicación de datos, identificar la sesión, acceder a partes de acceso
              restringido, recordar los elementos que integran un pedido, realizar el proceso de compra de un pedido,
              realizar la solicitud de inscripción o participación en un evento, utilizar elementos de seguridad durante
              la navegación, almacenar contenidos para la difusión de vídeos o sonido o compartir contenidos a través de
              redes sociales.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies de personalización: Permiten al usuario acceder al servicio con algunas características de
              carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por
              ejemplo serian el idioma, el tipo de navegador a través del cual accede al servicio, la configuración
              regional desde donde accede al servicio, etc.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies de análisis: Permiten al responsable de las mismas, el seguimiento y análisis del comportamiento
              de los usuarios de los sitios web a los que están vinculadas. La información recogida mediante este tipo
              de cookies se utiliza en la medición de la actividad de los sitios web, aplicación o plataforma y para la
              elaboración de perfiles de navegación de los usuarios de dichos sitios, aplicaciones y plataformas, con el
              fin de introducir mejoras en función del análisis de los datos de uso que hacen los usuarios del servicio.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies publicitarias: Permiten la gestión, de la forma más eficaz posible, de los espacios publicitarios.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies de publicidad comportamental: Almacenan información del comportamiento de los usuarios obtenida a
              través de la observación continuada de sus hábitos de navegación, lo que permite desarrollar un perfil
              específico para mostrar publicidad en función del mismo.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Cookies de redes sociales externas: Se utilizan para que los visitantes puedan interactuar con el
              contenido de diferentes plataformas sociales (facebook, youtube, twitter, linkedIn, etc..) y que se
              generen únicamente para los usuarios de dichas redes sociales. Las condiciones de utilización de estas
              cookies y la información recopilada se regula por la política de privacidad de la plataforma social
              correspondiente.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <strong>Desactivación y eliminación de cookies</strong>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            Tienes la opción de permitir, bloquear o eliminar las cookies instaladas en tu equipo mediante la
            configuración de las opciones del navegador instalado en su equipo. Al desactivar cookies, algunos de los
            servicios disponibles podrían dejar de estar operativos. La forma de deshabilitar las cookies es diferente
            para cada navegador, pero normalmente puede hacerse desde el menú Herramientas u Opciones. También puede
            consultarse el menú de Ayuda del navegador dónde puedes encontrar instrucciones. El usuario podrá en
            cualquier momento elegir qué cookies quiere que funcionen en este sitio web.
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de
            las opciones del navegador instalado en su ordenador:
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4 break-words'}>
              Microsoft Internet Explorer o Microsoft Edge:&nbsp;
              <a href="http://windows.microsoft.com/es-es/windows-vista/Block-or-allow-cookies">
                http://windows.microsoft.com/es-es/windows-vista/Block-or-allow-cookies
              </a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4 break-words'}>
              Mozilla Firefox:&nbsp;
              <a href="http://support.mozilla.org/es/kb/impedir-que-los-sitios-web-guarden-sus-preferencia">
                http://support.mozilla.org/es/kb/impedir-que-los-sitios-web-guarden-sus-preferencia
              </a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4 break-words'}>
              Chrome:&nbsp;
              <a href="https://support.google.com/accounts/answer/61416?hl=es">
                https://support.google.com/accounts/answer/61416?hl=es
              </a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4 break-words'}>
              Safari:&nbsp;
              <a href="http://safari.helpmax.net/es/privacidad-y-seguridad/como-gestionar-las-cookies/">
                http://safari.helpmax.net/es/privacidad-y-seguridad/como-gestionar-las-cookies/
              </a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4 break-words'}>
              Opera:&nbsp;
              <a href="http://help.opera.com/Linux/10.60/es-ES/cookies.html">
                http://help.opera.com/Linux/10.60/es-ES/cookies.html
              </a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            Además, también puede gestionar el almacén de cookies en su navegador a través de herramientas como las
            siguientes:
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4 break-words'}>
              Ghostery:&nbsp;
              <a href="www.ghostery.com">www.ghostery.com</a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4 break-words'}>
              Your Online Choices:&nbsp;
              <a href="www.youronlinechoices.com/es/">www.youronlinechoices.com/es/</a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            Cookies utilizadas en&nbsp;<a href="https://crysdyazandco.com/">https://crysdyazandco.com/</a>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            A continuación se identifican las cookies que están siendo utilizadas en este portal así como su tipología y
            función:
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>_utma</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 2 años a partir de su instalación o actualización.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Recopila información anónima sobre la navegación de los usuarios por el sitio web con el fin
              de conocer el origen de las visitas y otros datos estadísticos. Esta cookie normalmente se almacena en el
              navegador en la primera visita a nuestro sitio web. Si la cookie ha sido borrada a través del navegador y
              posteriormente vuelve a visitar nuestro sitioweb, una nueva cookie del tipo _utma se escribe con un ID
              único diferente. Esta cookie se utiliza para determinar visitantes únicos a nuestro sitio web y se
              actualiza con cada vista de página. Adicionalmente, esta cookie proporciona un identificador único que
              Google Analytics utiliza para asegurar la validez y la accesibilidad de la cookie, así como una medida de
              seguridad extra.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>_utmb</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 30 minutos
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Almacena información sobre la actividad de la visita a nuestro sitio web y principalmente la
              duración de ésta.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>_utmc</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: Sesión
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Almacena información sobre la actividad de la visita a nuestro sitio web y principalmente la
              duración de ésta.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>_utmz</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 6 meses a partir de su instalación o actualización.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Esta cookie normalmente se almacena en el navegador en la primera visita a nuestro sitio web.
              Esta cookie almacena cómo ha llegado el visitante a nuestro sitio web, ya sea directamente introduciendo
              la dirección del dominio, un enlace, una búsqueda web o un anuncio. La cookie se actualiza cada vez que
              visita nuestra web.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>_ga</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 2 años
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle', wordBreak: 'break-word' }}>
              Descripción: Sirve para distinguir a los usuarios. Generada por Google Analytics. Google almacena la
              informacion recogida por las cookies en servidores ubicados en Estados Unidos, cumpliendo con la
              legislación Europea en cuanto a protección de datos personales y se compromete a no compartirla con
              terceros, excepto cuando la ley le obligue a ello o sea necesario para el funcionamiento del sistema.
              Google no asocia su direccion IP con ninguna otra informacion que tenga. Si desea obtener mas informacion
              acerca de las cookies usadas por Google Analytics, por favor acceda a esta direccion:
              <br />
              <a href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es&csw=1">
                https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es&csw=1
              </a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>_gat</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 1 minuto
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle', wordBreak: 'break-word' }}>
              Descripción: Utilizada para mostrar nuestra publicidad en otras páginas de la red de Google. Generada por
              Google Analytics. Google almacena la informacion recogida por las cookies en servidores ubicados en
              Estados Unidos, cumpliendo con la legislación Europea en cuanto a protección de datos personales y se
              compromete a no compartirla con terceros, excepto cuando la ley le obligue a ello o sea necesario para el
              funcionamiento del sistema. Google no asocia su direccion IP con ninguna otra informacion que tenga. Si
              desea obtener mas informacion acerca de las cookies usadas por Google Analytics, por favor acceda a esta
              direccion:
              <a
                href={
                  'https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es&csw=1'
                }
              >
                https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es&csw=1
              </a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Publicidad comportamental
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>_gid</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 24 horas
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle', wordBreak: 'break-word' }}>
              o Descripción: Generada por Google Analytics. Google almacena la informacion recogida por las cookies en
              servidores ubicados en Estados Unidos, cumpliendo con la legislación Europea en cuanto a protección de
              datos personales y se compromete a no compartirla con terceros, excepto cuando la ley le obligue a ello o
              sea necesario para el funcionamiento del sistema. Google no asocia su direccion IP con ninguna otra
              informacion que tenga. Si desea obtener mas informacion acerca de las cookies usadas por Google Analytics,
              por favor acceda a esta direccion:
              <a
                href={'https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es&csw'}
              >
                https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?hl=es&csw
              </a>
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Publicidad comportamental
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>APISID</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 2 años
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Al crear o iniciar sesión en una cuenta de Google se almacenan esta cookie en su ordenador
              con el fin de permanecer conectado a su cuenta de Google al visitar sus servicios de nuevo. Mientras
              permanezca con esta sesión activa y use complementos en otros sitios Web como el nuestro, Google hará uso
              de estas cookies para mejorar su experiencia de uso.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>HSID</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 2 años
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Al crear o iniciar sesión en una cuenta de Google se almacenan esta cookie en su ordenador
              con el fin de permanecer conectado a su cuenta de Google al visitar sus servicios de nuevo. Mientras
              permanezca con esta sesión activa y use complementos en otros sitios Web como el nuestro, Google hará uso
              de estas cookies para mejorar su experiencia de uso.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>LOGIN_INFO</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 2 años
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: En algunas páginas de nuestro Sitio Web tenemos vídeos incrustados de Youtube, es un servicio
              de Google. Su uso implica la remisión de esta cookie además de las cookies que Google requiere si mantiene
              la sesión activa con su cuenta, con el propósito de visualizar los vídeos incrustados, estimar el ancho de
              banda y mostrar cuantas veces se ha reproducido.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>PREF</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 2 años
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Al crear o iniciar sesión en una cuenta de Google se almacenan esta cookie en su ordenador
              con el fin de permanecer conectado a su cuenta de Google al visitar sus servicios de nuevo. Mientras
              permanezca con esta sesión activa y use complementos en otros sitios Web como el nuestro, Google hará uso
              de estas cookies para mejorar su experiencia de uso.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>SAPISID</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 2 años
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: En algunas páginas de nuestro Sitio Web tenemos vídeos incrustados de Youtube, es un servicio
              de Google. Su uso implica la remisión de esta cookie además de las cookies que Google requiere si mantiene
              la sesión activa con su cuenta, con el propósito de visualizar los vídeos incrustados, estimar el ancho de
              banda y mostrar cuantas veces se ha reproducido.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>SID</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 2 años
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Al crear o iniciar sesión en una cuenta de Google se almacenan esta cookie en su ordenador
              con el fin de permanecer conectado a su cuenta de Google al visitar sus servicios de nuevo. Mientras
              permanezca con esta sesión activa y use complementos en otros sitios Web como el nuestro, Google hará uso
              de estas cookies para mejorar su experiencia de uso.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>SSID</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 2 años
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Al crear o iniciar sesión en una cuenta de Google se almacenan esta cookie en su ordenador
              con el fin de permanecer conectado a su cuenta de Google al visitar sus servicios de nuevo. Mientras
              permanezca con esta sesión activa y use complementos en otros sitios Web como el nuestro, Google hará uso
              de estas cookies para mejorar su experiencia de uso.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>VISITOR_INFO1_LIVE</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 8 meses
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: En algunas páginas de nuestro Sitio Web tenemos vídeos incrustados de Youtube, es un servicio
              de Google. Su uso implica la remisión de esta cookie además de las cookies que Google requiere si mantiene
              la sesión activa con su cuenta, con el propósito de visualizar los vídeos incrustados, estimar el ancho de
              banda y mostrar cuantas veces se ha reproducido.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>YSC</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: Al cerrar sesión
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: En algunas páginas de nuestro Sitio Web tenemos vídeos incrustados de Youtube, es un servicio
              de Google. Su uso implica la remisión de esta cookie además de las cookies que Google requiere si mantiene
              la sesión activa con su cuenta, con el propósito de visualizar los vídeos incrustados, estimar el ancho de
              banda y mostrar cuantas veces se ha reproducido.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>nTpXe.resume</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 1 mes
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: En algunas páginas de nuestro Sitio Web tenemos vídeos incrustados de Youtube, es un servicio
              de Google. Su uso implica la remisión de esta cookie además de las cookies que Google requiere si mantiene
              la sesión activa con su cuenta, con el propósito de visualizar los vídeos incrustados, estimar el ancho de
              banda y mostrar cuantas veces se ha reproducido.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Analítica
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>NID</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 6 meses
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: La finalidad de esta cookie es almacenar información sobre tus preferencias.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Personalización
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>AMP_TOKEN</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 30 segundos a 1 año
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Incluye un token que se puede utilizar para recuperar un ID de cliente del servicio de ID de
              cliente de AMP. Otros posibles valores indican inhabilitaciones, solicitudes en curso o errores obtenidos
              al recuperar un ID del servicio de ID de cliente de AMP.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Personalización
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>_gac_</li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Duración: 90 días
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Descripción: Incluye información de la campaña relativa al usuario. Si has vinculado tus cuentas de Google
              Analytics y AdWords, las etiquetas de conversión de sitios web leerán esta cookie, a menos que la
              inhabilites
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Tipo: Tercero
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-8'} style={{ listStyleType: 'circle' }}>
              Finalidad: Personalización
            </li>
          </div>
          <br />

          {/* paragraph */}
          <div className={styles.text}>
            <p>
              <a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>&nbsp;muestra información sobre su
              Política de cookies en la parte inferior o superior de cualquier página del portal con cada inicio de
              sesión.
            </p>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>Ante esta información es posible llevar a cabo las siguientes acciones:</div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4'}>
              Aceptar cookies: No se volverá a visualizar este aviso al acceder a cualquier página del portal durante la
              presente sesión.
            </li>
          </div>
          <br />
          {/* paragraph */}
          <div className={styles.text}>
            <li className={'ml-4 break-words'}>
              Modificar/personalizar su configuración: Podrá obtener más información sobre qué son las cookies, conocer
              la Política de cookies de:&nbsp;<a href={'https://crysdyazandco.com/'}>https://crysdyazandco.com/</a>
              &nbsp;y modificar la configuración de su navegador.
            </li>
          </div>
          <br />

          {/* paragraph */}
          <div className={styles.text}>REV: 20.3009</div>

          <div className={'mb-10'} />
        </div>
      </div>
    </div>
  )
}
export default Cookies

Cookies.getLayout = function getLayout(page) {
  return <PrimaryLayout>{page}</PrimaryLayout>
}
