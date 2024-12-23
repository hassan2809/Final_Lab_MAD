import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import Picture from '../../assets/images/accommodation.jpg'

const Packages = () => {
    const [tours, setTours] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchListings = async () => {
        try {
            const response = await axios.get('http://10.135.54.64:8000/auth/getTourPackages');
            if (response.data.success) {
                setTours(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Header and Search Input */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tours</Text>
                <Text style={styles.headerSubtitle}>Book the ticket of ongoing tour.</Text>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search tours..."
                        onChangeText={setSearchQuery}
                        value={searchQuery}
                    />
                </View>
            </View>

            {/* Tour Cards */}
            <View style={styles.cardContainer}>
                {tours
                    .filter(tour => tour.destination.toLowerCase().includes(searchQuery.toLowerCase())) // Filter tours based on search
                    .map((tour) => (
                        <View key={tour.destination} style={styles.card}>
                            <View style={styles.imageWrapper}>
                                <Image source={Picture} style={styles.cardImage} />
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{tour.destination}</Text>
                                <Text style={styles.cardSubtitle}>{tour.numberOfDays} Days trip to {tour.destination}</Text>
                            </View>
                            <View style={styles.cardFooter}>
                                <Text style={styles.cardPrice}>Rs {tour.totalBudget}</Text>
                            </View>
                        </View>
                    ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        marginBottom: 24,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 16,
        color: '#888',
        marginVertical: 8,
    },
    searchWrapper: {
        width: '100%',
        marginTop: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 12,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        marginBottom: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 5,
    },
    imageWrapper: {
        height: 200,
        width: '100%',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#555',
    },
    cardFooter: {
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Packages