import React from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { loginSuccess } from '../../../redux/auth/authSlice'
import styles from './styles'
import CustomInput from '../../../components/CustomInput'
import CustomCheckbox from '../../../components/CustomCheckbox'
import useTheme from '../../../utils/useTheme'

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
})



export default function LoginScreen() {
    const dispatch = useDispatch()
    const theme = useTheme()

    const handleLogin = values => {
        dispatch(
            loginSuccess({
                email: values.email,
                token: 'fake-jwt-token',
            })
        )
    }

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.bg }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={[styles.card, { backgroundColor: theme.card }]}>
                <Ionicons
                    name="people-circle-outline"
                    size={72}
                    color={theme.primary}
                    style={{ alignSelf: 'center', marginBottom: 10 }}
                />

                <Text style={[styles.title, { color: theme.text }]}>
                    Welcome Back
                </Text>
                <Text style={[styles.sub, { color: theme.sub }]}>
                    Login to continue
                </Text>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        remember: true,
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={handleLogin}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <>
                            <CustomInput
                                icon="mail-outline"
                                placeholder="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                error={touched.email && errors.email}
                                style={{ paddingBottom: 20 }}
                            />

                            <CustomInput
                                icon="lock-closed-outline"
                                placeholder="Password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                secure
                                error={touched.password && errors.password}
                            />
                            <View style={styles.rememberRow}>
                                <CustomCheckbox
                                    checked={values.remember}
                                    onToggle={() =>
                                        setFieldValue('remember', !values.remember)
                                    }
                                />
                                <Text style={[styles.remember, { color: theme.text, }]}>
                                    Remember me
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    { backgroundColor: theme.primary },
                                ]}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>
            </View>
        </KeyboardAvoidingView>
    )
}




