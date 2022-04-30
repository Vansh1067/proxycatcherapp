import React from 'react'
import { View ,Text, TouchableOpacity} from 'react-native'
import { Dot, Para, Paragraph, Row } from '../../shared'

import Styles from './styles'
const ClassCard=({title,year,sem,time,leftTitle,RightTitle,LeftButton,RightButton})=>{
    return <View><View style={Styles.textCard}>
        <View style={{padding:22}}>
           <Para style={{marginBottom:20}}>{title}</Para>
            <Row style={{justifyContent:'flex-start'}}>
                {year?<Row >
                    <Dot style={{marginHorizontal:0,marginRight:10}}/>
                     <Text>{year}</Text>
                </Row>:null}
             {sem?<Row>
                    <Dot/>
                    <Text>{sem}</Text>
                </Row>:null}
               {time? <Row>
                    <Dot/>
                    <Text>{time}</Text>
                </Row>:null}
           
            </Row>
        </View>
        <View style={{backgroundColor:'#F0F0F0',padding:15}}>
            <Row>
                <TouchableOpacity onPress={LeftButton}><Paragraph style={{color:'#0C5C8F'}}>{leftTitle}</Paragraph></TouchableOpacity>
                <TouchableOpacity onPress={RightButton}><Paragraph style={{color:'#E40000'}}>{RightTitle}</Paragraph></TouchableOpacity>
            </Row> 
        </View> 
    </View>
   
   </View>
}

export default ClassCard