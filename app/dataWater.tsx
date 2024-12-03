import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, FlatList, TouchableWithoutFeedback, Modal } from 'react-native';
import { theme } from '@/assets/theme';
import * as Progress from 'react-native-progress';
import WaterSettingsModal from '@/components/waterSettings';

const WaterDataScreen: React.FC = () => {
    const [dailyGoal, setDailyGoal] = useState('2000');
    const [units, setUnits] = useState('');
    const [selectedAmount, setSelectedAmount] = useState(250);
    const [userProfilePicture, setUserProfilePicture] = useState<string | null>(null);
    const currentProgress = 250 / parseInt(dailyGoal);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const flatListRef = React.useRef<FlatList<any>>(null);
    const amounts = [150, 250, 350, 500, 750, 1000];
    const itemWidth = 120; // Largura de cada item
    const initialIndex = amounts.indexOf(selectedAmount);
    const initialOffset = initialIndex * itemWidth - itemWidth / 4; // Ajusta para centralizar com paddingHorizontal

    const handleSaveSettings = () => {
        // Lógica para salvar as configurações
        setIsModalVisible(false); // Fecha o modal ao salvar
    };

    React.useEffect(() => {
        // Role automaticamente para o valor inicial (250) ao carregar a tela
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({
                offset: initialOffset,
                animated: false, // Sem animação para o carregamento inicial
            });
        }
    }, []);
    

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity >
                    <FontAwesome name='arrow-left'
                        size={24}
                        color='black' />
                </TouchableOpacity>
                <Text style={styles.title}>Water Tracker</Text>
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


            <View style={styles.mainContent}>
                <View style={styles.containerProgress}>
                    <Progress.Circle
                        progress={currentProgress}
                        size={180}
                        color={'#054F77'}
                        borderWidth={2}
                        thickness={10}
                        showsText={true}
                    />
                </View>
                {/* Carrossel Horizontal */}
                <View style={styles.carouselContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={amounts}
                        keyExtractor={(item) => item.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        snapToAlignment="center"
                        contentContainerStyle={{
                            paddingHorizontal: (115), // Metade do item para centralizar
                        }}
                        onScrollEndDrag={(event) => {
                            const offset = event.nativeEvent.contentOffset.x;
                            const index = Math.round(offset / 110); // Calcula o índice baseado no deslocamento
                            setSelectedAmount(amounts[index]);
                        }}
                        decelerationRate="fast"
                        onMomentumScrollEnd={(event) => {
                            const offset = event.nativeEvent.contentOffset.x;
                            const index = Math.round(offset / 110); // Divisão pela largura do item
                            setSelectedAmount(amounts[index]);
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.carouselItem,
                                    item === selectedAmount && styles.selectedCarouselItem, // Adiciona destaque ao item selecionado
                                ]}
                                onPress={() => {
                                    const index = amounts.indexOf(item);
                                    setSelectedAmount(item);
                                    flatListRef.current?.scrollToOffset({
                                        offset: index * 110, // Calcula a posição para centralizar
                                        animated: true,
                                    });
                                }}
                            >
                                <Text
                                    style={[
                                        styles.carouselText,
                                        item === selectedAmount && styles.selectedCarouselText,
                                    ]}
                                >
                                    {item} ml
                                </Text>
                            </TouchableOpacity>
                        )}
                    />

                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.resetButton} >
                        <FontAwesome5 name='redo'
                            size={15}
                            color={theme.colorDarkGreen} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addButton} >
                        <FontAwesome name='plus'
                            size={25}
                            color={theme.colorLightGreen} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.completButton} >
                        <FontAwesome5 name='check-circle'
                            size={20}
                            color={theme.colorDarkGreen} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.weekData}>WEEK DATA</Text>
            </View>

            {/* Footer */}
            <TouchableOpacity style={styles.settingsButton} onPress={() => setIsModalVisible(true)}>
                <FontAwesome6 name='gear'
                    size={30}
                    color={theme.colorDarkGreen} />
            </TouchableOpacity>

            <WaterSettingsModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleSaveSettings}
            />

        </View>
    );
};

export default WaterDataScreen;
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
    carouselContainer: {
        marginVertical: 20,
        width: '100%',
    },
    containerProgress: {
        paddingBottom: 25,
    },
    carouselItem: {
        width: 110, // Largura de cada item
        height: 20, // Altura de cada item
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Graduate'
    },
    selectedCarouselText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
    },
    selectedCarouselItem:{

    },
    mainContent: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    amountSelector: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    amountButton: {
        marginHorizontal: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
    },
    amountText: {
        fontSize: 14,

    },
    buttons: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    completButton: {
        backgroundColor: '#D3D3D3',
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    addButton: {
        backgroundColor: '#054F77',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    resetButton: {
        backgroundColor: '#D3D3D3',
        width: 50,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    weekData: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Graduate'
    },
    settingsButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});
