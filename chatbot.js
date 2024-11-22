import React, { useState } from 'react';
import * as GoogleGenerativeAI from '@google/generative-ai';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); 

  const API_KEY = "AIzaSyCriLDHt76VuJjAKvZSTNaGgM4omh-mB9E";

  const sendMessage = async () => {
    setLoading(true);

    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
Bạn là chuyên gia về xe và dịch vụ BMW. Trả lời đầy đủ ý nghĩa và ngắn gọn nhất có thể, tối đa 400 ký tự.
- Nếu câu hỏi liên quan đến mẫu xe, giá, địa điểm mua, hoặc dịch vụ BMW, hãy trả lời chính xác.
- Nếu không rõ câu hỏi thuộc lĩnh vực, hãy hỏi lại.
- Nếu chắc chắn không liên quan, trả lời: "Tôi không thể trả lời!"
Câu hỏi: ${userMessage.text}`;



    const result = await model.generateContent(prompt, { maxTokens: 700 });

    let responseText = result.response.text();

    if (responseText.length > 700) {
      responseText = responseText.slice(0, 700);
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: responseText, user: false }
    ]);

    setLoading(false);
    setUserInput("");
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.user ? styles.userMessageContainer : styles.aiMessageContainer]}>
      <Text style={[styles.messageText, item.user && styles.userMessageText]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://showroombmwbinhduong.com/wp-content/uploads/2023/08/anh-bia-bmw-2.jpg' }}
      blurRadius={4}
      style={styles.container}
    >
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        inverted={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message"
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    marginTop: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ff6347',
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  userMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#e1e1e1',
  },
  aiMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#83f7ee',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  userMessageText: {
    color: '#000',
  },
});

export default GeminiChat;
