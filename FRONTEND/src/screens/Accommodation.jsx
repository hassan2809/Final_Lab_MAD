import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Accommodation = () => {
    const [listings, setListings] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { register, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
            minPrice: 0,
            maxPrice: 10000,
            roomType: '',
            location: '',
            furnished: '',
        },
    });

    const minPrice = watch('minPrice');
    const maxPrice = watch('maxPrice');

    const fetchListings = async () => {
        try {
            // const response = await axios.get('http://localhost:8000/auth/getRoomListings');
            const response = await axios.get('http://10.135.54.64:8000/auth/getRoomListings');
            // console.log(response)
            if (response.data.success) {
                setListings(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const onSubmit = async (data) => {
        const response = await axios.post('http://10.135.54.64:8000/auth/filterRoomListings', data);
        setListings(response.data.data);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.filterContainer}>
                <Text style={styles.filterTitle}>Filters</Text>

                {/* Location Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Enter location"
                    onChangeText={(text) => setValue('location', text)}
                />

                {/* Room Type */}
                <TextInput
                    style={styles.input}
                    placeholder="Room Type (e.g. Entire, Private, Shared)"
                    onChangeText={(text) => setValue('roomType', text)}
                />

                {/* Furnished Status */}
                <TextInput
                    style={styles.input}
                    placeholder="Furnished Status (e.g. Furnished, Unfurnished)"
                    onChangeText={(text) => setValue('furnished', text)}
                />

                {/* Apply Filters Button */}
                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                    <Text style={styles.buttonText}>Apply Filters</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.listingsContainer}>
                {listings.map((listing) => (
                    <View key={listing._id} style={styles.card}>
                        {listing.images.map((image, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri: `http://10.135.54.64:8000${image}` }} style={styles.image} />
                            </View>
                        ))}
                        <View style={styles.cardContent}>
                            <Text style={styles.title}>{listing.title}</Text>
                            <Text style={styles.description}>{listing.location}</Text>
                            <Text style={styles.roomType}>{listing.roomType}</Text>
                            <Text style={styles.furnished}>{listing.furnished}</Text>
                            <Text style={styles.price}>Rs {listing.price}/night</Text>
                            <TouchableOpacity style={styles.bookButton}>
                                <Text style={styles.bookButtonText}>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    filterContainer: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listingsContainer: {
        marginTop: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
    },
    swiper: {
        height: 200,
    },
    imageWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        marginBottom: 4,
    },
    roomType: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    furnished: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    bookButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    bookButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});


export default Accommodation