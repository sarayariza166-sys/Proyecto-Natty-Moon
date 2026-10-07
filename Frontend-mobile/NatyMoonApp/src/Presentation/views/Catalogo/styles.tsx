import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F0FF',
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  header: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#6D28D9',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2E2635',
  },

  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#6D28D9',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  titleContainer: {
    marginBottom: 24,
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#27202F',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: '#83798D',
  },

  categoriesContainer: {
    gap: 12,
  },

  categoryCard: {
    height: 78,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 14,

    borderWidth: 1,
    borderColor: '#ECE5F2',

    shadowColor: '#5E35B1',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 7,
    elevation: 2,
  },

  categoryCardSelected: {
    backgroundColor: '#7C3AED',
    borderColor: '#7C3AED',

    shadowColor: '#7C3AED',
    shadowOpacity: 0.18,
  },

  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F1E9FF',
    marginRight: 14,
  },

  categoryIconContainerSelected: {
    backgroundColor: 'rgba(255,255,255,0.20)',
  },

  categoryName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#352C3D',
  },

  categoryNameSelected: {
    color: '#FFFFFF',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 35,
    paddingHorizontal: 30,
    paddingVertical: 30,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9DDF5',
    borderStyle: 'dashed',
    backgroundColor: 'rgba(255,255,255,0.45)',
  },

  emptyIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#EDE3FA',
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4A3D55',
    marginBottom: 7,
  },

  emptyText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: '#8D8198',
  },
});
