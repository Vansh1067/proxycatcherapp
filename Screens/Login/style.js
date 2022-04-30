import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
  flexWrapper:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
   
  },
  pickerPopup:{
  position:'absolute',
  backgroundColor:'#FFFFFF',
  width:200,
  height:300,top:0,
  left:1,
  zIndex:500,
  borderRadius:8,
  borderBottomRightRadius:8,
  padding:10,
 
  shadowColor:'rgba(0,0,0,0.2)',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.23,
  shadowRadius: 8,  
  elevation:2,

  
}


});