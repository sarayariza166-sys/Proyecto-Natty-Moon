import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

import { styles } from './styles';
import { Category, useHomeViewModel } from './ViewModel';
import { useAuth } from '../../context/AuthContext';

type DrawerParamList = {
  Home: undefined;
  Catalogo: undefined;
  Buscar: undefined;
  DetalleProducto: undefined;
  Carrito: undefined;
  Login: undefined;
  Register: undefined;
};

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

const Home = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigation = useNavigation<NavigationProp>();

  const {
    categories,
    cartCount,
    handleCategoryPress,
    handleBuyNow,
    handleSpecialDiscount,
    handleSearch,
    handleCart,
    handleMenu,
    handleSeeAll,
  } = useHomeViewModel();

  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleMenu}
          >
            <Ionicons
              name="menu-outline"
              size={27}
              color="#493275"
            />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.logoMoonText}>☾</Text>
            <Text style={styles.logoText}>Nattymoon</Text>
          </View>

          <View style={styles.headerActions}>

            <TouchableOpacity
              style={styles.headerButton}
              onPress={handleSearch}
            >
              <Ionicons
                name="search-outline"
                size={23}
                color="#493275"
              />
            </TouchableOpacity>

            {/* USUARIO */}
            <View style={styles.userContainer}>

              <TouchableOpacity
                style={styles.headerButton}
                onPress={() =>
                  setShowUserMenu(!showUserMenu)
                }
              >
                <Ionicons
                  name="person-outline"
                  size={23}
                  color="#493275"
                />
              </TouchableOpacity>

              {showUserMenu && (
                <View style={styles.userMenu}>

                  <Text style={styles.userMenuTitle}>
                    Mi cuenta
                  </Text>

                  {user ? (

                    <Text style={styles.userMenuText}>
                      Sesión iniciada como{'\n'}{user.email}
                    </Text>

                  ) : (

                    <>
                      <Text style={styles.userMenuText}>
                        ¿Ya tienes una cuenta?
                      </Text>

                      {/* INICIAR SESIÓN */}
                      <TouchableOpacity
                        style={styles.userMenuButton}
                        onPress={() => {
                          setShowUserMenu(false);
                          navigation.navigate('Login');
                        }}
                      >
                        <Text style={styles.userMenuButtonText}>
                          Iniciar sesión
                        </Text>
                      </TouchableOpacity>

                      <Text style={styles.userMenuText}>
                        ¿No tienes cuenta?
                      </Text>

                      {/* REGISTRARSE */}
                      <TouchableOpacity
                        onPress={() => {
                          setShowUserMenu(false);
                          navigation.navigate('Register');
                        }}
                      >
                        <Text style={styles.userRegisterText}>
                          Regístrate
                        </Text>
                      </TouchableOpacity>
                    </>

                  )}

                </View>
              )}

            </View>

            {/* CARRITO */}
            <TouchableOpacity
              style={styles.cartButton}
              onPress={handleCart}
            >
              <Ionicons
                name="bag-outline"
                size={23}
                color="#493275"
              />

              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {cartCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

          </View>
        </View>

        {/* CONTENIDO */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* HERO */}
          <View style={styles.hero}>

            <View style={styles.heroTextContainer}>

              <Text style={styles.heroTitle}>
                Dulces sueños,
              </Text>

              <Text style={styles.heroTitle}>
                momentos
              </Text>

              <Text style={styles.heroTitle}>
                inolvidables
              </Text>

              <Text style={styles.heroDescription}>
                Pijamas de la mejor calidad
              </Text>

              <Text style={styles.heroDescription}>
                para ti y tu familia.
              </Text>

              <TouchableOpacity
                style={styles.buyButton}
                onPress={handleBuyNow}
              >
                <Text style={styles.buyButtonText}>
                  Comprar ahora
                </Text>
              </TouchableOpacity>

            </View>

            <Text style={styles.heroStar1}>✦</Text>
            <Text style={styles.heroStar2}>✦</Text>

            <View style={styles.moonContainer}>

              <Text style={styles.bigMoon}>
                ☾
              </Text>

              <View style={styles.bear}>

                <View style={styles.bearEarLeft} />
                <View style={styles.bearEarRight} />

                <View style={styles.bearFace}>

                  <View style={styles.bearEyes}>
                    <View style={styles.eye} />
                    <View style={styles.eye} />
                  </View>

                  <View style={styles.bearNose} />

                </View>

              </View>

              <View style={styles.pinkBlanket} />

            </View>

            <View style={styles.cloudOne}>
              <View style={styles.cloudCircle1} />
              <View style={styles.cloudCircle2} />
              <View style={styles.cloudBase} />
            </View>

          </View>

          <View style={styles.sectionHeader}>

            <Text style={styles.sectionTitle}>
              Categorías
            </Text>

          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >

            {categories.map((category: Category) => (

              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() =>
                  handleCategoryPress(category)
                }
              >

                <View style={styles.categoryImageContainer}>

                  {category.image ? (

                    <Image
                      source={{ uri: category.image }}
                      style={styles.categoryImage}
                    />

                  ) : (

                    <View
                      style={[
                        styles.categoryPlaceholder,
                        {
                          backgroundColor:
                            category.color,
                        },
                      ]}
                    >

                      <Ionicons
                        name="person"
                        size={40}
                        color="#FFF"
                      />

                    </View>

                  )}

                </View>

                <View
                  style={[
                    styles.categoryLabel,
                    {
                      backgroundColor:
                        category.color,
                    },
                  ]}
                >

                  <Text style={styles.categoryLabelText}>
                    {category.name}
                  </Text>

                </View>

              </TouchableOpacity>

            ))}

            <TouchableOpacity
              style={styles.categoryCard}
              onPress={handleSeeAll}
            >

              <View
                style={[
                  styles.categoryImageContainer,
                  styles.allCategoriesContainer,
                ]}
              >

                <Ionicons
                  name="grid-outline"
                  size={40}
                  color="#8C6AA8"
                />

              </View>

              <View
                style={[
                  styles.categoryLabel,
                  styles.allCategoriesLabel,
                ]}
              >

                <Text style={styles.categoryLabelText}>
                  Ver todo
                </Text>

              </View>

            </TouchableOpacity>

          </ScrollView>

          {/* DESCUENTO */}
          <View style={styles.discountCard}>

            <View style={styles.discountTextContainer}>

              <Text style={styles.discountTitle}>
                ✦ Descuento especial
              </Text>

              <Text style={styles.discountDescription}>
                Por cada 3 pijamas nuevas que traigas
                obtendrás 5% de descuento.
              </Text>

              <TouchableOpacity
                style={styles.discountButton}
                onPress={handleSpecialDiscount}
              >

                <Text style={styles.discountButtonText}>
                  ¡Aprovecha!
                </Text>

              </TouchableOpacity>

            </View>

            <View style={styles.discountBubble}>

              <Text style={styles.discountPercent}>
                5%
              </Text>

              <Text style={styles.discountOff}>
                OFF
              </Text>

            </View>

          </View>

        </ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default Home;
