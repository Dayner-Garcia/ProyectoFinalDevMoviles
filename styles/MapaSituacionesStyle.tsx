import { Dimensions, StyleSheet } from 'react-native';

const MapaSituacionesStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e40af',
    marginBottom: 16,
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
    borderRadius: 12,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapaSituacionesStyle;
