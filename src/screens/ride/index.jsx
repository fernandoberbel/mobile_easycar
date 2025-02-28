import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "../../components/button";
import { styles } from "./styles";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

export default function Ride(props) {
  const [myLocation, setMyLocation] = useState(null);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: -21.131385,
          longitude: -51.102132,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
      >
        <Marker
          coordinate={{ latitude: -21.131385, longitude: -51.102132 }}
          title="Nome do passageiro"
          description="Nome da rua"
        />
      </MapView>

      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text style={styles.text}>Encontre a sua carona</Text>
        </View>
        <View style={styles.footerFields}>
          <Text>Origem</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.footerFields}>
          <Text>Destino</Text>
          <TextInput style={styles.input} />
        </View>
      </View>

      <Button text="ACEITAR" />
    </View>
  );
}
