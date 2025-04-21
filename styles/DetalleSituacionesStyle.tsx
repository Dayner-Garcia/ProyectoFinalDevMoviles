import { StyleSheet } from 'react-native';

const DetalleSituacionesStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  volver: {
    marginBottom: 12,
  },
  volverTexto: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e40af',
    marginBottom: 16,
  },
  imagen: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  info: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 12,
    fontWeight: '600',
  },
  valor: {
    fontSize: 16,
    color: '#111827',
    marginTop: 4,
  },
});

export default DetalleSituacionesStyle;
