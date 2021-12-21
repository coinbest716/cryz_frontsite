import { getServerSideSitemap } from 'next-sitemap'

export const getServerSideProps = async ctx => {
  // Method to source urls from backend
  let staticUrlList = [
    '/',
    '/female-health',
    '/services',
    '/classland',
    '/contact',
    '/work-with-us',
    '/female-health/1',
    '/female-health/4',
    '/female-health/5',
    '/female-health/3',
    '/female-health/7',
    '/female-health/2',
    '/female-health/6',
    '/services/training',
    '/services/physiotherapy',
    '/services/nutrition',
  ]

  const staticFields = staticUrlList.map(url => ({
    loc: `https://crysdyazandco.com${url}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'monthly',
    priority: '0.7',
  }))

  const staticFieldsWeekly = staticUrlList.map(url => ({
    loc: `https://crysdyazandco.com${url}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8',
  }))

  const allFields = [...staticFields, ...staticFieldsWeekly]
  return getServerSideSitemap(ctx, allFields)
}

// Default export to prevent next.js errors
export default getServerSideProps
