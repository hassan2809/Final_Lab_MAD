import React, { useState } from 'react';
import { View, Text, TextInput, Button, ToastAndroid, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoomListing = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [roomType, setRoomType] = useState('');
    const [furnished, setFurnished] = useState('');
    const [images, setImages] = useState([]);


    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            price: '',
            roomType: '',
            location: '',
            amenities: '',
            furnished: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            console.log(data)
            const token = await AsyncStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('roomType', roomType);
            formData.append('location', data.location);
            formData.append('amenities', data.amenities);
            formData.append('furnished', data.furnished);
            images.forEach((file, index) => {
                formData.append(`images`, file);
            });
            console.log(token)
            const response = await axios.post("http://10.135.54.64:8000/auth/postRoomListing", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            reset();
            setRoomType('');
            setFurnished('');
            if (response.data.success) {
                // console.log(response.data)                
                console.log("response")
            }
        } catch (error) {
        }
    };

    return (
        <View style={styles.formContainer}>
            {/* Room Title */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Room Title</Text>
                <Controller
                    control={control}
                    name="title"
                    rules={{ required: 'Title is required', minLength: { value: 5, message: 'Title must be at least 5 characters long' } }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Cozy Studio in Johar Town"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
            </View>

            {/* Description */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <Controller
                    control={control}
                    name="description"
                    rules={{ required: 'Description is required', minLength: { value: 20, message: 'Description must be at least 20 characters long' } }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={[styles.input, { height: 100 }]}
                            placeholder="Describe your room and its unique features..."
                            multiline
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.description && <Text style={styles.errorText}>{errors.description.message}</Text>}
            </View>

            {/* Price and Room Type */}
            <View style={styles.row}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Price per Night (Rs)</Text>
                    <Controller
                        control={control}
                        name="price"
                        rules={{ required: 'Price is required', min: { value: 1, message: 'Price must be at least 1' } }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="1000"
                                keyboardType="numeric"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />
                    {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
                </View>

            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Room Type</Text>
                <Picker
                    selectedValue={roomType}
                    onValueChange={(itemValue) => {
                        setRoomType(itemValue);
                    }}
                >
                    <Picker.Item label="Select room type" value="" />
                    <Picker.Item label="Entire Place" value="entire" />
                    <Picker.Item label="Private Room" value="private" />
                    <Picker.Item label="Shared Room" value="shared" />
                </Picker>
                {errors.roomType && <Text style={styles.errorText}>{errors.roomType.message}</Text>}
            </View>

            {/* Location */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Location</Text>
                <Controller
                    control={control}
                    name="location"
                    rules={{ required: 'Location is required', minLength: { value: 5, message: 'Location must be at least 5 characters long' } }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="City, State, Country"
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.location && <Text style={styles.errorText}>{errors.location.message}</Text>}
            </View>

            {/* Amenities */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Amenities</Text>
                <Controller
                    control={control}
                    name="amenities"
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="WiFi, Kitchen, Air Conditioning, etc."
                            value={value}
                            onChangeText={onChange}
                        />
                    )}
                />
            </View>

            {/* Furnishing */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Furnishing</Text>
                <Picker
                    selectedValue={furnished}
                    onValueChange={(itemValue) => setValue('furnished', itemValue)}
                >
                    <Picker.Item label="Select Furnishing" value="" />
                    <Picker.Item label="Furnished" value="furnished" />
                    <Picker.Item label="Unfurnished" value="unfurnished" />
                </Picker>
                {errors.furnished && <Text style={styles.errorText}>{errors.furnished.message}</Text>}
            </View>

            {/* Submit Button */}
            <Button
                title={isSubmitting ? 'Listing Room...' : 'List Your Room'}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 16,
    },
    inputContainer: {
        marginBottom: 16,
        width: '100% '
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default RoomListing;
