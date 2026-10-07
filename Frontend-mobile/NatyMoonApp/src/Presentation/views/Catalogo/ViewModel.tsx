import { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

import { Product } from '../../../Domain/entities/Producto';
import { ProductoService } from '../../../data/services/ProductoService';
import { Categoria } from '../../../Domain/entities/Categoria';
import { CategoriaService } from '../../../data/services/CategoriaService';

export const useCatalogoViewModel = () => {

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const categoryId = route.params?.categoryId ?? null;
  const categoryName = route.params?.categoryName ?? null;

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [catalogos, setCatalogos] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ProductoService.listar();
      setAllProducts(data);
    } catch (error) {
      console.log('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCatalogos = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CategoriaService.listar();
      setCatalogos(data);
    } catch (error) {
      console.log('Error al cargar catálogos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (categoryId || categoryName) {
        loadProducts();
      } else {
        loadCatalogos();
      }
    }, [categoryId, categoryName, loadProducts, loadCatalogos])
  );

  const products = categoryName
    ? allProducts.filter((product) => product.category === categoryName)
    : allProducts;

  const goBack = () => {
    navigation.goBack();
  };

  const goToDetail = (product: Product) => {
    navigation.navigate('DetalleProducto', { product });
  };

  const goToCatalogo = (catalogo: Categoria) => {
    navigation.navigate('Catalogo', {
      categoryId: catalogo.id,
      categoryName: catalogo.nombre,
    });
  };

  const openMenu = () => {
    navigation.openDrawer();
  };

  const openSearch = () => {
    navigation.navigate('Buscar');
  };

  return {
    mostrandoCatalogos: !categoryId && !categoryName,
    catalogos,
    products,
    loading,
    categoryName,
    goBack,
    goToDetail,
    goToCatalogo,
    openMenu,
    openSearch,
  };
};
