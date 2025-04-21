import { StyleSheet } from 'react-native';

const MisSituacionesStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1e40af',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 4,
  },
  image: {
    height: 160,
    width: '100%',
    backgroundColor: '#e5e7eb',
  },
  textContainer: {
    padding: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  fecha: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  estado: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MisSituacionesStyle;
