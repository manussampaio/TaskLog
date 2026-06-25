import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export default function TaskInputField(props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  
  function handleAddTask() { 
    props.addTask(titulo, descricao);

    setTitulo('');
    setDescricao('');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TextInput
        style={styles.input}
        placeholder="Título da atividade"
        placeholderTextColor="#ccc"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        placeholderTextColor="#ccc"
        value={descricao}
        onChangeText={setDescricao}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddTask}
      >
        <MaterialIcons
          name="add"
          size={24}
          color="#fff"
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#1E293B',
  },
  input: {
    backgroundColor: '#334155',
    color: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
});
