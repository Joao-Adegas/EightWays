import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const isTablet = width > 600;

export default function StatusNutricao() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const status = route.params?.status || "Preencha o formulario para saber se sua saude esta em dia!"; 

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Nutrição 🌿</Text>
                <Text style={styles.subtitle}>Monitoramento de hábitos alimentares</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>📌 Status Atual:</Text>
                <Text style={styles.status}>{status}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>🎯 Meus Objetivos para Hoje</Text>
                <Text style={styles.description}>
                    Explicar a importância dos objetivos e de não colocar mais do que o necessário para você cumprir.
                    O ideal é qualidade, não quantidade!
                </Text>

                <TouchableOpacity 
                    style={styles.button} 
                    onPress={() => navigation.navigate('Objetivos de Hoje')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Ver Objetivos</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>📝 Preenchimento Diário</Text>
                <Text style={styles.description}>
                    Os registros do formulário serão essenciais para medir sua saúde e recomendar o melhor para você.
                </Text>

                <TouchableOpacity 
                    style={styles.buttonSecondary} 
                    onPress={() => navigation.navigate('Forms')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Preencher Formulário</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flexGrow: 1, 
        backgroundColor: '#F5F5F5',  
        paddingHorizontal: width * 0.06,
        paddingTop: Platform.select({
            ios: height * 0.08,
            android: height * 0.05
        }),
        paddingBottom: height * 0.05,
    },
    header: {
        alignItems: 'center',
        marginBottom: height * 0.05,
    },
    title: {
        fontSize: isTablet ? width * 0.06 : width * 0.07,
        fontWeight: 'bold',
        color: '#2E8B57',  
    },
    subtitle: {
        fontSize: isTablet ? width * 0.04 : width * 0.05,
        color: '#555',
        fontWeight: '600',
        marginTop: height * 0.008,
    },
    section: {
        backgroundColor: '#fff',
        padding: width * 0.04,
        marginBottom: height * 0.03,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    label: {
        fontSize: isTablet ? width * 0.04 : width * 0.045,
        fontWeight: '700',
        color: '#333',
        marginBottom: height * 0.012,
    },
    status: {
        fontSize: isTablet ? width * 0.04 : width * 0.045,
        fontWeight: 'bold',
        color: '#007AFF',
    },
    description: {
        fontSize: isTablet ? width * 0.035 : width * 0.04,
        color: '#444',
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: height * 0.02,
        borderRadius: 10, 
        marginTop: height * 0.02,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonSecondary: {
        backgroundColor: '#28A745',
        paddingVertical: height * 0.02,
        borderRadius: 10, 
        marginTop: height * 0.02,
        alignItems: 'center',
        shadowColor: '#28A745',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: { 
        color: '#fff', 
        fontWeight: 'bold', 
        fontSize: isTablet ? width * 0.035 : width * 0.04,
    },
});
