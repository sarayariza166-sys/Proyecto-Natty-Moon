import React from 'react';

import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  styles,
} from './styles';

import {
  useBuscarViewModel,
} from './ViewModel';


const Buscar = () => {

  const {
    search,
    setSearch,
    filteredProducts,
    loading,
    goBack,
    openMenu,
    goToDetail,
  } = useBuscarViewModel();


  return (

    <View style={styles.container}>

      {/* =====================================
          HEADER
      ===================================== */}

      <View style={styles.header}>

        {/* MENÚ */}

        <TouchableOpacity
          style={styles.headerButton}
          onPress={openMenu}
        >

          <Ionicons
            name="menu-outline"
            size={27}
            color="#493275"
          />

        </TouchableOpacity>


        {/* TÍTULO */}

        <Text style={styles.title}>
          Buscar
        </Text>


        {/* REGRESAR */}

        <TouchableOpacity
          style={styles.headerButton}
          onPress={goBack}
        >

          <Ionicons
            name="arrow-back"
            size={23}
            color="#493275"
          />

        </TouchableOpacity>

      </View>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* =====================================
            BARRA DE BÚSQUEDA
        ===================================== */}

        <View style={styles.searchContainer}>

          <Ionicons
            name="search-outline"
            size={22}
            color="#8C6AA8"
          />


          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Buscar pijama..."
            placeholderTextColor="#A999B8"
            style={styles.input}
            autoFocus
          />


          {search.length > 0 && (

            <TouchableOpacity
              onPress={() => setSearch('')}
            >

              <Ionicons
                name="close-circle"
                size={20}
                color="#A999B8"
              />

            </TouchableOpacity>

          )}

        </View>


        {/* =====================================
            TÍTULO RESULTADOS
        ===================================== */}

        <Text style={styles.resultTitle}>

          {search.trim()
            ? `Resultados para "${search}"`
            : 'Todos los productos'}

        </Text>


        {/* =====================================
            PRODUCTOS
        ===================================== */}

        {loading && (

          <View style={{ paddingVertical: 40 }}>
            <ActivityIndicator size="large" color="#7C3AED" />
          </View>

        )}

        {!loading && filteredProducts.map(
          (product) => (

            <TouchableOpacity
              key={product.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                goToDetail(product)
              }
            >

              <Image
                source={{
                  uri: product.image,
                }}
                style={styles.image}
                resizeMode="cover"
              />


              <View
                style={styles.cardInfo}
              >

                <Text
                  style={styles.productName}
                >
                  {product.name}
                </Text>


                <Text style={styles.price}>
                  ${product.price}
                </Text>

              </View>


              <View
                style={{
                  justifyContent:
                    'center',
                  paddingRight: 15,
                }}
              >

                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#B7A2D8"
                />

              </View>

            </TouchableOpacity>

          ),
        )}


        {/* =====================================
            SIN RESULTADOS
        ===================================== */}

        {!loading && filteredProducts.length === 0 && (

          <View style={styles.empty}>

            <Ionicons
              name="search-outline"
              size={45}
              color="#B7A2D8"
            />


            <Text style={styles.emptyText}>
              No encontramos productos.
            </Text>


            <Text style={styles.emptyText}>
              Intenta buscar con otro nombre.
            </Text>

          </View>

        )}

      </ScrollView>

    </View>

  );

};


export default Buscar;
