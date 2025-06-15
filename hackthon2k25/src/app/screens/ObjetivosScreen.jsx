import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ObjetivoList from '../../components/ObjetivoList';

const remediosNaturais = [
  { id: 1, titulo: "Nutrição", categoria: "Nutrição" },
  { id: 2, titulo: "Exercicio", categoria: "Exercicio" },
  { id: 3, titulo: "Confiança", categoria: "Confiança" },
  { id: 4, titulo: "Água", categoria: "Água" },
  { id: 5, titulo: "Descanso", categoria: "Descanso" },
  { id: 6, titulo: "Sol", categoria: "Sol" },
  { id: 7, titulo: "Ar Puro", categoria: "Ar Puro" },
  { id: 8, titulo: "Temperança", categoria: "Temperança" },
];

const ObjetivosScreen = ({ navigation, route }) => {
  const atualizarListaUsuario = route?.params?.atualizarListaUsuario || (() => {});
  const [categoriasVisiveis, setCategoriasVisiveis] = useState({});
  const [objetivosPorCategoria, setObjetivosPorCategoria] = useState({});
  const [loading, setLoading] = useState({});
  const [addingObjectives, setAddingObjectives] = useState({});

  useEffect(() => {
    const fetchObjetivos = async () => {
      try {
        setLoading(prev => ({...prev, all: true}));
        
        const allObjetivos = {};
        for (const remedio of remediosNaturais) {
          try {
            const response = await axios.get(
              `http://172.20.10.6:8000/objetivos/${remedio.categoria}`
            );
            allObjetivos[remedio.categoria] = response.data || [];
          } catch (error) {
            console.error(`Erro ao buscar ${remedio.categoria}:`, error);
            allObjetivos[remedio.categoria] = [];
          }
        }
        
        setObjetivosPorCategoria(allObjetivos);
      } catch (error) {
        console.error("Erro geral ao buscar objetivos:", error);
        Alert.alert("Erro", "Não foi possível carregar os objetivos");
      } finally {
        setLoading(prev => ({...prev, all: false}));
      }
    };

    fetchObjetivos();
  }, []);

  const adicionarObjetivoUsuario = async (objetivo, categoria) => {
    if (!objetivo?.id) {
        Alert.alert("Erro", "Objetivo inválido");
        return;
    }

    setAddingObjectives(prev => ({ ...prev, [objetivo.id]: true }));

    try {
        const response = await axios.post(
            "http://172.20.10.6:8000/objetivos_usuario/",
            {
                user_id: 1,
                objetivo_id: objetivo.id,
                objetivo_personalizado_id: null
            }
        );

        if (response.data?.objetivo_adicionado?.id) {
            Alert.alert(
                "Sucesso", 
                "Objetivo adicionado com sucesso!",
                [{ text: "OK", onPress: () => {} }]
            );

            
            setObjetivosPorCategoria(prev => ({
                ...prev,
                [categoria]: prev[categoria]?.filter(obj => obj.id !== objetivo.id) || []
            }));

           
            if (typeof atualizarListaUsuario === "function") {
                atualizarListaUsuario({
                    id: response.data.objetivo_adicionado.id,
                    objetivo: response.data.objetivo || objetivo, 
                    tipo: "sugerido"
                });
            }
        } else {
            Alert.alert("Erro", "Não foi possível adicionar o objetivo");
        }
    } catch (error) {
        console.error("Erro ao adicionar objetivo:", error);
        Alert.alert("Erro", error.response?.data?.detail || "Falha ao adicionar objetivo");
    } finally {
        setAddingObjectives(prev => ({ ...prev, [objetivo.id]: false }));
    }
};


  if (loading.all) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando objetivos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sugestões de Objetivos</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("Objetivos de Hoje")} 
            style={styles.button}
          >
            <Text style={styles.buttonText}>Ver Meus Objetivos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => navigation.navigate("ChatBot")} 
            style={[styles.button, styles.chatbotButton]}
          >
            <Text style={styles.buttonText}>Falar com Lumin 🤖</Text>
          </TouchableOpacity>
        </View>

        {remediosNaturais.map((remedio) => (
          <View key={remedio.id} style={styles.categoriaContainer}>
            <TouchableOpacity 
              onPress={() => setCategoriasVisiveis(prev => ({
                ...prev,
                [remedio.categoria]: !prev[remedio.categoria]
              }))} 
              style={styles.header}
            >
              <Text style={styles.headerText}>
                {remedio.titulo} {categoriasVisiveis[remedio.categoria] ? '🔽' : '▶️'}
              </Text>
            </TouchableOpacity>

            {categoriasVisiveis[remedio.categoria] && (
              <View>
                {loading[remedio.categoria] ? (
                  <ActivityIndicator size="small" color="#007AFF" />
                ) : objetivosPorCategoria[remedio.categoria]?.length > 0 ? (
                  objetivosPorCategoria[remedio.categoria].map((item) => (
                    <View key={item.id} style={styles.objetivoContainer}>
                      <ObjetivoList 
                        titulo={item.titulo} 
                        descricao={item.descricao} 
                      />
                      
                      <TouchableOpacity 
                        onPress={() => adicionarObjetivoUsuario(item, remedio.categoria)}
                        style={styles.addButton}
                        disabled={addingObjectives[item.id]}
                      >
                        {addingObjectives[item.id] ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Text style={styles.addButtonText}>➕ Adicionar</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>Nenhum objetivo disponível</Text>
                )}
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1, backgroundColor: '#f4f4f4' },
  scrollContainer: { paddingBottom: 20 },
  container: { padding: 20 },
  center: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#666' },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center',
    color: '#333'
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  button: { 
    flex: 1,
    backgroundColor: '#4CAF50', 
    padding: 15, 
    borderRadius: 8,
    marginHorizontal: 5
  },
  chatbotButton: {
    backgroundColor: '#2196F3'
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    fontSize: 16 
  },
  categoriaContainer: { 
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2
  },
  header: { 
    padding: 15, 
    backgroundColor: '#e0e0e0' 
  },
  headerText: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#333'
  },
  objetivoContainer: { 
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  addButton: { 
    backgroundColor: '#007AFF', 
    padding: 10, 
    borderRadius: 5, 
    marginTop: 10,
    alignItems: 'center'
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  emptyText: {
    textAlign: 'center',
    padding: 15,
    color: '#666'
  }
});

export default ObjetivosScreen;