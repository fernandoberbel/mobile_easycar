import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export const Button = (props) => {
  return (
    <TouchableOpacity
      style={props.theme == "red" ? styles.btnRed : styles.btnYellow}
    >
      <Text style={props.theme == "red" ? styles.textLight : styles.textDark}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};
