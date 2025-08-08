// UTM parameter parsing and tracking

export const parseUTM = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const referrer = document.referrer
  
  const utm = {
    source: urlParams.get('utm_source') || null,
    medium: urlParams.get('utm_medium') || null,
    campaign: urlParams.get('utm_campaign') || null,
    term: urlParams.get('utm_term') || null,
    content: urlParams.get('utm_content') || null,
    ref: getReferrerType(referrer)
  }
  
  // Clean up null values
  Object.keys(utm).forEach(key => {
    if (utm[key] === null || utm[key] === '') {
      delete utm[key]
    }
  })
  
  return utm
}

const getReferrerType = (referrer) => {
  if (!referrer) return 'direct'
  
  try {
    const referrerDomain = new URL(referrer).hostname.toLowerCase()
    const currentDomain = window.location.hostname.toLowerCase()
    
    // Same domain = direct
    if (referrerDomain === currentDomain) return 'direct'
    
    // Search engines
    if (referrerDomain.includes('google')) return 'google'
    if (referrerDomain.includes('bing')) return 'bing'
    if (referrerDomain.includes('yahoo')) return 'yahoo'
    if (referrerDomain.includes('duckduckgo')) return 'duckduckgo'
    
    // Social media
    if (referrerDomain.includes('facebook')) return 'facebook'
    if (referrerDomain.includes('twitter')) return 'twitter'
    if (referrerDomain.includes('linkedin')) return 'linkedin'
    if (referrerDomain.includes('instagram')) return 'instagram'
    
    // Default to referrer domain
    return referrerDomain
  } catch (error) {
    return 'unknown'
  }
}

export const getSourceType = (utm) => {
  // Paid traffic
  if (utm.source === 'google' && utm.medium === 'cpc') return 'paid'
  if (utm.medium === 'cpc' || utm.medium === 'ppc') return 'paid'
  
  // Organic search
  if (utm.source === 'google' && utm.medium === 'organic') return 'seo'
  if (utm.ref && ['google', 'bing', 'yahoo', 'duckduckgo'].includes(utm.ref)) return 'seo'
  
  // Social
  if (['facebook', 'twitter', 'linkedin', 'instagram'].includes(utm.source)) return 'social'
  if (['facebook', 'twitter', 'linkedin', 'instagram'].includes(utm.ref)) return 'social'
  
  // Email
  if (utm.medium === 'email') return 'email'
  
  // Referral
  if (utm.ref && utm.ref !== 'direct') return 'referral'
  
  // Direct
  return 'direct'
}
