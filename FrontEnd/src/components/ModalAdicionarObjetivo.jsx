import axios from 'axios';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const ModalAdicionarObjetivo = ({ 
  visible, 
  onClose, 
  categoria, 
  onObjetivoAdicionado,
  userId = 1  // 🔄 Recebe o ID do usuário como prop
}) => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitulo("");
    setDescricao("");
  };

  const adicionarObjetivoPersonalizado = async () => {
    if (!titulo.trim()) {
      Alert.alert("Atenção", "Por favor, insira um título para o objetivo");
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(
        `http://192.168.15.4:8000/usuarios/${userId}/objetivos_personalizados/`, 
        {
          titulo,
          categoria,
          descricao: descricao.trim() || "Sem descrição"
        }
      );

      if (response.data?.objetivo) {
        onObjetivoAdicionado(response.data.objetivo);
        resetForm();
        onClose();
        Alert.alert("Sucesso", "Objetivo adicionado com sucesso!");
      }
    } catch (error) {
      console.error("Erro:", error.response?.data || error.message);
      Alert.alert(
        "Erro", 
        error.response?.data?.detail || "Não foi possível adicionar o objetivo"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      visible={visible} 
      animationType="slide" 
      transparent
      onRequestClose={() => {
        resetForm();
        onClose();
      }}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            Novo Objetivo em {categoria}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Título*"
            value={titulo}
            onChangeText={setTitulo}
            maxLength={50}
            editable={!loading}
          />
          
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Descrição (opcional)"
            value={descricao}
            onChangeText={setDescricao}
            multiline
            numberOfLines={3}
            maxLength={200}
            editable={!loading}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => {
                resetForm();
                onClose();
              }}
              style={[styles.button, styles.cancelButton]}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={adicionarObjetivoPersonalizado}
              style={[styles.button, styles.addButton]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalContainer: { 
    width: '90%', 
    maxWidth: 400,
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 10,
    elevation: 5
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top'
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginTop: 10
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5
  },
  cancelButton: { 
    backgroundColor: '#ff4444' 
  },
  addButton: { 
    backgroundColor: '#4CAF50' 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  }
});

export default ModalAdicionarObjetivo;