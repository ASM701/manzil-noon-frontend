// ─────────────────────────────────────────────────────────────────
// IMAGE IMPORTS
// ─────────────────────────────────────────────────────────────────

import AbayaBlueFeather from '../assets/Abaya_Robe_blue-feather.jpeg'
import AbayaBlueGreenFlower from '../assets/Abaya_Robe_blue-green-flower.jpeg'
import AbayaBlueShell from '../assets/Abaya_Robe_blue-shell.jpeg'
import AbayaRed from '../assets/Abaya_Robe_red.jpeg'
import AbayaYellow from '../assets/Abaya_Robe_yellow.jpeg'

import ButtonBlue from '../assets/Button_Robe_blue.jpeg'
import ButtonOlive from '../assets/Button_Robe_olive.jpeg'
import ButtonPink from '../assets/Button_Robe_pink.jpeg'
import ButtonViolet from '../assets/Button_Robe_violet.jpeg'

import FlowerBlue from '../assets/Flower_Robe_blue.jpeg'
import FlowerPink from '../assets/Flower_Robe_pink.jpeg'
import FlowerPurple from '../assets/Flower_Robe_purple.jpeg'

import OrientalDarkBluePink from '../assets/Oriental_Robe-dark-blue-pink.jpeg'
import OrientalGold from '../assets/Oriental_Robe-gold.jpeg'
import OrientalLightBluePurple from '../assets/Oriental_Robe-light-blue-purple.jpeg'

import SaiPink from '../assets/Sai_Robe-pink.jpeg'
import SaiPurple from '../assets/Sai_Robe-purple.jpeg'

import StarBlueGold from '../assets/Star_Robe_blue-gold.jpeg'
import StarBluePink from '../assets/Star_Robe_blue-pink.jpeg'
import StarGreenGold from '../assets/Star_Robe_green-gold.jpeg'
import StarGreenPurple from '../assets/Star_Robe_green-purple.jpeg'
import StarPinkGold from '../assets/Star_Robe_pink-gold.jpeg'

import BluePonchoPalm from '../assets/Blue_Poncho-elhelwa-palm.jpeg'
import BluePonchoSun from '../assets/Blue_Poncho-elhelwa-sun.jpeg'
import BluePonchoFlower from '../assets/Blue_Poncho-flower.jpeg'

import TiffanyPoncho from '../assets/Tiffany_Blue_Poncho-elhelwa-sun.jpeg'

// ─────────────────────────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────────────────────────

export const CATEGORIES = ['All', 'Robes', 'Ponchos']

// ─────────────────────────────────────────────────────────────────
// PRODUCTS
// Each product has a `variants` array. Each variant has:
//   label  — color name shown on hover
//   swatch — hex color for the dot
//   img    — the image to show when this variant is selected
// ─────────────────────────────────────────────────────────────────

export const products = [
  {
    id: 1,
    name: 'Abaya Robe',
    category: 'Robes',
    price: 'KD 0.000',
    badge: '',
    variants: [
      { label: 'Blue Feather',       swatch: '#5b7fa6', img: AbayaBlueFeather },
      { label: 'Blue Green Flower',  swatch: '#6a9e7f', img: AbayaBlueGreenFlower },
      { label: 'Blue Shell',         swatch: '#7aa8c2', img: AbayaBlueShell },
      { label: 'Red',                swatch: '#a63232', img: AbayaRed },
      { label: 'Yellow',             swatch: '#d4a843', img: AbayaYellow },
    ],
  },
  {
    id: 2,
    name: 'Button Robe',
    category: 'Robes',
    price: 'KD 0.000',
    badge: '',
    variants: [
      { label: 'Blue',   swatch: '#4a6fa5', img: ButtonBlue },
      { label: 'Olive',  swatch: '#7a8c5e', img: ButtonOlive },
      { label: 'Pink',   swatch: '#c98fa0', img: ButtonPink },
      { label: 'Violet', swatch: '#7a5c9e', img: ButtonViolet },
    ],
  },
  {
    id: 3,
    name: 'Flower Robe',
    category: 'Robes',
    price: 'KD 0.000',
    badge: '',
    variants: [
      { label: 'Blue',   swatch: '#5b7fa6', img: FlowerBlue },
      { label: 'Pink',   swatch: '#c98fa0', img: FlowerPink },
      { label: 'Purple', swatch: '#8a6bae', img: FlowerPurple },
    ],
  },
  {
    id: 4,
    name: 'Oriental Robe',
    category: 'Robes',
    price: 'KD 0.000',
    badge: '',
    note: 'Each image features two outfit styles',
    variants: [
      { label: 'Dark Blue & Pink',    swatch: '#4a5a8a', img: OrientalDarkBluePink },
      { label: 'Gold',                swatch: '#c4a44a', img: OrientalGold },
      { label: 'Light Blue & Purple', swatch: '#8aacca', img: OrientalLightBluePurple },
    ],
  },
  {
    id: 5,
    name: 'Sai Robe',
    category: 'Robes',
    price: 'KD 0.000',
    badge: '',
    variants: [
      { label: 'Pink',   swatch: '#c98fa0', img: SaiPink },
      { label: 'Purple', swatch: '#8a6bae', img: SaiPurple },
    ],
  },
  {
    id: 6,
    name: 'Star Robe',
    category: 'Robes',
    price: 'KD 0.000',
    badge: '',
    variants: [
      { label: 'Blue & Gold',    swatch: '#4a6fa5', img: StarBlueGold },
      { label: 'Blue & Pink',    swatch: '#7a8fc4', img: StarBluePink },
      { label: 'Green & Gold',   swatch: '#6a9e6a', img: StarGreenGold },
      { label: 'Green & Purple', swatch: '#7a9e8a', img: StarGreenPurple },
      { label: 'Pink & Gold',    swatch: '#c98fa0', img: StarPinkGold },
    ],
  },
  {
    id: 7,
    name: 'Blue Poncho',
    category: 'Ponchos',
    price: 'KD 0.000',
    badge: '',
    note: 'Each image features two outfit styles',
    variants: [
      { label: 'Elhelwa & Palm', swatch: '#6a9e7f', img: BluePonchoPalm },
      { label: 'Elhelwa & Sun',  swatch: '#d4a843', img: BluePonchoSun },
      { label: 'Plain & Flower',       swatch: '#5b7fa6', img: BluePonchoFlower },
    ],
  },
  {
    id: 8,
    name: 'Tiffany Blue Poncho',
    category: 'Ponchos',
    price: 'KD 0.000',
    badge: 'New',
    variants: [
      { label: 'Tiffany Blue', swatch: '#81d8d0', img: TiffanyPoncho },
    ],
  },
]