import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { CartContext } from '../../context/CartContext';
import ProductImage from '../../assets/images/signup.jpg';  // Assuming a dummy image is used

const { width, height } = Dimensions.get('window');

const ProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Product Image */}
        <Image source={ProductImage} style={styles.image} resizeMode="cover" />

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>${product.price}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={styles.addToCartButton} 
          onPress={() => addToCart(product)}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: width,
    height: height * 0.5,
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#6200EE',
    marginBottom: 15,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  addToCartButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductScreen;