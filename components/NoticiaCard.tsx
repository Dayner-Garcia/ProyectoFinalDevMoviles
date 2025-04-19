import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import NoticiaCardStyle from '../styles/NoticiaCardStyle';

interface NoticiaCardProps {
  titulo: string;
  contenido: string;
  imagen: string;
}

class NoticiaCard extends React.Component<NoticiaCardProps> {
  render() {
    const { titulo, contenido, imagen } = this.props;
    return (
      <TouchableOpacity style={NoticiaCardStyle.card}>
        <Image source={{ uri: imagen }} style={NoticiaCardStyle.image} />
        <View style={NoticiaCardStyle.textContainer}>
          <Text style={NoticiaCardStyle.title}>{titulo}</Text>
          <Text style={NoticiaCardStyle.content}>{contenido}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default NoticiaCard;
