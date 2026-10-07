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
    paddingBottom: 100,
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
    padding: 16,
    marginBottom: 14,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },

  asunto: {
    fontSize: 15,
    fontWeight: '700',
    color: '#493275',
    flex: 1,
    marginRight: 8,
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },

  descripcion: {
    fontSize: 13,
    color: '#6B6478',
    marginBottom: 8,
  },

  respuestaBox: {
    backgroundColor: '#F1EAFB',
    borderRadius: 10,
    padding: 10,
    marginTop: 6,
  },

  respuestaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
    marginBottom: 3,
  },

  respuestaText: {
    fontSize: 13,
    color: '#493275',
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#493275',
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#493275',
    marginTop: 12,
    marginBottom: 6,
  },

  input: {
    backgroundColor: '#F7F2FB',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#493275',
  },

  primaryButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
  },

  secondaryButtonText: {
    color: '#8B849A',
    fontWeight: '600',
    fontSize: 14,
  },
});
