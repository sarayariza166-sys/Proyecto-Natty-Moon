import { StyleSheet } from 'react-native';

export const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },


    // ======================================
    // HEADER
    // ======================================

    header: {
      height: 60,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent: 'space-between',

      paddingHorizontal: 16,

      borderBottomWidth: 1,

      borderBottomColor: '#EEEEEE',

      backgroundColor: '#FFFFFF',
    },


    backButton: {
      width: 40,
      height: 40,

      alignItems: 'center',

      justifyContent: 'center',
    },


    headerTitle: {
      fontSize: 18,

      fontWeight: 'bold',

      color: '#493275',
    },


    cartButton: {
      width: 42,
      height: 42,

      alignItems: 'center',

      justifyContent: 'center',

      position: 'relative',
    },


    cartBadge: {
      position: 'absolute',

      top: 0,

      right: 0,

      minWidth: 18,

      height: 18,

      borderRadius: 9,

      backgroundColor: '#7040A8',

      alignItems: 'center',

      justifyContent: 'center',

      paddingHorizontal: 4,
    },


    cartBadgeText: {
      color: '#FFFFFF',

      fontSize: 10,

      fontWeight: '700',
    },


    // ======================================
    // CONTENT
    // ======================================

    content: {
      padding: 20,

      paddingBottom: 40,
    },


    // ======================================
    // IMAGEN
    // ======================================

    productImage: {
      width: '100%',

      height: 280,

      marginBottom: 20,

      backgroundColor: '#F7F0FF',

      borderRadius: 12,
    },


    // ======================================
    // PRODUCTO
    // ======================================

    productName: {
      fontSize: 24,

      fontWeight: 'bold',

      color: '#222222',

      marginBottom: 10,
    },


    price: {
      fontSize: 22,

      fontWeight: 'bold',

      color: '#7C3AED',

      marginBottom: 25,
    },


    // ======================================
    // SECCIONES
    // ======================================

    section: {
      marginTop: 20,
    },


    sectionTitle: {
      fontSize: 18,

      fontWeight: 'bold',

      color: '#222222',

      marginBottom: 10,
    },


    description: {
      fontSize: 16,

      lineHeight: 24,

      color: '#666666',
    },


    // ======================================
    // TALLAS
    // ======================================

    sizesContainer: {
      flexDirection: 'row',

      flexWrap: 'wrap',

      gap: 10,
    },


    sizeButton: {
      width: 48,

      height: 42,

      borderRadius: 10,

      borderWidth: 1,

      borderColor: '#D5C2DD',

      alignItems: 'center',

      justifyContent: 'center',

      backgroundColor: '#FFFFFF',
    },


    selectedSize: {
      backgroundColor: '#7040A8',

      borderColor: '#7040A8',
    },


    sizeText: {
      fontSize: 14,

      fontWeight: '600',

      color: '#493275',
    },


    selectedSizeText: {
      color: '#FFFFFF',
    },


    // ======================================
    // BOTÓN
    // ======================================

    addButton: {
      height: 55,

      backgroundColor: '#7040A8',

      borderRadius: 15,

      marginTop: 30,

      marginBottom: 20,

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent: 'center',

      gap: 10,
    },


    addButtonText: {
      color: '#FFFFFF',

      fontSize: 16,

      fontWeight: '700',
    },
  });
