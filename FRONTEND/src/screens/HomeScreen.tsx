import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductImage from '../../assets/images/signup.jpg'; // Assuming this is the correct path

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://10.135.54.64:8000/auth/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Heading and Description */}
            <View style={styles.header}>
                <Text style={styles.heading}>Welcome to the Marketplace</Text>
                <Text style={styles.description}>
                    Browse through a wide range of products available for you.
                </Text>
            </View>

            {/* Product Grid */}
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.productContainer} 
                        onPress={() => navigation.navigate('Product', { product: item })}
                    >
                        <Image source={ProductImage} style={styles.image} />
                        <Text style={styles.productName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item._id}
                numColumns={2}  // Display two products per row
            />
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
    },
    header: {
        marginVertical: 20,
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
    productContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5,
        // Adjusting width for a two-column layout
        maxWidth: '48%',
        overflow: 'hidden', // To ensure the image doesn't overflow outside the container
    },
    image: {
        width: '100%', // Full width of the parent container
        height: 150, // You can adjust the height as needed
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        padding: 20, // Padding around the product name
    },
});
