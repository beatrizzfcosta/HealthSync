import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Modal, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { theme } from '@/assets/theme';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import DatePicker from 'react-native-date-picker';
//import { formatDate } from '../utils/formatDate'; // Ajuste o caminho conforme necessário



const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [gender, setGender] = useState<string>('');
    const genders = [
        { label: 'Masculino', value: 'masculino' },
        { label: 'Feminino', value: 'feminino' },
        { label: 'Outro', value: 'outro' },
    ];
    const [activityLevel, setActivityLevel] = useState<string>('');
    const activityLevels = [
        { label: 'Sedentário', value: 'sedentary' },
        { label: 'Levemente Ativo: 1-2/semana', value: 'lightly_active' },
        { label: 'Moderadamente Ativo: 3-4/semana', value: 'moderately_active' },
        { label: 'Muito Ativo: 5-6/semana', value: 'very_active' },
        { label: 'Extremamente Ativo: 6-7/semana', value: 'extremely_active' },
    ];

    const handleConfirm = (selectedDate: Date) => {
        setBirthDate(selectedDate);
        setShowDatePicker(false);
    };

    // Adiciona um novo utilizador a base de dados 
   /* const handleRegister = async () => {
        const auth = getAuth();

        if (password !== confirmPassword) {
            console.error("As senhas não correspondem.");
            // Aqui você pode exibir um alerta ou uma mensagem de erro para o usuário
            return;
        }

        try {
            // Cria o usuário com e-mail e senha
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const formatBirthDate = formatDate(birthDate);
            // Calcula o DRI antes de armazenar
            const calculatedDri = calculateDRI(gender, parseFloat(weight), parseFloat(height), formatBirthDate.toString(), activityLevel);
            const macroNutrientesGoal = calculateMacronutrientGoals(calculatedDri);
            console.log(macroNutrientesGoal)

            // Referência ao documento do usuário
            const userRef = firestore().collection('users').doc(user.uid);

            // Adiciona dados adicionais em uma subcoleção
            await userRef.collection('data').add({
                username,
                formatBirthDate,
                height,
                weight,
                gender,
                activityLevel,
                dri: calculatedDri,
                macroNutrientesGoal: macroNutrientesGoal
            });

            // Adicção das Refeições defaults para o utilizador 

            const mealsRef = userRef.collection('meals');
            await mealsRef.add({ name: 'Pequeno Almoço', time: '08:00', items: [] });
            await mealsRef.add({ name: 'Almoço', time: '12:30', items: [] });
            await mealsRef.add({ name: 'Jantar', time: '19:30', items: [] });

            navigation.navigate('login');
            console.log('Registrado com sucesso');
            // Redirecionar para outra tela, se necessário
        } catch (error) {
            console.error("Erro ao registrar:", error);
            // Você pode adicionar uma mensagem de erro para o usuário aqui
        }
    };

*/
    const _renderItem = (item: { label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    // Verifica de todos os dados foram preenchidos
/*
    const isFormValid = () => {
        return username && email && gender && birthDate && height && weight && activityLevel && password == confirmPassword;
    };

    const handleRegisto = () => {
        if(isFormValid()){
        Alert.alert(
            'Seus dados estão correctos?',
            'Bem vindo a Calorize!',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Registar',
                    onPress: () => {
                        handleRegister();
                    },
                },
            ],
            { cancelable: true }
        );
    }
    else {
        Alert.alert('Atenção', 'Todos os campos são obrigatórios. Preencha todos os campos antes de adicionar.');
    }
}

const handleIndex = () => {
    Alert.alert(
        'Index',
        'Deseja voltar ao index?',
        [
            {
                text: 'Cancelar',
                style: 'cancel',
            },
            {
                text: 'Voltar',
                onPress: () => {
                    navigation.navigate('index')
                },
            },
        ],
        { cancelable: true }
    );
}
*/
    const renderContent = () => (
        <View style={styles.contentContainer}>
            <TouchableOpacity style={styles.icon} >
                <FontAwesome name='arrow-left'
                        size={24}
                        color='black'/>
            </TouchableOpacity>
            
            <Text style={styles.title}>Registo</Text>
            <Text style={styles.label}>Nome</Text>
            <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                placeholder='Insira o username'
                placeholderTextColor="#a3a19e"
                value={username}
                onChangeText={setUsername}
                leftIcon={
                    <FontAwesome
                        name='user'
                        size={24}
                        color={theme.colorDarkGreen}
                        style={{ marginRight: 5 }}
                    />
                }
            />
            <Text style={styles.label}>E-mail</Text>
            <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                placeholder='Insira o seu e-mail'
                placeholderTextColor="#a3a19e"
                value={email}
                onChangeText={setEmail}
                leftIcon={
                    <FontAwesome
                        name='envelope'
                        size={24}
                        color={theme.colorDarkGreen}
                        style={{ marginRight: 5 }}
                    />
                }
            />
            <Text style={styles.label}>Género</Text>
            <View style={styles.dropdownWrapper}>
                <Dropdown
                    data={genders}
                    value={gender}
                    placeholder="Selecione o género"
                    placeholderStyle={styles.placeholder}
                    style={[styles.dropdown, styles.inputContainer]}
                    onChange={item => {
                        setGender(item.value);
                        console.log('selected', item);
                    }}
                    renderLeftIcon={() => (
                        <FontAwesome
                            name='venus-mars'
                            size={24}
                            color={theme.colorDarkGreen}
                            style={{ marginRight: 5 }}
                        />
                    )}
                    renderItem={_renderItem} labelField={'label'} valueField={'value'} />
            </View>

            <Text style={styles.label}>Data de Nascimento</Text>
            <TouchableOpacity style={styles.dateInputContainer} onPress={() => setShowDatePicker(true)}>
                <FontAwesome name='calendar' size={24} color={theme.colorDarkGreen} style={{ marginRight: 5 }} />
                <Text style={styles.dateText}>
                    {birthDate.toLocaleDateString('pt-PT')}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={showDatePicker}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowDatePicker(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.pickerContainer}>
                        <DatePicker
                            date={birthDate}
                            onDateChange={setBirthDate}
                            maximumDate={new Date()} // Define o máximo como hoje para impedir datas futuras
                            mode="date"
                        />
                        <TouchableOpacity style={styles.confirmButton} onPress={() => handleConfirm(birthDate)}>
                            <Text style={styles.confirmButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                    <Text style={styles.label}>Altura</Text>
                    <Input
                        inputStyle={styles.input}
                        placeholder='cm'
                        placeholderTextColor="#a3a19e"
                        value={height}
                        onChangeText={setHeight}
                        keyboardType="numeric"
                        leftIcon={
                            <FontAwesome
                                name='arrows-v'
                                size={24}
                                color={theme.colorDarkGreen}
                                style={{ marginRight: 5 }}
                            />
                        }
                    />
                </View>

                <View style={styles.columnContainer}>
                    <Text style={styles.label}>Peso</Text>
                    <Input
                        inputStyle={styles.input}
                        placeholder='kg'
                        placeholderTextColor="#a3a19e"
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric"
                        leftIcon={
                            <FontAwesome
                                name='balance-scale'
                                size={24}
                                color={theme.colorDarkGreen}
                                style={{ marginRight: 5 }}
                            />
                        }
                    />
                </View>
            </View>

            <Text style={styles.label}>Password</Text>
            <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                placeholder='Insira a password'
                placeholderTextColor="#a3a19e"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leftIcon={
                    <FontAwesome
                        name='lock'
                        size={24}
                        color= {theme.colorDarkGreen
                        }
                        style={{ marginRight: 5 }}
                    />
                }
            />

            <Text style={styles.label}>Confirmar Password</Text>
            <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                placeholder='Confirmar a password'
                placeholderTextColor="#a3a19e"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                leftIcon={
                    <FontAwesome
                        name='lock'
                        size={24}
                        color={theme.colorDarkGreen}
                        style={{ marginRight: 5 }}
                    />
                }
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={[{ key: 'formContent' }]}
            renderItem={renderContent}
            keyExtractor={(item) => item.key}
            contentContainerStyle={styles.scrollContainer}
        />
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        
    },
    contentContainer: {
        alignItems: 'center',
    },
   
    icon:{
        marginTop: 60,
        alignSelf: 'flex-start',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',  
        marginBottom: 20,
        fontFamily:'Graduate'
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily:'Graduate'
    },
    dropdown: {
        padding: 10,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#86939e',
        backgroundColor: 'white',
        flex: 1,
    },
    dropdownWrapper: {
        width: 300,
        marginBottom: 15,
        zIndex: 5000,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 300,
    },
    columnContainer: {
        flex: 1,
    },
    button: {
        backgroundColor: theme.colorDarkGreen,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
        width: 200,
        marginTop:20
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily:'Graduate'
    },
    inputContainer: {
        width: 300,
        paddingLeft: 0,
        paddingRight: 0,
    },
    input: {
        fontSize: 14,
        fontFamily:'Graduate'
    },
    placeholder: {
        color: "#a3a19e",
        fontSize: 14,
        fontFamily:'Graduate'
    },
    item: {
        paddingVertical: 17,
        paddingHorizontal: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 14,
    },
    dateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#86939e',
        padding: 10,
        borderRadius: 5,
        marginBottom: 12,
        marginTop: 5
    },
    dateText: {
        fontSize: 14,
        color: '#a3a19e',
        fontFamily:'Graduate'
    },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    confirmButton: {
        marginTop: 10,
        backgroundColor: theme.colorDarkGreen,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    confirmButtonText: {
        color: theme.colorDarkGreen,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
