import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCE9F2',
    },

    header: {
        height: 90,
        backgroundColor: '#FCE9F2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingTop: 12,
    },

    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    logoMoon: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logoMoonText: {
        fontSize: 38,
    },

    logoText: {
        fontSize: 23,
        fontWeight: '800',
        color: '#3D286D',
        marginLeft: 2,
    },

    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
    },

    badge: {
        position: 'absolute',
        right: -5,
        top: -7,
        width: 15,
        height: 15,
        borderRadius: 10,
        backgroundColor: '#3D286D',
        alignItems: 'center',
        justifyContent: 'center',
    },

    badgeText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: 'bold',
    },

    background: {
        flex: 1,
        backgroundColor: '#F4B8D9',
        paddingHorizontal: 7,
        paddingTop: 22,
    },

    loginCard: {
        flex: 1,
        backgroundColor: '#FCECF5',
        borderRadius: 22,
        overflow: 'hidden',
        paddingHorizontal: 23,
        paddingTop: 85,
        position: 'relative',
    },

    titleArea: {
        zIndex: 3,
    },

    title: {
        fontSize: 23,
        lineHeight: 28,
        fontWeight: '800',
        color: '#39266B',
    },

    cloudTop: {
        position: 'absolute',
        right: 5,
        top: 10,
        opacity: 0.8,
    },

    cloudBottom: {
        position: 'absolute',
        right: -15,
        bottom: 20,
        opacity: 0.8,
    },

    cloudText: {
        fontSize: 70,
    },

    moonIllustration: {
        position: 'absolute',
        right: 2,
        top: 95,
        width: 145,
        height: 145,
        alignItems: 'center',
        justifyContent: 'center',
    },

    moonText: {
        fontSize: 120,
    },

    brandText: {
        fontSize: 26,
        fontWeight: '800',
        color: '#493275',
        textAlign: 'center',
    },

    teddyText: {
        position: 'absolute',
        fontSize: 50,
        right: 27,
        top: 45,
    },

    starOne: {
        position: 'absolute',
        right: 2,
        top: 22,
        fontSize: 24,
        color: '#FFCC24',
    },

    starTwo: {
        position: 'absolute',
        right: -4,
        top: 57,
        fontSize: 19,
        color: '#FFCC24',
    },

    inputContainer: {
        height: 42,
        borderWidth: 1,
        borderColor: '#B9ABC9',
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 11,
        marginTop: 13,
        zIndex: 5,
    },

    input: {
        flex: 1,
        height: 40,
        fontSize: 11,
        color: '#403654',
        marginLeft: 7,
    },

    showText: {
        fontSize: 9,
        color: '#81798D',
        marginRight: 5,
    },

    rememberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },

    checkbox: {
        width: 15,
        height: 15,
        borderWidth: 1.5,
        borderColor: '#7B7190',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },

    checkboxActive: {
        backgroundColor: '#4A327A',
        borderColor: '#4A327A',
    },

    rememberText: {
        fontSize: 11,
        color: '#433852',
        marginLeft: 6,
    },

    loginButton: {
        height: 51,
        borderRadius: 28,
        backgroundColor: '#503485',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 105,
        elevation: 4,
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },

    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '800',
    },

    forgotText: {
        textAlign: 'center',
        marginTop: 14,
        color: '#3F3155',
        fontSize: 11,
    },

    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 14,
    },

    registerText: {
        color: '#3F3155',
        fontSize: 11,
    },

    registerLink: {
        color: '#3D286D',
        fontSize: 11,
        fontWeight: '700',
    },

    bottomText: {
        textAlign: 'center',
        color: '#5A3C83',
        fontWeight: '700',
        fontSize: 11,
        paddingVertical: 10,
    },
});

export default styles;