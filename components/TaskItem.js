import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  MaterialIcons,
} from '@expo/vector-icons';

export default function TaskItem(props) {

  return (

    <View style={styles.container}>

      <View style={styles.numero}>
        <Text style={styles.numeroTexto}>
          {props.index}
        </Text>
      </View>

      <View style={styles.card}>

        <View style={{ flex: 1 }}>

          <Text style={styles.titulo}>
            {props.task.task}
          </Text>

          <Text style={styles.descricao}>
            {props.task.descricao}
          </Text>

        </View>

        <TouchableOpacity
          onPress={props.completeTask}
        >
          <MaterialIcons
            name="check-circle"
            size={28}
            color="#22C55E"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={props.deleteTask}
        >
          <MaterialIcons
            name="delete"
            size={28}
            color="#EF4444"
          />
        </TouchableOpacity>

      </View>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    margin: 10,
  },

  numero: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  numeroTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },

  card: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  titulo: {
    color: '#fff',
    fontWeight: 'bold',
  },

  descricao: {
    color: '#CBD5E1',
  },

});