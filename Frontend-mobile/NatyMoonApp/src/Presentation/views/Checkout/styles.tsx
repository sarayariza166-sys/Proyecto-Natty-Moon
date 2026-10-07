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
    paddingBottom: 60,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#493275',
    marginTop: 20,
    marginBottom: 10,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  // ===== Direcciones =====

  direccionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },

  direccionCardSelected: {
    borderColor: '#7C3AED',
  },

  direccionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#493275',
    marginBottom: 3,
  },

  direccionText: {
    fontSize: 13,
    color: '#8B7898',
  },

  addLink: {
    marginTop: 4,
    marginBottom: 4,
  },

  addLinkText: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: '700',
  },

  // ===== Formulario (nueva dirección) =====

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#493275',
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: '#F0E4F3',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#493275',
    backgroundColor: '#FCFAFD',
  },

  saveAddressButton: {
    backgroundColor: '#493275',
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },

  saveAddressButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // ===== Método de pago =====

  metodosRow: {
    flexDirection: 'row',
    gap: 10,
  },

  metodoCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },

  metodoCardSelected: {
    borderColor: '#7C3AED',
    backgroundColor: '#F3E7F5',
  },

  metodoText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '700',
    color: '#493275',
  },

  // ===== Resumen / total =====

  summary: {
    backgroundColor: '#E7C6E7',
    borderRadius: 18,
    padding: 18,
    marginTop: 24,
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

  confirmButton: {
    backgroundColor: '#7040A8',
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },

  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
