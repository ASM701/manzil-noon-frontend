import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct, getProducts, getSettings } from '../lib/api'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'
import styles from './ProductDetailPage.module.css'


export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeVariant, setActiveVariant] = useState(0)
  const { user } = useAuth()
  const { addItem } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const [includeSet, setIncludeSet] = useState(false)
  const [matchingBag, setMatchingBag] = useState(null)
  const [matchingBagVariant, setMatchingBagVariant] = useState(null)
  const [activeSize, setActiveSize] = useState(null)
  const [giftWrap, setGiftWrap] = useState(false)
  const [giftImageUrl, setGiftImageUrl] = useState('')
  const [giftPriceValue, setGiftPriceValue] = useState(18)


  useEffect(() => {
    getSettings()
      .then(settings => {
        setGiftImageUrl(settings.gift_image_url || '')
        setGiftPriceValue(Number(settings.gift_price_value) || 18)
      })
      .catch(err => console.error('Failed to load settings:', err))
  }, [])


  useEffect(() => {
    window.scrollTo(0, 0)
    getProduct(id)
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  async function findMatchingBag(variantLabel, productName) {
    const isStarRobe = productName === 'Star Robe'
    const isFlowerRobe = productName === 'Flower Robe'

    if (!isStarRobe && !isFlowerRobe) return

    const bagName = isStarRobe ? 'Star Bag' : 'Flower Bag'

    try {
      const allProducts = await getProducts()
      const bag = allProducts.find(p => p.name === bagName)
      if (!bag) return

      const bagVariant = bag.product_variants?.find(
        v => v.label === variantLabel
      )

      setMatchingBag(bag)
      setMatchingBagVariant(bagVariant || null)
    } catch (err) {
      console.error('Failed to find matching bag:', err)
    }
  }

  useEffect(() => {
    if (product) {
      const currentVariant = product.product_variants?.[activeVariant]
      setActiveSize(null)
      setIncludeSet(false)
      setMatchingBag(null)
      setMatchingBagVariant(null)
      if (currentVariant) {
        findMatchingBag(currentVariant.label, product.name)
      }
    }
  }, [product, activeVariant])

  if (loading) {
    return <div className={styles.notFound}><p>Loading...</p></div>
  }

  if (!product) {
    return (
      <div className={styles.notFound}>
        <p>Product not found.</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    )
  }

  const variants = product.product_variants || []
  const variant = variants[activeVariant]
  const sizes = variant?.product_variant_sizes || []
  const selectedSize = sizes.find(s => s.label === activeSize)
  const wishlisted = isWishlisted(product.id, variant?.label)
  const basePrice = selectedSize ? selectedSize.price : product.price
  const basePriceValue = parseFloat(basePrice.replace('KD ', ''))
  const totalPriceValue = giftWrap ? basePriceValue + giftPriceValue : basePriceValue
  const displayPrice = `KD ${totalPriceValue.toFixed(3)}`
  const displayStock = selectedSize ? selectedSize.stock : sizes.length > 0 ? 999 : variant?.stock

  return (
    <div className={styles.page}>
      <button className={styles.back} onClick={() => navigate(-1)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Back
      </button>

      <div className={styles.layout}>
        <div className={styles.imageSection}>
          <div className={`${styles.imgWrap} ${product.category === 'Bags' ? styles.imgWrapContain : ''}`}>
            <img src={variant?.img} alt={`${product.name} - ${variant?.label}`} />
          </div>


          {variants.length > 1 && (
            <div className={styles.thumbnails}>
              {variants.map((v, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === activeVariant ? styles.thumbActive : ''}`}
                  onClick={() => setActiveVariant(i)}
                >
                  <img src={v.img} alt={v.label} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>{displayPrice}</p>
          {product.name === 'Everyday Robe' ? (
            <><><><p className={styles.includes}>✦ Includes matching slippers</p></><p className={styles.includes}>✦ Cotton</p></></>
          ) : null}
          {product.category !== 'Bags' && product.name !== 'Button Robe' && product.name !== 'Sai Robe' && product.name !== 'Everyday Robe' && (
            <><><p className={styles.includes}>✦ Includes matching slippers</p><p className={styles.includes}>✦ Free Size</p></><p className={styles.includes}>✦ Cotton</p></>
          )}
          {product.name === 'Button Robe' || product.name === 'Sai Robe' ? (
            <><><><p className={styles.includes}>✦ Includes matching slippers</p><p className={styles.includes}>✦ Free Size</p></><p className={styles.includes}>✦ Cotton</p></><p className={styles.includes}>✦ Inner Dress</p></>
          ) : null}

          <div className={styles.section}>
            <p className={styles.label}>
              Color — <span className={styles.variantLabel}>{variant?.label}</span>
            </p>
            <div className={styles.swatches}>
              {variants.map((v, i) => (
                <button
                  key={i}
                  className={`${styles.swatch} ${i === activeVariant ? styles.swatchActive : ''}`}
                  style={{ background: v.swatch }}
                  onClick={() => setActiveVariant(i)}
                  title={v.label}
                />
              ))}
            </div>
          </div>

          {sizes.length > 0 && (
            <div className={styles.section}>
              <p className={styles.label}>
                Size — <span className={styles.variantLabel}>{activeSize || 'Select a size'}</span>
              </p>
              <div className={styles.sizes}>
                {sizes.map(size => (
                  <button
                    key={size.id}
                    className={`${styles.sizeBtn} ${activeSize === size.label ? styles.sizeBtnActive : ''} ${size.stock === 0 ? styles.sizeBtnSoldOut : ''}`}
                    onClick={() => size.stock > 0 && setActiveSize(size.label)}
                    disabled={size.stock === 0}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}


          {product.note && (
            <p className={styles.note}>* {product.note}</p>
          )}

          {matchingBag && matchingBagVariant && (
            <div className={styles.completeSet}>
              <div className={styles.setHeader}>
                <p className={styles.setTitle}>✦ Complete the Set</p>
                <p className={styles.setSubtitle}>
                  Add the matching {matchingBag.name} to complete your look with a discount
                </p>
              </div>
              <div className={styles.setOption}>
                <div className={styles.setProduct}>
                  <img
                    src={matchingBagVariant.img}
                    alt={matchingBag.name}
                    className={styles.setBagImg}
                  />
                  <div className={styles.setProductInfo}>
                    <p className={styles.setProductName}>{matchingBag.name}</p>
                    <p className={styles.setProductVariant}>{matchingBagVariant.label}</p>
                    <p className={styles.setProductPrice}>{matchingBag.set_price || matchingBag.price}
                    </p>
                  </div>
                </div>
                <button
                  className={`${styles.setToggle} ${includeSet ? styles.setToggleActive : ''}`}
                  onClick={() => setIncludeSet(!includeSet)}
                >
                  {includeSet ? 'Added ✓' : 'Add to Set'}
                </button>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.addBtn}
              disabled={!variant || displayStock === 0 || (sizes.length > 0 && !activeSize)}
              style={{
                opacity: displayStock === 0 || (sizes.length > 0 && !activeSize) ? 0.6 : 1,
                cursor: displayStock === 0 || (sizes.length > 0 && !activeSize) ? 'not-allowed' : 'pointer'
              }}
              onClick={() => {
                if (!user) {
                  navigate('/login')
                  return
                }
                if (sizes.length > 0 && !activeSize) return
                addItem(product, variant, activeSize, displayPrice, giftWrap)
                if (includeSet && matchingBag && matchingBagVariant) {
                  addItem(matchingBag, matchingBagVariant, null, matchingBag.set_price || matchingBag.price, false)
                }
              }}
            >
              {displayStock === 0 ? 'Sold Out' : sizes.length > 0 && !activeSize ? 'Select a Size' : 'Add to Bag'}
            </button>
            <button
              className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlistBtnActive : ''}`}
              onClick={() => toggleWishlist(product, variant)}
              aria-label="Add to wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? '#16166B' : 'none'} stroke="#16166B" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          {/* Gift Wrapping */}
          <div className={styles.giftSection}>
            <button
              className={`${styles.giftToggle} ${giftWrap ? styles.giftToggleActive : ''}`}
              onClick={() => setGiftWrap(!giftWrap)}
            >
              <span className={styles.giftIcon}>🎁</span>
              <span className={styles.giftText}>
                Add Gift Wrapping
                <span className={styles.giftPrice}>+KD {giftPriceValue.toFixed(3)}</span>
              </span>
              <span className={styles.giftCheck}>
                {giftWrap ? '✓' : '+'}
              </span>
            </button>

            {giftWrap && giftImageUrl && (
              <div className={styles.giftPreview}>
                <img src={giftImageUrl} alt="Gift wrapping" className={styles.giftImg} />
                <p className={styles.giftNote}>
                  Your order will be beautifully wrapped and ready to gift.
                </p>
              </div>
            )}
          </div>

          {/* Video */}
          {variant?.video_url && (
            <div className={styles.videoWrap}>
              <video
                key={variant.video_url}
                autoPlay
                loop
                muted
                playsInline
                className={styles.video}
              >
                <source src={variant.video_url} type="video/mp4" />
              </video>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}