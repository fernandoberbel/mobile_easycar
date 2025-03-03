import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Button } from "../../components/button";
import { styles } from "./styles";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";

export default function Ride(props) {
  const rideId = props.route.params.rideId;
  const userId = props.route.params.userId;

  const [title, setTitle] = useState("");
  const [ride, setRide] = useState({});

  async function RequestRideDetail(params) {
    const response = {
      ride_id: 1,
      passenger_user_id: 1,
      passenger_name: "Heber Stein Mazutti",
      passenger_phone: "(11) 99999-9999",
      pickup_address: "Praça Charles Miller - Pacaembu",
      pickup_date: "2025-02-19",
      pickup_latitude: "-23.543132",
      pickup_longitude: "-46.665389",
      dropoff_address: "Shopping Center Norte",
      status: "A",
      driver_user_id: 2,
      driver_name: "João Martins",
      driver_phone: "(11) 5555-5555",
    };

    if (response.passenger_name) {
      setTitle(response.passenger_name + " - " + response.passenger_phone);
      setRide(response);
    }
  }

  async function AcceptRide() {
    const json = {
      ride_id: rideId,
      driver_user_id: userId,
    };

    console.log("Aceitar", json);

    props.navigation.goBack();
  }

  async function CancelRide() {
    const json = {
      ride_id: rideId,
      driver_user_id: userId,
    };

    console.log("Cancelar", json);

    props.navigation.goBack();
  }

  useEffect(() => {
    RequestRideDetail();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: Number(ride.pickup_latitude),
          longitude: Number(ride.pickup_longitude),
          latitudeDelta: 0.004,
          longitudeDelta: 0.004,
        }}
      >
        <Marker
          coordinate={{
            latitude: Number(ride.pickup_latitude),
            longitude: Number(ride.pickup_longitude),
          }}
          title={ride.passenger_name}
          description={ride.pickup_address}
        />
      </MapView>

      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.footerFields}>
          <Text>Origem</Text>
          <TextInput
            style={styles.input}
            value={ride.pickup_address}
            editable={false}
          />
        </View>
        <View style={styles.footerFields}>
          <Text>Destino</Text>
          <TextInput
            style={styles.input}
            value={ride.dropoff_address}
            editable={false}
          />
        </View>
      </View>

      {ride.status == "P" && (
        <Button text="ACEITAR" theme="defaut" onClick={AcceptRide} />
      )}
      {ride.status == "A" && (
        <Button text="CANCELAR" theme="red" onClick={CancelRide} />
      )}
    </View>
  );
}
