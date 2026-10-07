import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Product } from '../../../Domain/entities/Producto';
import { ProductoService } from '../../../data/services/ProductoService';


export const useBuscarViewModel = () => {

  const navigation = useNavigation<any>();

  const [search, setSearch] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);


  // ==========================================
  // CARGAR PRODUCTOS DEL BACKEND
  // ==========================================

  useEffect(() => {
    (async () => {
      try {
        const data = await ProductoService.listar();
        setAllProducts(data);
      } catch (error) {
        console.log('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  // ==========================================
  // FILTRAR PRODUCTOS
  // ==========================================

  const filteredProducts = allProducts.filter((product) => {

    const text = search.toLowerCase().trim();

    if (!text) {
      return true;
    }

    return product.name.toLowerCase().includes(text);

  });


  const goBack = () => {
    navigation.goBack();
  };

  const openMenu = () => {
    navigation.openDrawer();
  };

  const goToDetail = (product: Product) => {
    navigation.navigate('DetalleProducto', { product });
  };


  return {
    search,
    setSearch,
    filteredProducts,
    loading,
    goBack,
    openMenu,
    goToDetail,
  };
};
