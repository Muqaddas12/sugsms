import { StyleSheet } from "react-native";
import { width,height } from "../src/wrapper/Dimensions";
export const ActivityIndicatorLoading=StyleSheet.create({
    loading:{
        flex:1,
        position:'absolute',
        height:height*.1,
        width:width*.3,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        
      },
})

