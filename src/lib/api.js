const BASE_URL = import.meta.env.VITE_API_URL

// ── Products ──
export async function getProducts() {
  const res = await fetch(`${BASE_URL}/api/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

export async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/api/products/${id}`)
  if (!res.ok) throw new Error('Product not found')
  return res.json()
}

// ── Auth ──
export async function register(full_name, email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ full_name, email, password })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error)
  }
  return res.json()
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error)
  }
  return res.json()
}

export async function logout(token) {
  const res = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Logout failed')
  return res.json()
}

// ── Orders ──
export async function createOrder(token, items, total) {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ items, total })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error)
  }
  return res.json()
}

export async function getOrders(token) {
  const res = await fetch(`${BASE_URL}/api/orders`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}

// ── Users ──
export async function getProfile(token) {
  const res = await fetch(`${BASE_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}

export async function updateProfile(token, data) {
  const res = await fetch(`${BASE_URL}/api/users/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('Failed to update profile')
  return res.json()
}

// ── Wishlist ──
export async function getWishlist(token) {
  const res = await fetch(`${BASE_URL}/api/wishlist`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch wishlist')
  return res.json()
}

export async function addToWishlist(token, product_id, variant_label) {
  const res = await fetch(`${BASE_URL}/api/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ product_id, variant_label })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error)
  }
  return res.json()
}

export async function removeFromWishlist(token, product_id, variant_label) {
  const res = await fetch(`${BASE_URL}/api/wishlist`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ product_id, variant_label })
  })
  if (!res.ok) throw new Error('Failed to remove from wishlist')
  return res.json()
}


// ── Cart ──
export async function getCart(token) {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch cart')
  return res.json()
}

export async function addToCart(token, product_id, variant_label, size, quantity) {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ product_id, variant_label, size, quantity })
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error)
  }
  return res.json()
}

export async function updateCartItem(token, id, quantity) {
  const res = await fetch(`${BASE_URL}/api/cart/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ quantity })
  })
  if (!res.ok) throw new Error('Failed to update cart item')
  return res.json()
}

export async function removeFromCart(token, id) {
  const res = await fetch(`${BASE_URL}/api/cart/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to remove from cart')
  return res.json()
}

export async function clearCart(token) {
  const res = await fetch(`${BASE_URL}/api/cart`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to clear cart')
  return res.json()
}

// ── Admin ──
export async function getAdminOrders(token) {
  const res = await fetch(`${BASE_URL}/api/admin/orders`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}

export async function updateOrderStatus(token, id, status) {
  const res = await fetch(`${BASE_URL}/api/admin/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  })
  if (!res.ok) throw new Error('Failed to update order status')
  return res.json()
}

export async function updateVariantStock(token, variantId, stock) {
  const res = await fetch(`${BASE_URL}/api/admin/variants/${variantId}/stock`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ stock })
  })
  if (!res.ok) throw new Error('Failed to update stock')
  return res.json()
}