import { StyleSheet, Dimensions } from 'react-native';
export default StyleSheet.create({
    button:{
        flexDirection:'row',
        justifyContent:'center',
        width:'90%',
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
      buttonView:{
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:5,
        
      },
      textInput:{
        borderBottomColor:'#959595',
        borderBottomWidth:1.5,
        paddingVertical:0,
        paddingHorizontal:0,
        color:'#424242',
        marginVertical:10
      
      },
      text:{
        color:'#292F3B',
        fontSize:18
      },
      paragraph:{
        color:'#292F3B',
        fontSize:16
      },
      para:{
        color:'#515762',
        fontSize:13,
        
      },
      headingView:{
        display:'flex',
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        width:'100%',
        padding:15,
        backgroundColor:'#C4C4C410',
        shadowColor:'#C4C4C410',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation:2,
       
       
       },
       container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingHorizontal:15,
       
      },
      modal:{
        backgroundColor:"#FFFFFF",
        width:'90%',
        padding:20,
        marginVertical:100,
        shadowColor:'rgba(0,0,0,0.2)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation:5,
        borderRadius:5
      },
      textCard:{
        backgroundColor:"#FFFFFF",
        marginHorizontal:2,
        padding:22,
        shadowColor:'rgba(0,0,0,0.2)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 5,  
        elevation:2,
        borderRadius:5,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        marginVertical:10,
        overflow:"hidden"
      },
      datepicker:{
        display:'flex',
        flexDirection:"row",
        justifyContent:'space-between',
        width:150,
        alignItems:'center',
        borderColor:"#959595",
        borderBottomWidth:1,
        paddingBottom:5
        
      },
      triangle:{
      
      
     
      borderLeftColor: '#959595',
      

     
      
      borderBottomWidth:20,
      borderBottomColor:'transparent',
      
      position:'absolute',
      bottom:-20
     
      },
      sortPopup:{
        position:'absolute',
        padding:10,
        right:2,
        top:22,
        backgroundColor:'#FAFAFA',
        width:130,
        zIndex:500,
        shadowColor:'rgba(0,0,0,0.2)',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,  
        elevation:2,
        borderRadius:5
      }
});