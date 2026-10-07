import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { CategoriaService } from '../../../data/services/CategoriaService';
import { CarritoService } from '../../../data/services/CarritoService';
import { useAuth } from '../../context/AuthContext';

export type Category = {
  id: number;
  name: string;
  image: string;
  color: string;
  star: boolean;
};

// Como Categoria (backend) solo tiene id + nombre, los colores se
// asignan en orden desde esta paleta para mantener el diseño de tarjetas.
const CATEGORY_COLORS = [
  '#E9A7C4',
  '#4B80B1',
  '#F0A5BE',
  '#7BA6CE',
  '#D8B4E2',
  '#E9B7C9',
];

export const useHomeViewModel = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [cartCount, setCartCount] = useState(0);


  // ==========================================
  // CATEGORÍAS (una sola vez)
  // ==========================================

  const loadCategories = useCallback(async () => {
    try {
      const data = await CategoriaService.listar();

      setCategories(
        data.map((categoria, index) => ({
          id: categoria.id,
          name: categoria.nombre,
          image: categoria.imagen ?? '',
          color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
          star: index % 2 === 0,
        }))
      );
    } catch (error) {
      console.log('Error al cargar categorías:', error);
    } finally {
      setLoadingCategories(false);
    }
  }, []);


  // ==========================================
  // CANTIDAD EN EL CARRITO (cada vez que Home
  // vuelve a tener foco, por si se agregó algo)
  // ==========================================

  const loadCartCount = useCallback(async () => {
    if (!user) {
      setCartCount(0);
      return;
    }

    try {
      const carrito = await CarritoService.ver(user.token);
      setCartCount(carrito.productos.length);
    } catch {
      setCartCount(0);
    }
  }, [user]);


  useFocusEffect(
    useCallback(() => {
      loadCategories();
      loadCartCount();
    }, [loadCategories, loadCartCount])
  );


  const handleCategoryPress = (category: Category) => {
    navigation.navigate('Catalogo', {
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  const handleBuyNow = () => {
    navigation.navigate('Catalogo');
  };

  const handleSpecialDiscount = () => {
    navigation.navigate('Cupones');
  };

  const handleSearch = () => {
    navigation.navigate('Buscar');
  };

  const handleCart = () => {
    navigation.navigate('Carrito');
  };

  const handleMenu = () => {
    navigation.openDrawer();
  };

  const handleSeeAll = () => {
    navigation.navigate('Catalogo');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return {
    categories,
    loadingCategories,
    cartCount,
    handleCategoryPress,
    handleBuyNow,
    handleSpecialDiscount,
    handleSearch,
    handleCart,
    handleMenu,
    handleSeeAll,
    handleLogin,
    handleRegister,
  };
};
