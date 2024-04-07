import { View, Text } from "react-native";
import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);

  const YOUR_CHATGPT_API_KEY =
    "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";

  const handleSend = async (newMessages = []) => {
    try {
      //Get Message
      const userMessage = newMessages[0];

      //Add user message
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );
      const messagetext = userMessage.text.toLowerCase();
      const keywords = ["recipe", "food", "diet", "fruit"];
      if (!keywords.some((keyword) => messagetext.includes(keyword))) {
        const botMessage = {
          _id: new Date().getTime() + 1,
          text: "I'm the food assistant. Ask about a recipe!",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "Food Bot",
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
        return;
      }

      //if message contains food
      const response = await axios.post(
        "http://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          prompt: `Get me a recipe for ${messagetext}`,
          max_tokens: 1200,
          temperature: 0.2,
          n: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${YOUR_CHATGPT_API_KEY}`,
          },
        }
      );
      console.log(response.data);

      const recipe = response.data.choices[0].text.trim();
      const botMessage = {
        _id: new Date().getTime() + 1,
        text: recipe,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Food Bot",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, botMessage)
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: "#BE29EC",
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          marginTop: 40,
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          Food Bot
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => handleSend(newMessages)}
        user={{ _id: 1 }}
      />
    </View>
  );
};

export default Chatbot;
