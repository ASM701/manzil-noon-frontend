import logo from '../assets/Subject.png'

export default function LogoMark({ size = 36 }) {
  return (
    <img
      src={logo}
      width={size}
      height={size}
      alt="Manzil Noon logo"
      style={{ objectFit: 'contain' }}
    />
  )
}
