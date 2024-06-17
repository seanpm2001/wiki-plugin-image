window.addEventListener('load', () => {
  const gallery = document.querySelector('#gallery')
  const fullPage = document.querySelector('#fullpage')
  document.querySelectorAll('img').forEach((img) => {
    const ratio = img.naturalWidth / img.naturalHeight
    let divClass = null
    if (img.naturalWidth <= 200 || img.naturalHeight <= 200) {
      divClass = 'small'
    } else if (ratio >= 2 && ratio < 3 ) {
      divClass = 'wide'
    } else if (ratio >= 3) {
      divClass = 'very-wide'
    } else if (ratio <= 0.75) {
      divClass = 'tall'
    } else if (img.naturalWidth >= 1024 && img.naturalHeight >= 1024) {
      divClass = 'big'
    }
    if (divClass) {
      img.closest('div').classList.add(divClass)
    }
    
    img.addEventListener('click', () => {

      const controller = new AbortController()
      var delay = 250
      var throttled = false

      fullPage.classList.remove('hidden')
      gallery.classList.add('hidden')

      fullPage.style.backgroundImage = 'url(' + img.src + ')'
      if (img.naturalHeight >= window.innerHeight || img.naturalWidth >= window.innerWidth) {
        fullPage.classList.add('scale')
      } else {
        fullPage.classList.remove('scale')
      }

      window.addEventListener('resize', () => {
        if (!throttled) {
          if (img.naturalHeight >= window.innerHeight || img.naturalWidth >= window.innerWidth) {
            fullPage.classList.add('scale')
          } else {
            fullPage.classList.remove('scale')
          }
          throttled = true
          setTimeout(() => {
            throttled = false
          }, delay)
        }
      }, { signal: controller.signal })
      fullPage.addEventListener('click', () => {
        gallery.classList.remove('hidden')
        fullPage.classList.add('hidden')
        controller.abort()
      }, { signal: controller.signal })
    })
  })
})