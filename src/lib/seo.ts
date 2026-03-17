import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
}

export function useSEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | Hoosier Boy Barbershop`
    }

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ]

    metaTags.forEach(({ name, property, content }) => {
      if (!content) return

      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
      let element = document.querySelector(selector)

      if (!element) {
        element = document.createElement('meta')
        if (name) {
          element.setAttribute('name', name)
        } else if (property) {
          element.setAttribute('property', property)
        }
        document.head.appendChild(element)
      }

      element.setAttribute('content', content)
    })

    if (url) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', url)
    }
  }, [title, description, keywords, image, url, type])
}

export const SEO_DEFAULTS = {
  home: {
    title: 'Home',
    description: 'Premium barbershop in Noblesville, Indiana. Book your haircut, beard trim, or specialty service with Jimmy or Nate. 5.0 rating with 244+ reviews.',
    keywords: 'barbershop, Noblesville barbershop, haircut, beard trim, mens grooming',
    url: 'https://hoosierboybarbershop.com'
  },
  book: {
    title: 'Book Appointment',
    description: 'Book your barbershop appointment online. Choose from haircuts, beard trims, combo services, and specialty hair replacement services.',
    keywords: 'book barber appointment, online booking, haircut booking, Noblesville',
    url: 'https://hoosierboybarbershop.com/book'
  },
  barbers: {
    title: 'Our Barbers',
    description: 'Meet Jimmy Bissonette and Nate Gouty, our expert barbers specializing in premium cuts, beard work, and hair replacement services.',
    keywords: 'Jimmy Bissonette, Nate Gouty, barbers Noblesville, hair replacement specialist',
    url: 'https://hoosierboybarbershop.com/barbers'
  },
  shopInfo: {
    title: 'Shop Info',
    description: 'Hoosier Boy Barbershop location, hours, contact info. Located at 13901 Town Center Blvd, Noblesville, IN. Open Wed-Sat.',
    keywords: 'barbershop hours, Noblesville location, contact barbershop, parking wifi',
    url: 'https://hoosierboybarbershop.com/shop-info'
  }
}
