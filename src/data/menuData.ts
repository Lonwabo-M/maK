import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Beef',
    description: 'Premium beef cuts perfect for braai',
    price: 25,
    category: 'meat',
    image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-chop-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizable: true,
    portions: ['1 piece', '2 pieces', '3 pieces', '4 pieces', '5 pieces', '6 pieces']
  },
  {
    id: '2',
    name: 'Sausage',
    description: 'Traditional boerewors and specialty sausages',
    price: 25,
    category: 'meat',
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizable: true,
    portions: ['1 piece', '2 pieces', '3 pieces', '4 pieces', '5 pieces', '6 pieces']
  },
  {
    id: '3',
    name: 'Wings',
    description: 'Juicy chicken wings grilled to perfection',
    price: 25,
    category: 'meat',
    image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizable: true,
    portions: ['1 piece', '2 pieces', '3 pieces', '4 pieces', '5 pieces', '6 pieces']
  },
  {
    id: '4',
    name: 'Pork',
    description: 'Tender pork cuts with perfect seasoning',
    price: 25,
    category: 'meat',
    image: 'https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=800',
    customizable: true,
    portions: ['1 piece', '2 pieces', '3 pieces', '4 pieces', '5 pieces', '6 pieces']
  }
];