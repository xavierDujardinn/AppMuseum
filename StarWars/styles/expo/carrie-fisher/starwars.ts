import { normalize } from '@/styles/responsive';
import { StyleSheet } from 'react-native';

export const styles_starwars = StyleSheet.create({
    carrieFisherContainer: {
        flex: 1,
        backgroundColor: 'white',
    },

    carrieFisherSafeAreaTop: {
        backgroundColor: 'black',
    },

    challengeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: normalize(20),
    },

    challengeButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid',
        paddingVertical: normalize(18),
        paddingHorizontal: normalize(30),
        borderRadius: normalize(25),
        width: '80%',
        minHeight: normalize(64),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: normalize(40),
    },

    challengeButtonText: {
        textAlign: 'center',
        fontFamily: 'Exo2-SemiBold',
        color: '#F0A820',
        fontSize: normalize(24),
        lineHeight: normalize(30),
        textAlignVertical: 'center',
    },

    challengeBackgroundImage: {
        flex: 1,
    },

    menuBackgroundImage: {
        flex: 1,
    },

    menuContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: normalize(20),
    },

    menuIntroText: {
        color: '#F0A820',
        fontSize: normalize(30),
        lineHeight: normalize(40),
        textAlign: 'center',
        fontFamily: 'StarJedi',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        paddingVertical: normalize(110),
    },

    menuMainButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'red',
        borderStyle: 'solid',
        paddingVertical: normalize(18),
        paddingHorizontal: normalize(30),
        borderRadius: normalize(25),
        width: '80%',
        minHeight: normalize(64),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: normalize(40),
    },

    menuMainButtonText: {
        textAlign: 'center',
        fontFamily: 'Exo2-SemiBold',
        color: '#F0A820',
        fontSize: normalize(24),
        lineHeight: normalize(30),
        textAlignVertical: 'center',
    },

    menuLockedChallengeButton: {
        backgroundColor: 'rgba(50, 50, 50, 0.6)',
        borderWidth: 2,
        borderColor: '#444',
        borderStyle: 'dashed',
        paddingVertical: normalize(18),
        paddingHorizontal: normalize(30),
        borderRadius: normalize(15),
        width: '60%',
        minHeight: normalize(58),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: normalize(20),
        opacity: 0.6,
    },

    menuLockedChallengeButtonText: {
        fontFamily: 'StarJedi',
        color: '#888',
        fontSize: normalize(22),
        lineHeight: normalize(28),
        textAlign: 'center',
        textShadowColor: '#888',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },

    menuUnlockedChallengeButton: {
        backgroundColor: 'rgba(0, 210, 255, 0.15)',
        borderWidth: 2,
        borderColor: '#00D2FF',
        borderStyle: 'solid',
        paddingVertical: normalize(22),
        paddingHorizontal: normalize(32),
        borderRadius: normalize(15),
        width: '90%',
        minHeight: normalize(60),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: normalize(40),
        elevation: 10,
    },

    menuUnlockedChallengeButtonText: {
        fontFamily: 'StarJedi',
        color: '#00D2FF',
        fontSize: normalize(26),
        lineHeight: normalize(32),
        textAlign: 'center',
        textShadowColor: '#00D2FF',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },

    tutorialLucasContainer: {
        flex: 1,
    },

    tutorialLucasBackgroundImage: {
        ...StyleSheet.absoluteFillObject,
    },

    tutorialLucasOverlay: {
        ...StyleSheet.absoluteFillObject,
    },

    tutorialLucasContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: normalize(20),
    },

    tutorialLucasTextWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: normalize(60),
    },

    tutorialLucasText: {
        width: '100%',
        color: '#FFD05A',
        fontSize: normalize(24),
        lineHeight: normalize(34),
        textAlign: 'center',
        fontFamily: 'StarJedi',
        textShadowColor: '#FFD05A',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 12,
    },

    tutorialLucasButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        borderWidth: 1.5,
        borderColor: 'red',
        borderStyle: 'solid',
        paddingVertical: normalize(16),
        paddingHorizontal: normalize(26),
        borderRadius: normalize(25),
        width: '85%',
        minHeight: normalize(62),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: normalize(20),
    },

    tutorialLucasButtonText: {
        textAlign: 'center',
        fontFamily: 'Exo2-SemiBold',
        color: '#F0A820',
        fontSize: normalize(22),
        lineHeight: normalize(28),
        textShadowColor: 'rgba(240, 168, 32, 0.7)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
        textAlignVertical: 'center',
    },

    playingLucasContainer: {
        flex: 1,
    },

    playingLucasBackgroundImage: {
        ...StyleSheet.absoluteFillObject,
    },

    playingLucasOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: normalize(20),
        paddingBottom: normalize(40),
        paddingHorizontal: normalize(20),
    },

    playingLucasTopBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: normalize(10),
    },

    playingLucasTimerText: {
        flex: 1,
        color: '#F0A820',
        fontSize: normalize(20),
        lineHeight: normalize(26),
        fontFamily: 'Exo2-Bold',
        textShadowColor: '#00000099',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 6,
    },

    playingLucasHintButton: {
        width: normalize(48),
        height: normalize(48),
        alignItems: 'center',
        justifyContent: 'center',
    },

    playingLucasHintIcon: {
        width: normalize(42),
        height: normalize(42),
    },

    playingLucasTitle: {
        color: '#C62828',
        fontSize: normalize(22),
        lineHeight: normalize(30),
        textAlign: 'center',
        fontFamily: 'Exo2-Bold',
        marginTop: normalize(10),
        textShadowColor: '#C62828',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },

    playingLucasCompassButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%',
    },

    playingLucasCompass: {
        width: normalize(320),
        height: normalize(320),
        transform: [{ rotate: '31deg' }],
    },

    playingLucasBackButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1.5,
        borderColor: 'red',
        borderStyle: 'solid',
        paddingVertical: normalize(16),
        paddingHorizontal: normalize(26),
        borderRadius: normalize(25),
        width: '85%',
        minHeight: normalize(62),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: normalize(10),
    },

    playingLucasBackButtonText: {
        textAlign: 'center',
        fontFamily: 'Exo2-SemiBold',
        color: '#F0A820',
        fontSize: normalize(22),
        lineHeight: normalize(28),
        textShadowColor: '#FFFFFF40',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 12,
        textAlignVertical: 'center',
    },

    winLucasContainer: {
        flex: 1,
    },

    winLucasBackgroundImage: {
        ...StyleSheet.absoluteFillObject,
    },

    winLucasOverlay: {
        flex: 1,
        alignItems: 'center',
        paddingTop: normalize(90),
        paddingBottom: normalize(30),
        paddingHorizontal: normalize(20),
    },

    winLucasTitle: {
        color: '#C62828',
        fontSize: normalize(24),
        lineHeight: normalize(32),
        textAlign: 'center',
        fontFamily: 'Exo2-Bold',
        marginBottom: normalize(20),
        textShadowColor: '#FFFFFF33',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },

    winLucasR2D2: {
        width: normalize(150),
        height: normalize(200),
        marginTop: normalize(10),
        marginBottom: normalize(10),
    },

    winLucasCardButton: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: normalize(-10),
        marginBottom: normalize(20),
        padding: normalize(4),
        borderWidth: 2,
        borderColor: '#F0A820',
        borderRadius: normalize(12),
        backgroundColor: 'rgba(0, 0, 0, 0.22)',
        shadowColor: '#F0A820',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
    },

    winLucasCard: {
        width: normalize(110),
        height: normalize(90),
    },

    winLucasBackButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.18)',
        borderWidth: 1.5,
        borderColor: 'red',
        borderStyle: 'solid',
        paddingVertical: normalize(16),
        paddingHorizontal: normalize(24),
        borderRadius: normalize(25),
        width: '85%',
        minHeight: normalize(62),
        alignItems: 'center',
        justifyContent: 'center',
    },

    winLucasBackButtonText: {
        textAlign: 'center',
        fontFamily: 'Exo2-SemiBold',
        color: '#F0A820',
        fontSize: normalize(20),
        lineHeight: normalize(26),
        textAlignVertical: 'center',
    },

    funfactLucasContainer: {
        flex: 1,
    },

    funfactLucasBackgroundImage: {
        ...StyleSheet.absoluteFillObject,
    },

    funfactLucasOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: normalize(120),
        paddingBottom: normalize(35),
        paddingHorizontal: normalize(18),
    },

    funfactLucasImage: {
        width: '92%',
        height: normalize(400),
    },

    funfactLucasScoreButton: {
        width: '88%',
        minHeight: normalize(82),
        borderRadius: normalize(28),
        borderWidth: 1.5,
        borderColor: '#E35A3B',
        backgroundColor: 'rgba(186, 153, 102, 0.20)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(12),
    },

    funfactLucasScoreButtonText: {
        color: '#F0A820',
        fontSize: normalize(20),
        lineHeight: normalize(26),
        fontFamily: 'Exo2-SemiBold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    scoreboardLucasContainer: {
        flex: 1,
    },

    scoreboardLucasBackgroundImage: {
        ...StyleSheet.absoluteFillObject,
    },

    scoreboardLucasOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: normalize(90),
        paddingBottom: normalize(35),
        paddingHorizontal: normalize(20),
    },

    scoreboardLucasScoreBlock: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    scoreboardLucasTitle: {
        color: '#111',
        fontSize: normalize(25),
        lineHeight: normalize(32),
        fontFamily: 'Exo2-Bold',
        textAlign: 'center',
        marginBottom: normalize(6),
    },

    scoreboardLucasSeparator: {
        color: '#111',
        fontSize: normalize(25),
        lineHeight: normalize(32),
        fontFamily: 'Exo2-Bold',
        textAlign: 'center',
        marginBottom: normalize(8),
    },

    scoreboardLucasPlayerTime: {
        marginBottom: normalize(10),
        color: '#C62828',
        fontSize: normalize(22),
        lineHeight: normalize(28),
    },

    scoreboardLucasScoreLine: {
        color: '#111',
        fontSize: normalize(18),
        lineHeight: normalize(24),
        fontFamily: 'Exo2-Bold',
        textAlign: 'center',
        marginBottom: normalize(2),
    },

    scoreboardLucasNextButton: {
        marginTop: 'auto',
        width: '88%',
        minHeight: normalize(82),
        borderRadius: normalize(28),
        borderWidth: 1.5,
        borderColor: '#E35A3B',
        backgroundColor: 'rgba(186, 153, 102, 0.20)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: normalize(16),
        paddingVertical: normalize(12),
    },

    scoreboardLucasNextButtonText: {
        color: '#F0A820',
        fontSize: normalize(20),
        lineHeight: normalize(26),
        fontFamily: 'Exo2-SemiBold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    hintModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.01)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: normalize(24),
    },

    hintModalContent: {
        width: '100%',
        maxHeight: '80%',
        backgroundColor: 'rgba(154,140,152, 0.95)',
        borderRadius: normalize(18),
        paddingHorizontal: normalize(18),
        paddingTop: normalize(14),
        paddingBottom: normalize(18),
        borderWidth: 1.5,
        borderColor: '#000000',
    },

    hintModalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: normalize(10),
    },

    hintModalTitle: {
        color: '#000000',
        fontSize: normalize(20),
        lineHeight: normalize(26),
        fontFamily: 'Exo2-SemiBold',
        flex: 1,
        marginRight: normalize(12),
    },

    hintModalCloseIcon: {
        color: '#000000',
        fontSize: normalize(24),
        paddingHorizontal: normalize(6),
    },

    hintModalScrollText: {
        marginTop: normalize(4),
    },

    hintModalText: {
        color: '#fff',
        fontSize: normalize(16),
        lineHeight: normalize(22),
        fontFamily: 'Exo2',
    },

    menuButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    menuWinLogo: {
        width: 60,
        height: 60,
        marginLeft: 20,
    },
});

export default styles_starwars;