import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const ChatBot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);


  const animateTyping = (fullText, messageId) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setChatHistory(prevMessages =>
          prevMessages.map(msg =>
            msg.id === messageId ? { ...msg, content: fullText.slice(0, currentIndex + 1) } : msg
          )
        );
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); 
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    
  
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message.trim(),
    };
    setChatHistory(prev => [...prev, userMessage]);

    try {
     
      const response = await fetch('http://172.20.10.6:5000/pergunta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pergunta: message.trim() }),
      });

      const data = await response.json();
      console.log("Resposta do back-end:", data);


      const botMessagePlaceholder = {
        id: Date.now().toString() + '_bot',
        role: 'assistant',
        content: '',
      };


      setChatHistory(prev => [...prev, botMessagePlaceholder]);


      animateTyping(data.resposta, botMessagePlaceholder.id);
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setMessage('');
    }
  };


  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === 'user' ? styles.userMessage : styles.botMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={chatHistory}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.chatContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Digite sua mensagem"
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: { 
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
  },
  userMessage: { 
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botMessage: { 
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageText: { 
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 4,
    marginLeft: 5,
    justifyContent: 'center',
  },
  sendButtonText: { 
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatBot;
