import React from 'react';

import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import {
  useCatalogoViewModel,
} from './ViewModel';


const Catalogo = () => {

  const {
    mostrandoCatalogos,
    catalogos,
    products,
    loading,
    categoryName,
    goBack,
    goToDetail,
    goToCatalogo,
    openMenu,
    openSearch,
  } = useCatalogoViewModel();


  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.backButton}
            onPress={mostrandoCatalogos ? openMenu : goBack}
          >

            <Ionicons
              name={mostrandoCatalogos ? 'menu-outline' : 'arrow-back'}
              size={27}
              color="#7C3AED"
            />

          </TouchableOpacity>


          <Text style={styles.headerTitle}>
            {mostrandoCatalogos ? 'Catálogos' : 'Catálogo'}
          </Text>


          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={openSearch}
          >

            <Ionicons
              name="search-outline"
              size={23}
              color="#7C3AED"
            />

          </TouchableOpacity>

        </View>


        <View style={styles.titleContainer}>

          <Text style={styles.title}>
            {mostrandoCatalogos
              ? 'Nuestros catálogos'
              : `Catálogo de ${categoryName}`}
          </Text>

          <Text style={styles.subtitle}>
            {mostrandoCatalogos
              ? 'Elige un catálogo para ver sus productos.'
              : 'Encuentra tu pijama favorita.'}
          </Text>

        </View>


        {loading && (

          <View style={{ paddingVertical: 40 }}>
            <ActivityIndicator size="large" color="#7C3AED" />
          </View>

        )}


        {!loading && mostrandoCatalogos && (

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}
          >

            {catalogos.map((catalogo) => (

              <TouchableOpacity
                key={catalogo.id}
                style={{
                  width: '48%',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  marginBottom: 18,
                  overflow: 'hidden',
                }}
                activeOpacity={0.85}
                onPress={() => goToCatalogo(catalogo)}
              >

                {catalogo.imagen ? (

                  <Image
                    source={{ uri: catalogo.imagen }}
                    style={{ width: '100%', height: 140 }}
                    resizeMode="cover"
                  />

                ) : (

                  <View
                    style={{
                      width: '100%',
                      height: 140,
                      backgroundColor: '#F1E9FF',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons name="pricetag-outline" size={34} color="#7C3AED" />
                  </View>

                )}

                <View
                  style={{
                    padding: 12,
                  }}
                >

                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: '#493275',
                    }}
                  >
                    {catalogo.nombre}
                  </Text>

                </View>

              </TouchableOpacity>

            ))}

          </View>

        )}


        {!loading && !mostrandoCatalogos && (

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}
        >

          {products.map((product) => (

            <TouchableOpacity
              key={product.id}
              style={{
                width: '48%',
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                marginBottom: 18,
                overflow: 'hidden',
              }}
              activeOpacity={0.85}
              onPress={() => goToDetail(product)}
            >

              {product.image ? (

                <Image
                  source={{
                    uri: product.image,
                  }}
                  style={{
                    width: '100%',
                    height: 180,
                  }}
                  resizeMode="cover"
                />

              ) : (

                <View
                  style={{
                    width: '100%',
                    height: 180,
                    backgroundColor: '#F1E9FF',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name="shirt-outline" size={34} color="#7C3AED" />
                </View>

              )}


              <View
                style={{
                  padding: 12,
                }}
              >

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#493275',
                    marginBottom: 6,
                  }}
                >
                  {product.name}
                </Text>


                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#7C3AED',
                  }}
                >
                  ${product.price}
                </Text>

              </View>

            </TouchableOpacity>

          ))}

        </View>

        )}


        {!loading && mostrandoCatalogos && catalogos.length === 0 && (

          <View
            style={styles.emptyContainer}
          >

            <View
              style={styles.emptyIcon}
            >

              <Ionicons
                name="pricetags-outline"
                size={30}
                color="#B7A2D8"
              />

            </View>


            <Text style={styles.emptyTitle}>
              No hay catálogos
            </Text>


            <Text style={styles.emptyText}>
              Todavía no tenemos catálogos disponibles.
            </Text>

          </View>

        )}


        {!loading && !mostrandoCatalogos && products.length === 0 && (

          <View
            style={styles.emptyContainer}
          >

            <View
              style={styles.emptyIcon}
            >

              <Ionicons
                name="bag-outline"
                size={30}
                color="#B7A2D8"
              />

            </View>


            <Text style={styles.emptyTitle}>
              No hay productos
            </Text>


            <Text style={styles.emptyText}>
              Todavía no tenemos productos disponibles
              para este catálogo.
            </Text>

          </View>

        )}

      </ScrollView>

    </View>
  );
};


export default Catalogo;
