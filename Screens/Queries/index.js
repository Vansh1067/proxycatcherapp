import React,{useState} from 'react'
import {View,Text, AsyncStorage,RefreshControl} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon  from 'react-native-vector-icons/AntDesign'
import RNFS from 'react-native-fs'
import { Container, Paragraph,Header, Title,QueryBox, Spinner } from '../../shared'
import styles from './styles'


const Queries=(props)=>{
  
    const [data,setData]=useState([])
    const [refreshing,setRefreshing]=useState(false)
    const [refresh,setRefresh]=useState(false)
    const [loading,setLoading]=useState(false)
    const [exist,setExist]=useState(false)
    const onRefresh=()=>{
     /*    setRefreshing(true);
        setRefresh(!refresh); */

    }
  


    return <View style={{flex:1}}>
         <Header heading="Talk to us" icon="arrowleft" onPress={()=>props.navigation.goBack()}/>

        {!loading?<Container>
       
            <View style={{marginVertical:30,flex:1}}>
            {true?
            <View>
                <Title>All Queries Or Suggestions </Title>
                <ScrollView style={{marginVertical:10}}  showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
                                <QueryBox   admin={0} exist={exist} msg={"Hello I am there fine ,How are you"} date={new Date()} onPress={()=>props.navigation.navigate('QueriesDetails')}/>
                                <QueryBox badge={!false} admin={1} msg={"Hi I am also good i hope you are doing well"} date={new Date()} onPress={()=>props.navigation.navigate('QueriesDetails')}/>

                   
                   

                </ScrollView>
            </View>
            :<Paragraph style={{color:'#515762',textAlign:'center'}}>No queries added Yet</Paragraph>}
            <View style={styles.addMore}>
                <Icon name="pluscircle" color="#EB5C5C" size={40} onPress={()=>props.navigation.navigate("AddQuerie")} />
            </View>
            </View>
            
            
       
    </Container>:<Spinner/>}
    </View>
}

export default Queries