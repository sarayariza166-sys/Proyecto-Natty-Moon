import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFF7FC',
  },

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

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#493275',
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 14,
    color: '#8B7898',
    textAlign: 'center',
    lineHeight: 21,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: '#493275',
  },

  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  label: {
    fontSize: 13,
    color: '#8B7898',
  },

  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#493275',
  },

  divider: {
    height: 1,
    backgroundColor: '#F0E4F3',
    marginVertical: 10,
  },

  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  productName: {
    flex: 1,
    fontSize: 13,
    color: '#5E4A6B',
  },

  productQty: {
    fontSize: 13,
    color: '#8B7898',
    marginHorizontal: 8,
  },

  productSubtotal: {
    fontSize: 13,
    fontWeight: '600',
    color: '#493275',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#493275',
  },

  totalValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#7C3AED',
  },
});
