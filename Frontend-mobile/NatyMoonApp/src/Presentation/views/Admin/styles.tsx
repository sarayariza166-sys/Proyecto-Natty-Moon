import { StyleSheet } from 'react-native';

export const ADMIN_COLORS = {
  background: '#FFF7FC',
  primary: '#7C3AED',
  primaryDark: '#493275',
  text: '#493275',
  textLight: '#8B7898',
  border: '#F0E4F3',
  card: '#FFFFFF',
  danger: '#C04B6B',
  success: '#4CA26A',
  warning: '#D9A441',
};

export const adminStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: ADMIN_COLORS.background,
  },

  header: {
    height: 65,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: ADMIN_COLORS.border,
  },

  menuButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: ADMIN_COLORS.text,
  },

  headerRight: {
    width: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    padding: 16,
    paddingBottom: 60,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: ADMIN_COLORS.text,
    marginTop: 14,
    marginBottom: 8,
  },

  // ==========================================
  // TARJETAS DE ESTADÍSTICAS (dashboard)
  // ==========================================

  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },

  statCard: {
    flexBasis: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },

  statValue: {
    fontSize: 26,
    fontWeight: '800',
    color: ADMIN_COLORS.primary,
    marginTop: 8,
  },

  statLabel: {
    fontSize: 12,
    color: ADMIN_COLORS.textLight,
    marginTop: 2,
  },

  // ==========================================
  // TARJETAS DE LISTA (productos, pedidos, usuarios)
  // ==========================================

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },

  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#F5EDF7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardInfo: {
    flex: 1,
    paddingLeft: 12,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: ADMIN_COLORS.text,
    marginBottom: 3,
  },

  cardSubtitle: {
    fontSize: 12,
    color: ADMIN_COLORS.textLight,
    marginBottom: 2,
  },

  cardActions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 10,
  },

  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E7F5',
  },

  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ==========================================
  // BOTÓN FLOTANTE (agregar)
  // ==========================================

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ADMIN_COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  // ==========================================
  // ESTADO VACÍO / CARGANDO
  // ==========================================

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
    paddingHorizontal: 30,
  },

  emptyText: {
    fontSize: 14,
    color: ADMIN_COLORS.textLight,
    textAlign: 'center',
    marginTop: 10,
  },

  // ==========================================
  // MODAL / FORMULARIO
  // ==========================================

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(30, 15, 40, 0.4)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '88%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: ADMIN_COLORS.text,
    marginBottom: 16,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: ADMIN_COLORS.text,
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: ADMIN_COLORS.text,
    backgroundColor: '#FCFAFD',
  },

  pickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },

  pickerOption: {
    borderWidth: 1,
    borderColor: ADMIN_COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FCFAFD',
  },

  pickerOptionSelected: {
    backgroundColor: ADMIN_COLORS.primary,
    borderColor: ADMIN_COLORS.primary,
  },

  pickerOptionText: {
    fontSize: 13,
    color: ADMIN_COLORS.text,
    fontWeight: '600',
  },

  pickerOptionTextSelected: {
    color: '#FFFFFF',
  },

  primaryButton: {
    backgroundColor: ADMIN_COLORS.primary,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  secondaryButton: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  secondaryButtonText: {
    color: ADMIN_COLORS.textLight,
    fontSize: 14,
    fontWeight: '600',
  },
});
