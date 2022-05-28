import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Touchable } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { AuthContext } from '../../routes/context'

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('O email nao é válido')
    .required('é necessário um email válido'),
  password: yup
    .string()
    .min(6, ({ min }) => `A senha deve conter pelo menos  ${min} caractres`)
    .required('é necessário uma senha valida válido'),
})

export default function App({ navigation }) {
  const { signIn } = React.useContext(AuthContext)

  function loginUserInNodeApi(values) {
    var myHeaders = new Headers()
    myHeaders.append("Content-type", "application/json")

    var raw = JSON.stringify({

      "email": values.email,
      "password": values.password
    })

    var requesteOption = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      mode: 'cors'
    }

    fetch("http://localhost:8080/loginUser", requesteOption)
      .then((response) => { return response.json() })
      .then((response) => { console.log(response); })
      .then((response) => { signIn() })
      .catch((error) => { console.log(error); })

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FRONT-END NODE JS</Text>
      <Text style={styles.subTitle}>Trabalho final da turma de node js</Text>
      <Formik
        style={{}}
        validateOnMount={true}
        validationSchema={loginValidationSchema}
        initialValues={
          {

            email: "",
            password: "",
          }
        }
        //para casa 
        onSubmit={values => loginUserInNodeApi(values)}
      >
        {
          ({ handleChange, handleBlur, errors, values, touched, handleSubmit }) => (
            <>


              <TextInput
                name="email"
                type={"email"}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                style={styles.inputStyle}
                placeholder="Digite seu email"
              />
              {(errors.email && touched.email) &&
                <Text style={styles.titleErros}>{errors.email}</Text>
              }

              <TextInput
                name="password"
                type={"password"}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                style={styles.inputStyle}
                placeholder="Digite sua senha"
                secureTextEntry
              />
              {(errors.password && touched.password) &&
                <Text style={styles.titleErros}>{errors.password}</Text>
              }

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonTitle} >Cadastrar</Text>
              </TouchableOpacity>
            </>
          )
        }

      </Formik>
      <TouchableOpacity onPress={() => { signIn() }}>
        <Text>Logar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    color: 'gray',
    fontWeight: '700',
    marginTop: '10%'
  },
  subTitle: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '700',
    marginTop: '2%'
  },
  inputStyle: {
    width: 200,
    height: 35,
    //backgroundColor:'#0f1b59',
    borderRadius: 10,
    marginTop: 30,
    padding: 10,
    borderColor: '#0f1b59',
    borderWidth: 1
  },
  button: {
    width: 200,
    height: 35,
    backgroundColor: '#0f1b59',
    borderRadius: 10,
    marginTop: '8%',
  },
  buttonTitle: {
    fontSize: 16,
    color: '#f5f5f5',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8
  },
  titleErros: {
    fontSize: 12,
    color: 'red',
    fontWeight: "600"
  }
})

