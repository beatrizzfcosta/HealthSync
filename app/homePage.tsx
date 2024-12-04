import { FontAwesome, FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { theme } from '@/assets/theme';

const HomeScreen: React.FC = () => {
    const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null);
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long', // Nome do dia (ex: Monday)
        year: 'numeric', // Ano completo (ex: 2024)
        month: 'long',   // Nome completo do mês (ex: December)
        day: 'numeric',  // Número do dia (ex: 4)
      });
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
                <TouchableOpacity >
                    <FontAwesome name='heartbeat'
                        size={30}
                        color={theme.colorDarkGreen}
                        />
                </TouchableOpacity>
                <Text style={styles.title}>Home</Text>
                <TouchableOpacity
                >
                    {userProfilePicture ? (
                        <Image
                            source={{ uri: userProfilePicture }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <FontAwesome name="user-circle" size={35} color={theme.colorDarkGreen} />
                    )}
                </TouchableOpacity>
            </View>
      
       {/* Current Date */}
       <Text style={styles.currentDate}>{currentDate}</Text>
      {/* Alerts Section */}
      <Text style={styles.sectionTitle}>ALERTS</Text>
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>YOU SHOULD DRINK WATER</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log Data</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.alertContainer}>
        <Text style={styles.alertText}>YOU SHOULD MOVE YOUR BODY</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>See Your Move Data</Text>
        </TouchableOpacity>
      </View>

      {/* Highlights Section */}
      <View style={styles.highlightsHeader}>
        <Text style={styles.sectionTitle}>HIGHLIGHTS</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>View more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.highlightsContainer}>
        <View style={styles.highlightBox}>
        <Ionicons name='footsteps'
                        size={30}
                        color={theme.colorWhite}
                        />
          <Text style={styles.highlightTitle}>STEPS</Text>
          <Text style={styles.highlightValue}>11,250</Text>
        </View>
        <View style={styles.highlightBox}>
        <FontAwesome5 name='walking'
                        size={30}
                        color={theme.colorWhite}
                        />
          <Text style={styles.highlightTitle}>ACTIVITY</Text>
          <Text style={styles.highlightValue}>0 TODAY</Text>
        </View>
        <View style={styles.highlightBox}>
        <FontAwesome6 name='glass-water-droplet'
                        size={30}
                        color={theme.colorWhite}
                        />
          <Text style={styles.highlightTitle}>WATER</Text>
          <Text style={styles.highlightValue}>0 of 1,900ML</Text>
        </View>
        <View style={styles.highlightBox}>
        <Ionicons name='scale-outline'
                        size={30}
                        color={theme.colorWhite}
                        />
          <Text style={styles.highlightTitle}>WEIGHT</Text>
          <Text style={styles.highlightValue}>SET WEIGHT</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorLightGreen,
    padding: 20,
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
},
title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Graduate',
    textAlign: 'center',
},
profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 30,
},
  currentDate: {
    fontSize: 16,
    marginBottom: 20,
    marginTop:20,
    fontFamily:'graduate'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily:'graduate'
  },
  alertContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  alertText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily:'graduate'
  },
  button: {
    backgroundColor: '#344E41',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily:'graduate'
  },
  highlightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  viewMore: {
    fontSize: 12,
    color: '#344E41',
    fontWeight: 'bold',
    fontFamily:'graduate'
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightBox: {
    backgroundColor: '#344E41',
    width: '48%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  highlightTitle: {
    marginTop:10,
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily:'graduate'
  },
  highlightValue: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default HomeScreen;
