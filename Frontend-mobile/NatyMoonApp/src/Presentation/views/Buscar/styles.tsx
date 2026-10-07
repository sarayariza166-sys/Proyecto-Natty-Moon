import {
  StyleSheet,
} from 'react-native';


export const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#F7F0FF',
    },


    header: {
      height: 90,
      paddingHorizontal: 18,
      paddingTop: 35,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },


    headerButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
    },


    title: {
      fontSize: 21,
      fontWeight: '700',
      color: '#493275',
    },


    content: {
      padding: 18,
      paddingBottom: 40,
    },


    searchContainer: {
      height: 52,
      backgroundColor: '#FFFFFF',
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 25,
    },


    input: {
      flex: 1,
      fontSize: 16,
      color: '#493275',
      marginLeft: 10,
    },


    resultTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#493275',
      marginBottom: 15,
    },


    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 15,
      flexDirection: 'row',
    },


    image: {
      width: 110,
      height: 120,
    },


    cardInfo: {
      flex: 1,
      padding: 15,
      justifyContent: 'center',
    },


    productName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#493275',
      marginBottom: 8,
    },


    price: {
      fontSize: 17,
      fontWeight: '700',
      color: '#7C3AED',
    },


    empty: {
      alignItems: 'center',
      marginTop: 50,
    },


    emptyText: {
      marginTop: 10,
      fontSize: 16,
      color: '#8C6AA8',
      textAlign: 'center',
    },

  });
