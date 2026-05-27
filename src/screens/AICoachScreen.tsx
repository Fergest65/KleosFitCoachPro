import React, { useState } from "react";

import {
  View,
 Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  Send,
  Bot,
} from "lucide-react-native";

import { colors } from "../theme/colors";
import { askAICoach } from "../lib/ai";

const DEV_USER_ID =
  "00000000-0000-0000-0000-000000000000";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AICoachScreen() {
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Ciao. Sono Kleos AI Coach. Come posso aiutarti oggi con allenamento o nutrizione?",
    },
  ]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");

    try {
      setLoading(true);

      const reply = await askAICoach(
        DEV_USER_ID,
        userMessage
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Errore AI Coach. Controlla API key o connessione.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <View style={styles.header}>
        <Bot color={colors.lime} size={28} />

        <Text style={styles.headerTitle}>
          AI Coach
        </Text>
      </View>

      <ScrollView
        style={styles.chat}
        contentContainerStyle={styles.chatContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.messageBubble,

              message.role === "user"
                ? styles.userBubble
                : styles.aiBubble,
            ]}
          >
            <Text style={styles.messageText}>
              {message.content}
            </Text>
          </View>
        ))}

        {loading && (
          <View
            style={[
              styles.messageBubble,
              styles.aiBubble,
            ]}
          >
            <Text style={styles.messageText}>
              Kleos AI sta scrivendo...
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Chiedi qualcosa..."
          placeholderTextColor={colors.gray}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <Send color="#000" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  headerTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "900",
    marginLeft: 14,
  },

  chat: {
    flex: 1,
  },

  chatContent: {
    paddingHorizontal: 24,
    paddingBottom: 30,
  },

  messageBubble: {
    padding: 18,
    borderRadius: 22,
    marginBottom: 14,
    maxWidth: "85%",
  },

  userBubble: {
    backgroundColor: colors.lime,
    alignSelf: "flex-end",
  },

  aiBubble: {
    backgroundColor: colors.card,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.border,
  },

  messageText: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 22,
  },

  inputContainer: {
    flexDirection: "row",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.black,
  },

  input: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 18,
    paddingHorizontal: 18,
    color: colors.white,
    marginRight: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },

  sendButton: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: colors.lime,
    justifyContent: "center",
    alignItems: "center",
  },
});