import { StyleSheet } from 'react-native';

export const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#FFF7FC',
    },


    // ======================================
    // HEADER
    // ======================================

    header: {
      height: 65,

      backgroundColor: '#FFFFFF',

      flexDirection: 'row',

      alignItems: 'center',

      justifyContent: 'space-between',

      paddingHorizontal: 16,

      borderBottomWidth: 1,

      borderBottomColor: '#F0E4F3',
    },


    backButton: {
      width: 42,
      height: 42,

      alignItems: 'center',
      justifyContent: 'center',
    },


    headerTitle: {
      fontSize: 20,

      fontWeight: '700',

      color: '#493275',
    },


    headerRight: {
      width: 42,
    },


    // ======================================
    // CONTENT
    // ======================================

    content: {
      padding: 16,

      paddingBottom: 40,
    },


    // ======================================
    // CARRITO VACÍO
    // ======================================

    emptyContainer: {
      flex: 1,

      alignItems: 'center',

      justifyContent: 'center',

      paddingHorizontal: 30,
    },


    emptyIcon: {
      width: 90,
      height: 90,

      borderRadius: 45,

      backgroundColor: '#E8C8E8',

      alignItems: 'center',

      justifyContent: 'center',

      marginBottom: 20,
    },


    emptyTitle: {
      fontSize: 22,

      fontWeight: '700',

      color: '#493275',

      marginBottom: 8,
    },


    emptyText: {
      fontSize: 15,

      color: '#8B7898',

      textAlign: 'center',

      lineHeight: 22,
    },


    // ======================================
    // PRODUCTO
    // ======================================

    item: {
      backgroundColor: '#FFFFFF',

      borderRadius: 16,

      padding: 12,

      marginBottom: 14,

      flexDirection: 'row',

      shadowColor: '#000',

      shadowOpacity: 0.04,

      shadowRadius: 5,

      elevation: 2,
    },


    itemImage: {
      width: 95,

      height: 110,

      borderRadius: 12,

      backgroundColor: '#F5EDF7',
    },


    itemInfo: {
      flex: 1,

      paddingLeft: 12,
    },


    itemName: {
      fontSize: 16,

      fontWeight: '700',

      color: '#493275',

      marginBottom: 6,
    },


    itemSize: {
      fontSize: 14,

      color: '#8B7898',

      marginBottom: 8,
    },


    itemPrice: {
      fontSize: 17,

      fontWeight: '700',

      color: '#7C3AED',

      marginBottom: 10,
    },


    bottomRow: {
      flexDirection: 'row',

      alignItems: 'center',

      justifyContent: 'space-between',
    },


    // ======================================
    // CANTIDAD
    // ======================================

    quantityContainer: {
      flexDirection: 'row',

      alignItems: 'center',

      backgroundColor: '#F3E7F5',

      borderRadius: 10,
    },


    quantityButton: {
      width: 32,

      height: 32,

      alignItems: 'center',

      justifyContent: 'center',
    },


    quantity: {
      fontSize: 15,

      fontWeight: '700',

      color: '#493275',

      minWidth: 25,

      textAlign: 'center',
    },


    deleteButton: {
      padding: 5,
    },


    // ======================================
    // RESUMEN
    // ======================================

    summary: {
      backgroundColor: '#E7C6E7',

      borderRadius: 18,

      padding: 18,

      marginTop: 8,
    },


    summaryTitle: {
      fontSize: 19,

      fontWeight: '700',

      color: '#493275',

      marginBottom: 15,
    },


    summaryRow: {
      flexDirection: 'row',

      justifyContent: 'space-between',

      marginBottom: 10,
    },


    summaryLabel: {
      fontSize: 15,

      color: '#705B7D',
    },


    summaryValue: {
      fontSize: 15,

      fontWeight: '600',

      color: '#493275',
    },


    divider: {
      height: 1,

      backgroundColor: '#D5AAD8',

      marginVertical: 8,
    },


    totalLabel: {
      fontSize: 18,

      fontWeight: '700',

      color: '#493275',
    },


    totalValue: {
      fontSize: 22,

      fontWeight: '800',

      color: '#7C3AED',
    },


    // ======================================
    // COMPRAR
    // ======================================

    checkoutButton: {
      backgroundColor: '#7040A8',

      height: 52,

      borderRadius: 14,

      alignItems: 'center',

      justifyContent: 'center',

      marginTop: 18,
    },


    checkoutText: {
      color: '#FFFFFF',

      fontSize: 16,

      fontWeight: '700',
    },


    // ======================================
    // VACIAR
    // ======================================

    clearButton: {
      alignItems: 'center',

      marginTop: 14,

      marginBottom: 10,
    },


    clearText: {
      color: '#9B4D9E',

      fontSize: 14,

      fontWeight: '600',
    },
  });
