import { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import {
  CameraView,
  useCameraPermissions,
} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function Camera(props) {
  const [permissao, requestPermissao] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState('back');

  if (!permissao) {
    return <View />;
  }

  if (!permissao.granted) {
    return (
      <View style={styles.permissaoContainer}>
        <Text style={styles.message}>
          Você precisa conceder acesso à câmera
        </Text>
        <Button
          title="Conceder Permissão"
          onPress={requestPermission}
        />
      </View>
    );
  }

  async function salvarFoto(foto) {
    const permissaoGaleria =
      await MediaLibrary.requestPermissionsAsync();
    if (permissaoGaleria.status === 'granted') {
      await MediaLibrary.createAssetAsync(
        foto.uri
      );
    }

    props.onPhotoTaken(foto.uri);
  }

  async function tirarFoto() {
    if (cameraRef.current == null)
      return;
    const foto =
      await cameraRef.current.takePictureAsync();
    await salvarFoto(foto);
  }

  function trocarCamera() {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  }

  return (
    <View style={styles.container}>
      <CameraViewstyle={styles.camera} ref={cameraRef} facing={cameraType}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={trocarCamera}>
            <Text style={styles.buttonText}>
              Trocar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={tirarFoto}>
            <Text style={styles.buttonText}>
              Capturar
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  permissaoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
