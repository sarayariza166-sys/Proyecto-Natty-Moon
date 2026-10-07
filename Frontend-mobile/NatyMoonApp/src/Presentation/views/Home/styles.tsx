import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#FFF5FA',
  primary: '#513477',
  primaryLight: '#75549C',
  pink: '#F7C6DC',
  pinkLight: '#FDE4EF',
  purple: '#D9C2EE',
  purpleDark: '#8A65B1',
  text: '#3F2860',
  textLight: '#74627E',
  white: '#FFFFFF',
  yellow: '#FFD43B',
  woman: '#E9A7C4',
  man: '#4B80B1',
  girl: '#F0A5BE',
  boy: '#7BA6CE',
  border: '#EBD8E8',
};

export const styles = StyleSheet.create({

  /* PEGA AQUÍ TODOS TUS ESTILOS ACTUALES */

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    height: 66,
    backgroundColor: '#FFF7FB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F4E6EF',
  },

  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoMoon: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
    position: 'relative',
  },

  logoMoonText: {
    color: '#F4B936',
    fontSize: 43,
    lineHeight: 43,
  },

  logoStar: {
    position: 'absolute',
    color: '#F4B936',
    fontSize: 13,
    top: 2,
    right: 1,
  },

  logoText: {
    color: COLORS.primary,
    fontSize: 22,
    fontWeight: '800',
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cartButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  cartBadge: {
    position: 'absolute',
    top: 2,
    right: 0,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cartBadgeText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '700',
  },


  /* =================================
     MENÚ USUARIO
  ================================= */

  userContainer: {
    position: 'relative',
    zIndex: 999,
  },

  userMenu: {
    position: 'absolute',
    top: 45,
    right: -70,
    width: 210,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    zIndex: 999,
  },

  userMenuTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#493275',
    marginBottom: 10,
  },

  userMenuText: {
    fontSize: 12,
    color: '#74627E',
    marginBottom: 6,
  },

  userMenuButton: {
    backgroundColor: '#674198',
    borderRadius: 8,
    paddingVertical: 9,
    alignItems: 'center',
    marginBottom: 12,
  },

  userMenuButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  userRegisterText: {
    color: '#674198',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },


  /* =================================
     RESTO DE TUS ESTILOS
  ================================= */

  scrollContent: {
    paddingBottom: 20,
  },

  hero: {
    height: 276,
    backgroundColor: '#E6BEE4',
    overflow: 'hidden',
    position: 'relative',
  },

  heroTextContainer: {
    position: 'absolute',
    left: 20,
    top: 36,
    zIndex: 10,
  },

  heroTitle: {
    color: '#4A286F',
    fontSize: 21,
    lineHeight: 23,
    fontWeight: '800',
  },

  heroDescription: {
    color: '#634878',
    fontSize: 10,
    lineHeight: 14,
  },

  buyButton: {
    marginTop: 15,
    width: 101,
    height: 36,
    backgroundColor: '#674198',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  heroStar1: {
    position: 'absolute',
    right: 42,
    top: 16,
    color: '#FFD335',
    fontSize: 22,
  },

  heroStar2: {
    position: 'absolute',
    right: 20,
    top: 50,
    color: '#FFD335',
    fontSize: 15,
  },

  heroStar3: {
    position: 'absolute',
    right: 93,
    top: 7,
    color: '#FFFFFF',
    fontSize: 15,
  },

  moonContainer: {
    position: 'absolute',
    right: 8,
    top: 25,
    width: 160,
    height: 180,
  },

  bigMoon: {
    position: 'absolute',
    right: 17,
    top: 4,
    color: '#FFC928',
    fontSize: 142,
  },

  bear: {
    position: 'absolute',
    right: 25,
    top: 72,
    width: 75,
    height: 85,
  },

  bearEarLeft: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#9A593C',
    left: 4,
    top: 1,
  },

  bearEarRight: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#9A593C',
    right: 4,
    top: 1,
  },

  bearFace: {
    position: 'absolute',
    left: 6,
    top: 8,
    width: 63,
    height: 65,
    borderRadius: 32,
    backgroundColor: '#A96342',
    alignItems: 'center',
  },

  bearEyes: {
    width: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 23,
  },

  eye: {
    width: 5,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#3B211A',
  },

  bearNose: {
    marginTop: 5,
    width: 12,
    height: 9,
    borderRadius: 7,
    backgroundColor: '#42231B',
  },

  bearSmile: {
    marginTop: -3,
  },

  pinkBlanket: {
    position: 'absolute',
    width: 75,
    height: 27,
    borderRadius: 20,
    backgroundColor: '#F29CC6',
    right: 18,
    bottom: 16,
  },

  cloudOne: {
    position: 'absolute',
    left: 145,
    bottom: -2,
    width: 70,
    height: 45,
  },

  cloudCircle1: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    left: 4,
    bottom: 5,
  },

  cloudCircle2: {
    position: 'absolute',
    width: 41,
    height: 41,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    left: 27,
    bottom: 5,
  },

  cloudBase: {
    position: 'absolute',
    width: 70,
    height: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    bottom: 0,
  },

  cloudTwo: {
    position: 'absolute',
    right: -5,
    bottom: -3,
    width: 85,
    height: 47,
  },

  cloudCircle3: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    left: 5,
    bottom: 5,
  },

  cloudCircle4: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    left: 30,
    bottom: 5,
  },

  cloudBase2: {
    position: 'absolute',
    width: 85,
    height: 19,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    bottom: 0,
  },

  benefits: {
    height: 82,
    marginTop: 5,
    backgroundColor: '#FFF9FC',
    flexDirection: 'row',
    alignItems: 'center',
  },

  benefitItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  benefitIcon: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  benefitText: {
    color: '#635074',
    fontSize: 9,
    lineHeight: 12,
    textAlign: 'center',
  },

  divider: {
    width: 1,
    height: 42,
    backgroundColor: '#F0DCE8',
  },

  sectionHeader: {
    paddingHorizontal: 8,
    marginTop: 13,
    marginBottom: 8,
  },

  sectionTitle: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: '800',
  },

  categoriesContainer: {
    paddingHorizontal: 8,
    gap: 7,
  },

  categoryCard: {
    width: 70,
    borderRadius: 11,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  categoryImageContainer: {
    width: 70,
    height: 91,
    backgroundColor: '#F3D7E4',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryImage: {
    width: '100%',
    height: '100%',
  },

  categoryPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  categoryLabel: {
    height: 27,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  categoryStar: {
    color: '#FFE45B',
    fontSize: 10,
    marginLeft: 2,
  },

  allCategoriesContainer: {
    backgroundColor: '#F8E8F1',
  },

  allCategoriesLabel: {
    backgroundColor: '#E8D0EC',
  },

  discountCard: {
    height: 116,
    marginHorizontal: 8,
    marginTop: 17,
    borderRadius: 15,
    backgroundColor: '#E8C7E9',
    overflow: 'hidden',
    position: 'relative',
    flexDirection: 'row',
  },

  discountTextContainer: {
    flex: 1,
    paddingLeft: 13,
    paddingTop: 13,
  },

  discountTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  discountTitle: {
    color: '#58377D',
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 6,
  },

  discountDescription: {
    color: '#654B74',
    fontSize: 8,
    lineHeight: 11,
  },

  discountButton: {
    marginTop: 8,
    backgroundColor: '#70439B',
    borderRadius: 7,
    width: 65,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  discountButtonText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
  },

  discountBubble: {
    position: 'absolute',
    right: 25,
    top: 15,
    width: 78,
    height: 78,
    borderRadius: 40,
    backgroundColor: '#9D7ACC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  discountPercent: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '900',
  },

  discountOff: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },

  discountStar: {
    position: 'absolute',
    right: 8,
    top: 15,
    color: '#FFFFFF',
    fontSize: 17,
  },

  footerBenefits: {
    minHeight: 42,
    marginTop: 14,
    backgroundColor: '#FFF8FC',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0DFE9',
    alignItems: 'center',
  },

  footerBenefit: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  footerBenefitText: {
    color: '#604B73',
    fontSize: 8,
    marginLeft: 5,
  },

});
