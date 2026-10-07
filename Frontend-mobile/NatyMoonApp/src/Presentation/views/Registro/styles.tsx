import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FDEAF7',
    },

    content: {
        paddingBottom: 25,
    },

    header: {
        height: 75,
        backgroundColor: '#FFF8FC',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },

    menu: {
        fontSize: 27,
        color: '#43267A',
    },

    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },

    logo: {
        width: 58,
        height: 58,
    },

    logoText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#38206E',
        marginLeft: 3,
    },

    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    icon: {
        fontSize: 26,
        color: '#38206E',
    },

    banner: {
        height: 245,
        marginTop: 0,
        backgroundColor: '#EFC6F4',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        position: 'relative',
        overflow: 'hidden',
    },

    titleContainer: {
        position: 'absolute',
        left: 25,
        top: 72,
        zIndex: 2,
    },

    title: {
        fontSize: 27,
        lineHeight: 31,
        fontWeight: 'bold',
        color: '#38206E',
    },

    heart: {
        position: 'absolute',
        right: -25,
        bottom: -2,
        fontSize: 27,
        color: '#38206E',
    },

    registerImage: {
        position: 'absolute',
        width: 190,
        height: 190,
        right: 10,
        top: 30,
    },

    sparkle1: {
        position: 'absolute',
        left: 28,
        top: 20,
        fontSize: 22,
        color: '#FFFFFF',
    },

    sparkle2: {
        position: 'absolute',
        right: 15,
        top: 15,
        fontSize: 22,
        color: '#FFFFFF',
    },

    sparkle3: {
        position: 'absolute',
        left: 160,
        bottom: 15,
        fontSize: 18,
        color: '#9B63D5',
    },

    form: {
        paddingHorizontal: 27,
        paddingTop: 5,
    },

    inputContainer: {
        height: 44,
        backgroundColor: '#FFF9FC',
        borderWidth: 1.5,
        borderColor: '#C9A7D0',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        marginTop: 11,
    },

    inputIcon: {
        width: 28,
        fontSize: 23,
        color: '#8A7B9B',
        textAlign: 'center',
    },

    input: {
        flex: 1,
        height: 44,
        fontSize: 14,
        color: '#4C3B63',
        paddingHorizontal: 8,
    },

    show: {
        fontSize: 12,
        color: '#81718F',
    },

    eye: {
        fontSize: 17,
        color: '#81718F',
        marginLeft: 8,
    },

    showText: {
        fontSize: 9,
        color: '#81798D',
        marginRight: 5,
    },

    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 13,
    },

    checkbox: {
        width: 19,
        height: 19,
        borderWidth: 2,
        borderColor: '#55338C',
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },

    check: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#55338C',
    },

    terms: {
        marginLeft: 8,
        fontSize: 13,
        color: '#382C49',
    },

    button: {
        height: 47,
        backgroundColor: '#542795',
        borderRadius: 25,
        marginTop: 19,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        elevation: 3,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },

    buttonStar: {
        position: 'absolute',
        right: 15,
        fontSize: 20,
        color: '#F7D96B',
    },

    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18,
    },

    loginText: {
        fontSize: 13,
        color: '#463A50',
    },

    loginLink: {
        fontSize: 13,
        color: '#593194',
        fontWeight: 'bold',
        marginLeft: 4,
        textDecorationLine: 'underline',
    },

});

export default styles;