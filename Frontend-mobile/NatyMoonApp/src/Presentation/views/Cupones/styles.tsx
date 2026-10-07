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

  menuButton: {
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
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 17,
    fontWeight: '700',
    color: '#493275',
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 13,
    color: '#8B849A',
    textAlign: 'center',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C9A9E0',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  codigo: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7C3AED',
    letterSpacing: 1,
  },

  valorBadge: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  valorBadgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },

  descripcion: {
    fontSize: 13,
    color: '#6B6478',
    marginBottom: 8,
  },

  detalleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },

  detalleLabel: {
    fontSize: 12,
    color: '#8B849A',
  },

  detalleValue: {
    fontSize: 12,
    color: '#493275',
    fontWeight: '600',
  },
});
