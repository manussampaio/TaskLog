import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import TaskInputField from './components/TaskInputField';
import TaskItem from './components/TaskItem';
import TaskComplete from './components/TaskComplete';
import Camera from './components/Camera';

import {
  createTable,
  insertTask,
  getTasks,
  deleteTask as deleteTaskDB,
  completeTask as completeTaskDB,
} from './database/database';

export default function App() {

  const [tasks, setTasks] = useState([]);

  const [mostrarCamera, setMostrarCamera] =
    useState(false);

  const [taskSelecionada, setTaskSelecionada] =
    useState(null);

  useEffect(() => {

    iniciarBanco();

  }, []);

  async function iniciarBanco() {

    await createTable();

    carregarTasks();

  }

  async function carregarTasks() {

    const dados =
      await getTasks();

    setTasks(dados);

  }

  async function addTask(
    titulo,
    descricao
  ) {

    if (
      titulo == null ||
      titulo.trim() === ''
    )
      return;

    if (
      descricao == null ||
      descricao.trim() === ''
    )
      return;

    await insertTask(
      titulo,
      descricao
    );

    carregarTasks();

  }

  async function deleteTask(id) {

    await deleteTaskDB(id);

    carregarTasks();

  }

  async function concluirTask(
    id,
    foto
  ) {

    await completeTaskDB(
      id,
      foto
    );

    carregarTasks();

  }

 if (mostrarCamera) {

  return (
    <Camera
      onPhotoTaken={async (foto) => {

        await concluirTask(
          taskSelecionada,
          foto
        );

        setMostrarCamera(false);

        setTaskSelecionada(null);

      }}
    />
  );

}

  const pendentes =
    tasks.filter(
      task => task.status === 0
    );

  const concluidas =
    tasks.filter(
      task => task.status === 1
    );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        TaskLog
      </Text>

      <Text style={styles.subtitle}>
        Sistema de acompanhamento e
        registro de atividades
      </Text>

      <Text style={styles.heading}>
        Atividades Pendentes
      </Text>

      <ScrollView
        style={styles.scrollView}
      >

        {pendentes.map(
          (task, index) => (

            <TaskItem
              key={task.id}
              index={index + 1}
              task={{
                task: task.titulo,
                descricao:
                  task.descricao,
              }}
              deleteTask={() =>
                deleteTask(task.id)
              }
              completeTask={() => {

                setTaskSelecionada(
                  task.id
                );

                setMostrarCamera(
                  true
                );

              }}
            />

          )
        )}

      </ScrollView>

      <Text style={styles.heading}>
        Atividades Realizadas
      </Text>

      <ScrollView
        style={styles.scrollView}
      >

        {concluidas.map(
          (task) => (

            <TaskComplete
              key={task.id}
              task={{
                task: task.titulo,
                descricao: task.descricao,
                foto: task.foto,
              }}
              deleteTask={() =>
                deleteTask(task.id)
              }
            />

          )
        )}

      </ScrollView>

      <TaskInputField
        addTask={addTask}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 50,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    color: '#CBD5E1',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },

  heading: {
    color: '#60A5FA',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },

  scrollView: {
    flex: 1,
    width: '100%',
  },

});