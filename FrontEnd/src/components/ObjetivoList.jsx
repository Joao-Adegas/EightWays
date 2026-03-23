import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ObjetivoList = ({ titulo, descricao }) => {
  // Verificação para props vazias ou inválidas
  if (!titulo) {
    console.warn('ObjetivoList: titulo é obrigatório');
    return null; // Ou retorne um placeholder
  }

  return (
    <View style={styles.objetivo}>
      <Text style={styles.titulo} numberOfLines={1} ellipsizeMode="tail">
        📌 {titulo}
      </Text>
      {descricao && ( // Só renderiza se houver descrição
        <Text style={styles.descricao} numberOfLines={3} ellipsizeMode="tail">
          📝 {descricao}
        </Text>
      )}
    </View>
  );
};

// Validação das props
ObjetivoList.propTypes = {
  titulo: PropTypes.string.isRequired,
  descricao: PropTypes.string
};

// Valores padrão
ObjetivoList.defaultProps = {
  descricao: null
};

const styles = StyleSheet.create({
  objetivo: { 
    padding: 15, 
    backgroundColor: '#fff', 
    marginBottom: 10, 
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  descricao: {
    fontSize: 14,
    color: '#555',
    lineHeight: 18 // Melhora a legibilidade
  }
});

export default ObjetivoList;