import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ScrollView, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    StatusBar,
} from 'react-native';
import Intro2Image from '../../assets/images/accommodation.jpg'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Accommodation from './Accommodation'
import Packages from './Packages'
import Profile from './Profile'

const { width } = Dimensions.get('window');

// Screens
const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ScrollView bounces={false}>
                {/* Hero Section */}
                <ImageBackground
                    source={Intro2Image}
                    style={styles.heroSection}
                >
                    <View style={styles.overlay}>
                        <View style={styles.header}>
                            <Text style={styles.logo}>TripMate</Text>
                        </View>
                        <View style={styles.heroContent}>
                            <Text style={styles.heroTitle}>Find Your Perfect Stay</Text>
                            <Text style={styles.heroSubtitle}>
                                Discover amazing places to stay around the world
                            </Text>
                            <TouchableOpacity style={styles.exploreButton}>
                                <Text style={styles.exploreButtonText}>Explore Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>

                {/* Featured Section */}
                <View style={styles.featuredSection}>
                    <Text style={styles.sectionTitle}>Featured Destinations</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.cardContainer}
                    >
                        {[1, 2, 3].map((item) => (
                            <TouchableOpacity key={item} style={styles.card}>
                                <ImageBackground
                                    source={Intro2Image}
                                    style={styles.cardImage}
                                    imageStyle={styles.cardImageStyle}
                                >
                                    <View style={styles.cardOverlay}>
                                        <Text style={styles.cardTitle}>Destination {item}</Text>
                                        <Text style={styles.cardSubtitle}>Starting from $99/night</Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Why Choose Us Section */}
                <View style={styles.whyChooseSection}>
                    <Text style={styles.sectionTitle}>Why Choose Us</Text>
                    <View style={styles.featureGrid}>
                        {['verified', 'support', 'favorite', 'star'].map((iconName, index) => (
                            <View key={index} style={styles.featureItem}>
                                <Icon name={iconName} size={32} color="#007AFF" />
                                <Text style={styles.featureTitle}>
                                    {['Verified Places', '24/7 Support', 'Best Prices', 'Top Rated'][index]}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const Packagesn = () => (
    <View style={styles.screen}>
        <Text style={styles.text}>Settings Screen</Text>
    </View>
);

const ProfileScreen = () => (
    <View style={styles.screen}>
        <Text style={styles.text}>Profile Screen</Text>
    </View>
);

// Create Bottom Tabs
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person';
                    } else if (route.name === 'Accommodation') {
                        iconName = focused ? 'hotel' : 'hotel';
                    }
                    else if (route.name === 'Packages') {
                        iconName = focused ? 'tour' : 'tour';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#6200EE',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: { height: 60, paddingBottom: 5 },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Accommodation" component={Accommodation} />
            <Tab.Screen name="Packages" component={Packages} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

// Styles
const styles = StyleSheet.create({
    screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20 },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    heroSection: {
        height: 500,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    menuButton: {
        padding: 8,
    },
    heroContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 30,
    },
    exploreButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
    },
    exploreButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    featuredSection: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    cardContainer: {
        marginLeft: -20,
        paddingLeft: 20,
    },
    card: {
        width: width * 0.7,
        height: 400,
        marginRight: 20,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    cardImage: {
        flex: 1,
    },
    cardImageStyle: {
        borderRadius: 15,
    },
    cardOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
        padding: 20,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    cardSubtitle: {
        fontSize: 16,
        color: '#fff',
    },
    whyChooseSection: {
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    featureGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureItem: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        textAlign: 'center',
        color: '#333',
    },
    footer: {
        padding: 20,
        backgroundColor: '#333',
    },
    footerText: {
        color: '#fff',
        textAlign: 'center',
    },
});


export default MainApp;
