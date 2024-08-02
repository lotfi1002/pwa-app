export const isAppOnline = async() => {
    if (!window.navigator.onLine) return false
  
    // const url = new URL(window.location.origin)
    // url.searchParams.set('q', new Date().toString())

        const url = new URL('http://localhost/PWA-POS/api/online');

  
    try {
      const response = await fetch(
        url.toString(),
        { method: 'HEAD' },
      )
  
      return response.ok
    } catch {
      return false
    }
  }

  export const isOnline = ()=>{

      return Boolean(Number(localStorage.getItem('isOnline')))

  }