import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from "./styles"
import { AuthContext } from '../../routes/context'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOGZmNzNiZjhhZTU0YWZlZTFhM2Q2MiIsImlhdCI6MTY1MzYwMzU5MywiZXhwIjoxNjUzNjI1MTkzfQ.XkMuzzf0_8UuemKaL0dvpZNUBEax9Bwyz8BxCKHLfis"
export default function App() {
    const { signIn } = React.useContext(AuthContext)
    function getDataInNodeBackEnd() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/getUser", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() =>  getDataInNodeBackEnd()}>
                <Text style={styles.buttonTitle}>Buscar dados</Text>
            </TouchableOpacity>
            {/* <Text>{signIn()}</Text> */}
        </View>
    )
}