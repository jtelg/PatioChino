import React from 'react';
import Card from './card';

const card_info = [
  {
    id: 1,
    img: '/media/CardHomeWhite.png',
    img2: '/media/CardHomeWhite2.png',
    nombre: 'Cheddark',
    ingredientes: [
      'Doble medallón de carne.',
      'Panceta.',
      ' Doble queso cheddar.',
      ' Cebolla.',
      'Aderezo americano.',
      'Papas fritas.'
    ]
  },
  {
    id: 2,
    img: '/media/CardHomeBlue.png',
    img2: '/media/CardHomeBlue2.png',
    nombre: 'Clasica Doble',
    ingredientes: [
      'Doble medallón de carne.',
      'Jamón.',
      'Queso.',
      ' Huevo.',
      'Lechuga.',
      'Mayonesa casera.',
      'Papas fritas.'
    ]
  },
  {
    id: 3,
    img: '/media/CardHomeWhite.png',
    img2: '/media/CardHomeWhite2.png',
    nombre: 'Cheddark',
    ingredientes: [
      'Doble medallón de carne.',
      'Panceta.',
      ' Doble queso cheddar.',
      ' Cebolla.',
      'Aderezo americano.',
      'Papas fritas.'
    ]
  },
  {
    id: 4,
    img: '/media/CardHomeBlue.png',
    img2: '/media/CardHomeBlue2.png',
    nombre: 'Clasica Doble',
    ingredientes: [
      'Doble medallón de carne.',
      'Jamón.',
      'Queso.',
      ' Huevo.',
      'Lechuga.',
      'Mayonesa casera.',
      'Papas fritas.'
    ]
  },
  {
    id: 5,
    img: '/media/CardHomeWhite.png',
    img2: '/media/CardHomeWhite2.png',
    nombre: 'Cheddark',
    ingredientes: [
      'Doble medallón de carne.',
      'Panceta.',
      ' Doble queso cheddar.',
      ' Cebolla.',
      'Aderezo americano.',
      'Papas fritas.'
    ]
  },
  {
    id: 6,
    img: '/media/CardHomeBlue.png',
    img2: '/media/CardHomeBlue2.png',
    nombre: 'Clasica Doble',
    ingredientes: [
      'Doble medallón de carne.',
      'Jamón.',
      'Queso.',
      ' Huevo.',
      'Lechuga.',
      'Mayonesa casera.',
      'Papas fritas.'
    ]
  },
  {
    id: 7,
    img: '/media/CardHomeWhite.png',
    img2: '/media/CardHomeWhite2.png',
    nombre: 'Cheddark',
    ingredientes: [
      'Doble medallón de carne.',
      'Panceta.',
      ' Doble queso cheddar.',
      ' Cebolla.',
      'Aderezo americano.',
      'Papas fritas.'
    ]
  },
  {
    id: 8,
    img: '/media/CardHomeBlue.png',
    img2: '/media/CardHomeBlue2.png',
    nombre: 'Clasica Doble',
    ingredientes: [
      'Doble medallón de carne.',
      'Jamón.',
      'Queso.',
      ' Huevo.',
      'Lechuga.',
      'Mayonesa casera.',
      'Papas fritas.'
    ]
  }
];
const ListCard = () => {
  return (
    <div className="w-full flex md:flex-wrap flex-row overflow-x-auto md:gap-0 gap-4  ">
      {card_info.map((card) => (
        <Card key={card.id} info={card}></Card>
      ))}
    </div>
  );
};

export default ListCard;
