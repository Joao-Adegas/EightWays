import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const isTablet = width > 600;

const perguntas = [
  "Você consumiu frutas e vegetais frescos hoje?",
  "Você evitou alimentos ultraprocessados (como salgadinhos, refrigerantes, fast food)?",
  "Você comeu em horários regulares ao longo do dia?",
  "Você bebeu água ao invés de refrigerantes ou sucos industrializados?",
  "Você teve uma refeição equilibrada (com carboidratos, proteínas e fibras)?",
  "Você evitou comer em excesso ou por ansiedade?"
];

export default function Forms() {
  const [respostas, setRespostas] = useState(Array(perguntas.length).fill(null));
  const [status, setStatus] = useState("");
  const navigation = useNavigation(); 

  const calcularStatus = () => {
    const respostasPositivas = respostas.filter(resposta => resposta === "sim").length;

    if (respostasPositivas >= 5) {
      setStatus("Excelente — Sua alimentação está muito saudável! 🍎🥗");
    } else if (respostasPositivas >= 3) {
      setStatus("Na média — Bom caminho, mas ainda pode melhorar! 👍");
    } else {
      setStatus("Abaixo da média — Reflita sobre seus hábitos alimentares. ⚠️");
    }
  };

  const responder = (index, resposta) => {
    const novasRespostas = [...respostas];
    novasRespostas[index] = resposta;
    setRespostas(novasRespostas);
    calcularStatus();
  };

    const enviarRespostas = () => {
        console.log("Respostas do usuário:", respostas);
        console.log("Status calculado:", status);
        
      
        navigation.navigate("StatusNutricao", { status });
    };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📋 Questionário de Saúde - Alimentação</Text>

      {perguntas.map((pergunta, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.question}>{pergunta}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, respostas[index] === "sim" && styles.selectedButton]} 
              onPress={() => responder(index, "sim")}
            >
              <Text style={styles.buttonText}>✅ Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, respostas[index] === "não" && styles.selectedButton]} 
              onPress={() => responder(index, "não")}
            >
              <Text style={styles.buttonText}>❌ Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {status !== "" && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{status}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={enviarRespostas}>
        <Text style={styles.submitButtonText}>📤 Enviar Respostas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.03,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  title: {
    fontSize: isTablet ? 24 : 20,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  questionContainer: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    marginVertical: height * 0.015,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  question: {
    fontSize: isTablet ? 18 : 16,
    fontWeight: '600',
    marginBottom: height * 0.01,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: height * 0.01,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#005FCC',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: isTablet ? 16 : 14,
  },
  resultContainer: {
    marginTop: height * 0.03,
    padding: width * 0.05,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultText: {
    fontSize: isTablet ? 20 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#28A745',
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.06,
    borderRadius: 8,
    marginTop: height * 0.04,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: isTablet ? 18 : 16,
    fontWeight: 'bold',
  },
});
