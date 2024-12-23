import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import User from '../../assets/images/user.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const Profile = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    useFocusEffect(
        React.useCallback(() => {
            const fetchUserData = async () => {
                try {
                    const storedEmail = await AsyncStorage.getItem('email');
                    const storedName = await AsyncStorage.getItem('name');
                    const storedToken = await AsyncStorage.getItem('token');
                    if (storedToken) {
                        setIsLoggedIn(true);
                        if (storedEmail) setEmail(storedEmail);
                        if (storedName) setName(storedName);
                    } else {
                        setIsLoggedIn(false);
                    }
                } catch (error) {
                    console.error('Error fetching user data from AsyncStorage', error);
                }
            };

            fetchUserData();
        }, [])
    );

    const menuItems = [
        { icon: 'inventory', title: 'Products', subtitle: 'List Your Products' },
    ];

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("email");
            await AsyncStorage.removeItem("name");
            setIsLoggedIn(false);
            navigation.navigate("HomeStack");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    // const handleLogin = () => {
    //     navigation.navigate('Login');
    // };

    const handleLogin = () => {
        navigation.navigate('HomeStack', { screen: 'Login' });
    };

    // const handleSignup = () => {
    //     navigation.navigate('Signup');
    // };

    const handleSignup = () => {
        navigation.navigate('HomeStack', { screen: 'Signup' });
        // navigation.navigate('Signup');
    };

    const handleRoomListing = () => {
        navigation.navigate('HomeStack', { screen: 'RoomListing' });
    };

    if (!isLoggedIn) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loginCard}>
                    <Icon name="account-circle" size={80} color="#6200EE" />
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                    <Text style={styles.subtitleText}>Sign in to continue</Text>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.loginButtonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupButton}
                        onPress={handleSignup}>
                        <Text style={styles.signupButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.profileSection}>
                    <Image
                        source={User}
                        style={styles.avatar}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.email}>{email}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => console.log('Edit profile')}
                >
                    <Icon name="edit" size={20} color="#6200EE" />
                </TouchableOpacity>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.menuItem}
                        onPress={() => {
                            if (item.title === "Products") {
                                handleRoomListing();
                            } else {
                                console.log(`Navigate to ${item.title}`);
                            }
                        }}
                    >
                        <View style={styles.menuIcon}>
                            <Icon name={item.icon} size={24} color="#6200EE" />
                        </View>
                        <View style={styles.menuText}>
                            <Text style={styles.menuTitle}>{item.title}</Text>
                            <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                        </View>
                        <Icon name="chevron-right" size={24} color="#757575" />
                    </TouchableOpacity>
                ))}
            </View>

            {/* Logout Button */}
            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Icon name="logout" size={20} color="#FF3B30" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: '50'
    },
    header: {
        backgroundColor: 'white',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    profileInfo: {
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    email: {
        fontSize: 14,
        color: '#757575',
        marginTop: 2,
    },
    editButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        marginTop: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6200EE',
    },
    statLabel: {
        fontSize: 12,
        color: '#757575',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: '#e0e0e0',
    },
    menuContainer: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingVertical: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuText: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1a1a1a',
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#757575',
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        padding: 15,
    },
    logoutText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
    },
    loginCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        margin: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginTop: 20,
    },
    subtitleText: {
        fontSize: 16,
        color: '#757575',
        marginTop: 8,
        marginBottom: 30,
    },
    loginButton: {
        backgroundColor: '#6200EE',
        borderRadius: 25,
        paddingVertical: 12,
        paddingHorizontal: 40,
        width: '100%',
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    signupButton: {
        marginTop: 15,
        padding: 10,
    },
    signupButtonText: {
        color: '#6200EE',
        fontSize: 16,
    },
});

export default Profile;