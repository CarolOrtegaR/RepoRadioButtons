// app/(tabs)/index.tsx
// Ejemplo de formulario con React Native Paper + React Hook Form
// Campo "plan" controlado con RadioButtons (Básico / Pro / Premium)

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import {
  Button,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';

// Tipo de datos del formulario (TypeScript)
type FormData = {
  nombre: string;
  email: string;
  plan: string;
};

// 💡 Tema claro personalizado para mejorar contraste
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#A855F7',   // moradito para el botón y los radios
    background: '#FFFFFF',
    surface: '#FFFFFF',
    onSurface: '#000000', // texto sobre superficies
    text: '#000000',      // color de texto principal
  },
};

// Pantalla principal del tab
export default function TabHome() {
  // Envolvemos la pantalla en PaperProvider con nuestro tema
  return (
    <PaperProvider theme={theme}>
      <RegisterPlanForm />
    </PaperProvider>
  );
}

// Componente que contiene el formulario
function RegisterPlanForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      nombre: '',
      email: '',
      plan: '',
    },
  });

  const onSubmit = (data: FormData) => {
    Alert.alert(
      'Datos enviados',
      `Nombre: ${data.nombre}\nCorreo: ${data.email}\nPlan: ${data.plan}`
    );
    console.log('Datos del formulario:', data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Plan</Text>

      {/* Campo: Nombre completo */}
      <Controller
        control={control}
        name="nombre"
        rules={{
          required: 'El nombre es obligatorio',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nombre completo"
            mode="outlined"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nombre && (
        <Text style={styles.errorText}>{errors.nombre.message}</Text>
      )}

      {/* Campo: Correo electrónico */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: 'El correo es obligatorio',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Ingresa un correo válido',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Correo electrónico"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      {/* Título de la sección de radio buttons */}
      <Text style={styles.sectionTitle}>Tipo de plan</Text>

      {/* Campo: Tipo de plan (Radio Buttons) */}
      <Controller
        control={control}
        name="plan"
        rules={{
          required: 'Debes seleccionar un plan',
        }}
        render={({ field: { onChange, value } }) => (
          <RadioButton.Group onValueChange={onChange} value={value}>
            <RadioButton.Item
              label="Plan Básico"
              value="basico"
              labelStyle={styles.radioLabel}
            />
            <RadioButton.Item
              label="Plan Pro"
              value="pro"
              labelStyle={styles.radioLabel}
            />
            <RadioButton.Item
              label="Plan Premium"
              value="premium"
              labelStyle={styles.radioLabel}
            />
          </RadioButton.Group>
        )}
      />
      {errors.plan && (
        <Text style={styles.errorText}>{errors.plan.message}</Text>
      )}

      {/* Botón para enviar el formulario */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Enviar
      </Button>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 26,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000000', // 🖤 título bien legible
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#111827', // gris oscuro
  },
  radioLabel: {
    fontSize: 15,
    color: '#111827', // labels de los radios más oscuros
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
  },
  errorText: {
    color: '#DC2626', // rojo más fuerte
    marginBottom: 8,
  },
});
