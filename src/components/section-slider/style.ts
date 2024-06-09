export const sectionBg = {
  marginTop: '254px',
  marginBottom: '200px',
  backgroundColor: 'pink.darker',
  position: 'relative'
}

export const border = {
  backgroundImage: 'url(/src/icons/borderslider.svg)',
  position: 'absolute',
  top: '-110px',
  height: '154px',
  zIndex: '-1',
  backgroundRepeat: 'repeat',
  width: '100%',
  backgroundSize: 'cover'
}

export const borderSecond = {
  backgroundImage: 'url(/src/icons/bordersecondslider.svg)',
  position: 'absolute',
  height: '135px',
  zIndex: '-1',
  width: '100%',
  backgroundSize: 'cover',
  backgroundRepeat: 'repeat-x'
}

export const sliderContainer = {
  '& > div': {
    maxWidth: '1360px',
    margin: '0 auto',
    padding: '72px 40px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  }
}

export const sliderTitle = {
  color: 'background.default',
  xl: {
    fontSize: '48px'
  },
  md: {
    fontSize: 'clamp(1.063rem, -0.321rem + 3.69vw, 3rem)'
  },
  sm: { fontSize: '17px' }
}

export const slideElement = {
  maxWidth: '100%',
  boxSizing: 'border-box',
  borderRadius: '10px',
  backgroundColor: 'background.default',
  mb: '20px',
  border: '1px solid red'
}

export const slideImage = {
  position: 'relative',
  padding: '40px 20px 32px',
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
  margin: '0 auto'
}

export const lastSlider = {
  maxWidth: '400px',
  height: '595px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const cardFavorite = {
  'position': 'absolute',
  'top': '40px',
  'right': '34px',
  'color': 'secondary.darker',
  '&:hover': {
    color: 'primary.darker',
    cursor: 'pointer'
  }
}

export const cardHeader = {
  marginBottom: '18px',
  color: 'secondary.darker'
}

export const cardPararaph = {
  maxWidth: '320px',
  color: 'secondary.darker',
  fontSize: ' 18px',
  margin: '7px 0 70px 0'
}

export const cardBold = {
  color: 'secondary.darker',
  fontSize: '22px',
  fontWeight: '600'
}

export const ArrowStyle = {
  'width': '40px',
  'height': '40px',
  'background': 'none',
  'display': 'flex',
  'justifyContent': 'flex-end',
  'alignItems': 'center',
  'mb': '40px',
  '&:hover': {
    cursor: 'pointer'
  }
}

export const customButton = {
  'color': 'secondary.darker',
  'backgroundColor': 'background.default',
  'border': 'none',
  '&:hover': {
    color: 'secondary.darker', // Замість цього використайте бажаний колір для hover
    border: '2px solid #567343' // Замість цього використайте бажаний колір та стиль для hover
  }
}
