import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import { Button } from "../../components/button";
import { styles } from "./styles";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  reverseGeocodeAsync,
} from "expo-location";

export default function Passenger(props) {
  const userId = 1; // id provisórido do usuário logado no app
  const [myLocation, setMyLocation] = useState({});
  const [title, setTitle] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropoffAddress, setDropoffAddress] = useState("");
  const [status, setStatus] = useState("");
  const [rideId, setRideId] = useState(0);
  const [driverName, setDriverName] = useState("");

  async function RequestRideFromUser() {
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

    return response;
  }

  async function RequestPermissionAndGetLocation() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();

      if (currentPosition.coords) {
        return currentPosition.coords;
      } else {
        return {};
      }
    } else {
      return {};
    }
  }

  async function RequestAddressName(lat, long) {
    const response = await reverseGeocodeAsync({
      latitude: lat,
      longitude: long,
    });

    if (response[0].street && response[0].streetNumber) {
      setPickupAddress(`${response[0].street}, ${response[0].streetNumber}`);
    } else {
    }
  }

  async function LoadScreen() {
    const response = await RequestRideFromUser();

    if (!response.ride_id) {
      const location = await RequestPermissionAndGetLocation();

      if (location.latitude) {
        setTitle("Encontre a sua carona agora");
        setMyLocation(location);
        RequestAddressName(location.latitude, location.longitude);
      } else {
        Alert.alert("Não foi possível encontrar a sua localização");
      }
    } else {
      setTitle(
        response.status == "P"
          ? "Aguardando uma carona..."
          : "Carona confirmada"
      );
      setMyLocation({
        latitude: Number(response.pickup_latitude),
        longitude: Number(response.pickup_longitude),
      });
      setPickupAddress(response.pickup_address);
      setDropoffAddress(response.dropoff_address);
      setStatus(response.status);
      setRideId(response.ride_id);
      setDriverName(response.driver_name + " - " + response.driver_phone);
    }
  }

  async function AskForRide() {
    const json = {
      passenger_id: userId,
      pickup_address: pickupAddress,
      dropoff_address: dropoffAddress,
      pickup_latitude: myLocation.latitude,
      pickup_longitude: myLocation.longitude,
    };

    console.log("Fazer POST no servidor", json);

    props.navigation.goBack();
  }

  async function CancelRide() {
    const json = {
      passenger_user_id: userId,
      ride_id: rideId,
    };

    console.log("Cancelar carona", json);

    props.navigation.goBack();
  }

  async function FinishRide() {
    const json = {
      passenger_user_id: userId,
      ride_id: rideId,
    };

    console.log("Finalizar carona", json);

    props.navigation.goBack();
  }

  useEffect(() => {
    LoadScreen();
  }, []);

  return (
    <View style={styles.container}>
      {myLocation.latitude ? (
        <>
          <MapView
            style={styles.map}
            provider={PROVIDER_DEFAULT}
            initialRegion={{
              latitude: myLocation.latitude,
              longitude: myLocation.longitude,
              latitudeDelta: 0.004,
              longitudeDelta: 0.004,
            }}
          >
            <Marker
              coordinate={{
                latitude: myLocation.latitude,
                longitude: myLocation.longitude,
              }}
              title="Nome do passageiro"
              description="Nome da rua"
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
                value={pickupAddress}
                onChangeText={(text) => {
                  setPickupAddress(text);
                }}
                editable={status == "" ? true : false}
              />
            </View>
            <View style={styles.footerFields}>
              <Text>Destino</Text>
              <TextInput
                style={styles.input}
                value={dropoffAddress}
                onChangeText={(text) => {
                  setDropoffAddress(text);
                }}
                editable={status == "" ? true : false}
              />
            </View>
            {status == "A" && (
              <View style={styles.footerFields}>
                <Text>Motorista</Text>
                <TextInput
                  style={styles.input}
                  value={driverName}
                  editable={false}
                />
              </View>
            )}
          </View>
          {status == "" && (
            <Button text="CONFIRMAR" theme="default" onClick={AskForRide} />
          )}
          {status == "P" && (
            <Button text="CANCELAR" theme="red" onClick={CancelRide} />
          )}
          {status == "A" && (
            <Button text="FINALIZAR CARONA" theme="red" onClick={FinishRide} />
          )}
        </>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
