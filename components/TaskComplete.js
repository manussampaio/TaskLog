import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import { MaterialIcons }
from '@expo/vector-icons';

export default function TaskComplete(props) {

  return (

    <View style={styles.container}>

      <View style={styles.check}>
        <Text style={styles.checkText}>
          ✓
        </Text>
      </View>

      <View style={styles.card}>

        <Text style={styles.titulo}>
          {props.task.task}
        </Text>

        <Text style={styles.descricao}>
          {props.task.descricao}
        </Text>

        {props.task.foto ? (
            <Image
                source={{
                    uri: props.task.foto
                }}
                style={styles.foto}
            />
        ) : null}

        <TouchableOpacity
  onPress={props.deleteTask}
  style={styles.delete}
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

  check: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  checkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  card: {
    flex: 1,
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 10,
  },

  titulo: {
    color: '#fff',
    fontWeight: 'bold',
  },

  descricao: {
    color: '#CBD5E1',
  },

  foto: {
  width: '100%',
  height: 200,
  borderRadius: 10,
  marginTop: 10,
},

delete: {
  alignSelf: 'flex-end',
  marginTop: 10,
},

});