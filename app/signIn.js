import React, { useRef, useState } from 'react';
import { ImageBackground, View, Text, Image, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useAuth } from '../context/authContext';

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const emailRef = useRef("");
    const passwordRef = useRef("");

    const handleLogin = async () => {
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', "Please fill all the fields!");
            return;
        }

        setLoading(true);
        const response = await login(emailRef.current, passwordRef.current);
        setLoading(false);
        if (!response.success) {
            Alert.alert('Sign In', response.msg);
        }
    };

    return (
        <ImageBackground 
            source={require('../assets/images/background.png')} 
            style={{flex: 1}}
            resizeMode="cover"
        >
            <CustomKeyboardView style={{flex: 1, backgroundColor: 'transparent'}}>
                <StatusBar style="light" />
                <View style={{paddingTop: hp('8%'), paddingHorizontal: wp('5%'), flex: 1}}>
                    <View style={{ alignItems: 'center', marginBottom: 20 }}>
                        <Image style={{height: hp('25%')}} resizeMode='contain' source={require('../assets/images/login.png')} />
                    </View>

                    <Text style={{fontSize: hp('4%'), fontWeight: 'bold', textAlign: 'center', color: 'white', marginBottom: 20}}>Giriş Yap</Text>

                    <View style={{marginBottom: 20}}>
                        <View style={{height: hp('7%'), flexDirection: 'row', alignItems: 'center', backgroundColor: '#242424', paddingHorizontal: 10, borderRadius: 10, marginBottom: 10}}>
                            <Octicons name="mail" size={hp('2.7%')} color="gray" />
                            <TextInput
                                onChangeText={(value) => emailRef.current = value}
                                style={{flex: 1, marginLeft: 10, color: 'white'}}
                                placeholder='Email '
                                placeholderTextColor='gray'
                            />
                        </View>

                        <View style={{height: hp('7%'), flexDirection: 'row', alignItems: 'center', backgroundColor: '#242424', paddingHorizontal: 10, borderRadius: 10}}>
                            <Octicons name="lock" size={hp('2.7%')} color="gray" />
                            <TextInput
                                onChangeText={(value) => passwordRef.current = value}
                                style={{flex: 1, marginLeft: 10, color: 'white'}}
                                placeholder='Şifre'
                                secureTextEntry={true}
                                placeholderTextColor='gray'
                            />
                        </View>
                    </View>

                    {loading ? (
                        <View style={{alignItems: 'center', marginBottom: 20}}>
                            <Loading />
                        </View>
                    ) : (
                        <TouchableOpacity onPress={handleLogin} style={{height: hp('6.5%'), backgroundColor: '#1E1E1E', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginBottom: 20}}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}> Giriş Yap</Text>
                        </TouchableOpacity>
                    )}

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{color: 'gray'}}>Henüz Bir Hesabın Yok Mu? </Text>
                        <TouchableOpacity onPress={() => router.push('signUp')}>
                            <Text style={{fontWeight: 'bold', color: '#BBBBBB'}}>Kayıt Ol</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </CustomKeyboardView>
        </ImageBackground>
    );
}
