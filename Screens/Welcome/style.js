import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoView:{
    flexDirection:'row',
    justifyContent:'center',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:15,
    marginTop:20,
    marginBottom:10
  },
  buttonView:{
    paddingBottom:20,
    paddingLeft:20,
    paddingRight:20,
    flexDirection:'row',
    justifyContent:'flex-end',
    alignSelf:'center'
  },
  button:{
    width:'100%',
    backgroundColor:'#EB5C5C',
    borderRadius:5
  },
  buttonText:{
    fontSize:16,
    textAlign:'center',
    paddingTop:10,
    paddingBottom:10,
    color:'#ffffff'
  },
  sliderTitle:{
    textAlign:'center',
    color:'#030303',
    fontWeight:'bold',
    fontSize:18,
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20
  },
  sliderContainer:{
    textAlign:'center',
    color:'#9e9e9e',
    fontSize:16,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:15,
    paddingRight:15,
    lineHeight:25
  },
  slide1: {
    width:'100%',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    width:'100%',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    width:'100%',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#030303',
    fontSize: 30,
    fontWeight: 'bold',
  },

});