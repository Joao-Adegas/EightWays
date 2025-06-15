import React from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import StatusNutricao from './StatusNutricao';

const { width, height } = Dimensions.get('window');
const isTablet = width > 600;
const CARD_MARGIN = width * 0.025;
const CARD_WIDTH = (width - (CARD_MARGIN * 5)) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.1; // Proporção 1:1.1

const remedios = [
    { name: 'Nutrição', image: require('../../assets/images/nutricao.png') },
    { name: 'Exercício', image: require('../../assets/images/exercicio.png') },
    { name: 'Confiança', image: require('../../assets/images/confianca.png') },
    { name: 'Água', image: require('../../assets/images/agua.png') },
    { name: 'Descanso', image: require('../../assets/images/descanco.png') },
    { name: 'Sol', image: require('../../assets/images/sol.png') },
    { name: 'Ar Puro', image: require('../../assets/images/ar-puro.png') },
    { name: 'Temperança', image: require('../../assets/images/temperanca.png') },
];

const GRADIENTS = [
    ['#47EA5A', '#267551'],
    ['#FFA5A6', '#CF191C'],
    ['#666673', '#B8D0E3'],
    ['#2F70DA', '#54CAF1'],
    ['#A991F5', '#2D1872'],
    ['#FFAF02', '#FAE040'],
    ['#D4E3FB', '#74BCF2'],
    ['#FAE1B7', '#F1D254'],
];

export default function TelaInicial({ navigation }) {

    

    return (
        <ScrollView 
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Seja Bem-Vindo(a)</Text>
                <Text style={styles.subtitle}>Remédios da Natureza</Text>
                <Text style={styles.sectionTitle}>8 remédios naturais</Text>
            </View>

            <View style={styles.grid}>
            {remedios.map((remedio, index) => (
                index % 2 === 0 && (
                    <View key={index} style={styles.row}>
                        {renderCard(remedio, index, navigation)} 
                        {index + 1 < remedios.length && renderCard(remedios[index + 1], index + 1, navigation)}
                    </View>
                )
            ))}

            </View>

           
        </ScrollView>
    );
}

const renderCard = (remedio, index, navigation) => (
    <View style={styles.cardContainer}>
        <TouchableOpacity 
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => {
                if (remedio.name === 'Nutrição') {
                    navigation.navigate("StatusNutricao"); // Substitua pelo nome correto da sua tela
                }
            }}
        >
            <View style={styles.gradientWrapper}>
                <Svg height="100%" width="100%">
                    <Defs>
                        <LinearGradient id={`grad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <Stop offset="0%" stopColor={GRADIENTS[index][0]} />
                            <Stop offset="100%" stopColor={GRADIENTS[index][1]} />
                        </LinearGradient>
                    </Defs>
                    <Rect 
                        width="100%" 
                        height="100%" 
                        rx="22"
                        ry="22"
                        fill={`url(#grad${index})`} 
                    />
                </Svg>
            </View>

            <View style={styles.content}>
                <Image 
                    source={remedio.image} 
                    style={styles.imageStyle} 
                    resizeMode="contain"
                />
                <Text style={styles.itemTitle}>{remedio.name}</Text>
            </View>
        </TouchableOpacity>
    </View>
);


const styles = StyleSheet.create({
    container: { 
        flexGrow: 1, 
        backgroundColor: '#fff', 
        paddingHorizontal: width * 0.05,
        paddingTop: Platform.select({
            ios: height * 0.06,
            android: height * 0.04
        }),
        paddingBottom: height * 0.05,
    },
    header: { 
        marginBottom: height * 0.05, 
        alignItems: 'center' 
    },
    title: { 
        fontSize: isTablet ? width * 0.045 : width * 0.06,
        fontWeight: 'bold', 
        color: '#333',
        textAlign: 'center'
    },
    subtitle: { 
        fontSize: isTablet ? width * 0.04 : width * 0.05,
        color: '#2e8b57', 
        marginTop: height * 0.01,
        fontWeight: '600',
        textAlign: 'center'
    },
    sectionTitle: { 
        fontSize: isTablet ? width * 0.035 : width * 0.045,
        color: '#666', 
        marginTop: height * 0.02,
        textAlign: 'center'
    },
    grid: { 
        width: '100%',
        marginBottom: height * 0.03
    },
    row: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginBottom: height * 0.025
    },
    cardContainer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        overflow: 'hidden',
    },
    gradientWrapper: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    content: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: width * 0.03,
    },
    imageStyle: { 
        width: isTablet ? width * 0.12 : width * 0.15,
        height: isTablet ? width * 0.12 : width * 0.15,
        marginBottom: height * 0.015,
    },
    itemTitle: { 
        fontSize: isTablet ? width * 0.03 : width * 0.038,
        fontWeight: 'bold', 
        color: '#fff', 
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        paddingHorizontal: 5,
    },
    buttonContainer: { 
        width: '100%', 
        alignItems: 'center',
        marginTop: height * 0.03
    },
    button: { 
        backgroundColor: '#007AFF', 
        paddingVertical: height * 0.02,
        borderRadius: 8, 
        marginVertical: height * 0.01,
        width: isTablet ? '70%' : '85%',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#007AFF',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: isTablet ? width * 0.035 : width * 0.04,
    },
});