export const isAppOnline = async() => {
    if (!window.navigator.onLine) return false
  
    const url = new URL(window.location.origin)
    url.searchParams.set('q', new Date().toString())
  
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