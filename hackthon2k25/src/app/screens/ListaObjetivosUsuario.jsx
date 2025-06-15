import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ModalAdicionarObjetivo from '../../components/ModalAdicionarObjetivo';

const ListaObjetivosUsuario = () => {
    const [objetivosUsuario, setObjetivosUsuario] = useState({});
    const [categoriasVisiveis, setCategoriasVisiveis] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchObjetivosUsuario = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://172.20.10.6:8000/objetivos_usuario/');
            
            console.log("Dados da API:", response.data); 
    
            if (!Array.isArray(response.data)) {
                console.error("Erro: resposta não é um array", response.data);
                return;
            }
    
          
            const objetivosPorCategoria = response.data.reduce((acc, item) => {
                if (!item.objetivo || item.user_id !== 1) return acc;
    
                const categoria = item.objetivo.categoria || 'Outros';
                if (!acc[categoria]) {
                    acc[categoria] = [];
                }
    
                acc[categoria].push({
                    id: item.id,
                    objetivo: item.objetivo,
                    tipo: item.tipo || 'sugerido',
                    user_id: item.user_id
                });
    
                return acc;
            }, {});
    
            setObjetivosUsuario(objetivosPorCategoria);
        } catch (error) {
            console.error("Erro ao buscar objetivos:", error);
            Alert.alert("Erro", "Não foi possível carregar os objetivos do usuário");
        } finally {
            setLoading(false);
        }
    };
    


    useEffect(() => {
        if (!modalVisible) {
            fetchObjetivosUsuario(); 
        }
    }, [modalVisible]);
    




    const removerObjetivo = async (objetivoId) => {
        try {
            await axios.delete(`http://172.20.10.6:8000/objetivos_usuario/${objetivoId}`);

       
            setObjetivosUsuario(prev => {
                const novoEstado = { ...prev };
                Object.keys(novoEstado).forEach(categoria => {
                    novoEstado[categoria] = novoEstado[categoria].filter(obj => obj.id !== objetivoId);
                });
                return novoEstado;
            });

            Alert.alert("Sucesso", "Objetivo removido com sucesso");
        } catch (error) {
            console.error("Erro ao remover objetivo:", error);
            Alert.alert("Erro", "Não foi possível remover o objetivo");
        }
    };

    const atualizarListaUsuario = (novoObjetivo) => {
        if (!novoObjetivo || !novoObjetivo.objetivo || !novoObjetivo.objetivo.id) {
            console.error("Erro: Tentativa de adicionar um objetivo inválido", novoObjetivo);
            return;
        }
    
        setObjetivosUsuario(prev => ({
            ...prev,
            [novoObjetivo.objetivo.categoria]: [
                ...(prev[novoObjetivo.objetivo.categoria] || []),
                novoObjetivo  
            ]
        }));
    };
    

    const handleAdicionarObjetivo = async (novoObjetivo) => {
        try {
            const response = await axios.post(
                `http://172.20.10.6:8000/usuarios/1/objetivos_personalizados/`,
                {
                    titulo: novoObjetivo.titulo,
                    categoria: categoriaSelecionada,
                    descricao: novoObjetivo.descricao
                }
            );
    
            if (response.data) {
                setModalVisible(false);
                Alert.alert("Sucesso", "Objetivo adicionado com sucesso!");
    
                // 🔥 Chame fetchObjetivosUsuario para atualizar a lista após adicionar
                fetchObjetivosUsuario();
            }
        } catch (error) {
            console.error("Erro ao adicionar objetivo:", error);
            Alert.alert("Erro", "Não foi possível adicionar o objetivo");
        }
    };
    


    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Meus Objetivos</Text>



                {Object.keys(objetivosUsuario).length === 0 ? (
                    <Text style={styles.emptyMessage}>Nenhum objetivo cadastrado</Text>
                ) : (
                    Object.entries(objetivosUsuario).map(([categoria, objetivos]) => (
                        <View key={categoria} style={styles.categoriaContainer}>
                            <TouchableOpacity
                                onPress={() => setCategoriasVisiveis(prev => ({
                                    ...prev,
                                    [categoria]: !prev[categoria]
                                }))}
                                style={styles.header}
                            >
                                <Text style={styles.headerText}>
                                    {categoria} {categoriasVisiveis[categoria] ? '🔽' : '▶️'}
                                </Text>
                            </TouchableOpacity>

                            {categoriasVisiveis[categoria] && (
                                <>
                                    <FlatList
                                        data={objetivos}
                                        keyExtractor={(item) => `objetivo-${item.tipo}-${item.id}`} // 🔥 Agora cada objetivo tem um identificador único!
                                        scrollEnabled={false}
                                        renderItem={({ item }) => (
                                            <View style={styles.objetivoContainer}>
                                                <View style={styles.objetivoContent}>
                                                    <Text style={styles.objetivoTitulo}>{item.objetivo.titulo}</Text>
                                                    <Text style={styles.objetivoDescricao}>{item.objetivo.descricao}</Text>
                                                    <Text style={styles.objetivoTipo}>
                                                        Tipo: {item.tipo === 'personalizado' ? 'Personalizado' : 'Sugerido'}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => removerObjetivo(item.id)}
                                                    style={styles.removeButton}
                                                >
                                                    <Text style={styles.removeButtonText}>Remover</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />


                                    <TouchableOpacity
                                        onPress={() => {
                                            setCategoriaSelecionada(categoria);
                                            setModalVisible(true);
                                        }}
                                        style={styles.addButton}
                                    >
                                        <Text style={styles.addButtonText}>➕ Adicionar Objetivo Personalizado</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    ))
                )}


                <ModalAdicionarObjetivo
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    categoria={categoriaSelecionada}
                    onObjetivoAdicionado={() => fetchObjetivosUsuario()} 
                    userId={1} 
                />

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    categoriaContainer: {
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        overflow: 'hidden',
    },
    header: {
        padding: 15,
        backgroundColor: '#e0e0e0',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    objetivoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    objetivoContent: {
        flex: 1,
    },
    objetivoTitulo: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    objetivoDescricao: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    objetivoTipo: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
    },
    removeButton: {
        backgroundColor: '#ff4444',
        padding: 8,
        borderRadius: 5,
        marginLeft: 10,
    },
    removeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ListaObjetivosUsuario;