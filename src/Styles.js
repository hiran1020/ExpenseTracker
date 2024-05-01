import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        borderColor:'black',
        borderWidth:1,
        padding:10,
        fontSize:30,
        top:5,
        color:'#DDDDDD'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:'#DDDDDD',
    },
    totalExpenses:{

        fontSize:30,
        color:'gray',
        padding:10,
        textAlign:'right',
        fontWeight:'bold',
        marginTop:10,
        borderRadius:10,
        borderColor:'black',
    },
    form:{
        flexDirection:'column',
        justifyContent:'center',
        padding:10,
        borderColor:'black',
        borderWidth:1,
        marginTop:10,
        height:300,
        borderRadius:10,
        justifyContent:'center'
    },
    button:{
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    btnText:{
        color:'#DDDDDD',
        fontSize:20,
        fontWeight:'bold',
        padding:10,
        borderRadius:10,
        borderColor:'black',
        borderWidth:1,
        textAlign:'center',
        marginHorizontal:10,
    },
    expenseList:{
        borderColor:'black',
        borderWidth:1,
        padding:10,
        fontSize:30,
        top:5,
        color:'#DDDDDD',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontWeight:'bold',
        height:windowHeight * 0.55,
    },
    itemList:{
        flexDirection:'row',
        justifyContent:'center',
        padding:10,
        borderColor:'black',
        borderWidth:1,
        marginTop:10,
        borderRadius:10,
        justifyContent:'space-between',
        width:'100%',
    },
    desc:{
        fontWeight:'bold',
        color:'gray',
        fontSize:20,
        alignItems:'center',
        top:5
    },
    amt:{
        fontWeight:'bold',
        color:'red',
        fontSize:20,
        textAlign:'right',
    },
    amtView:{
        flexDirection:'column',
        justifyContent:'space-between',
        padding:5,
        width:'auto',
        justifyContent:'space-between',
    },
    descView:{
        flexDirection:'column',
        justifyContent:'space-between',
        padding:10,
        justifyContent:'space-between',
    },
    date:{
        textAlign:'right',
    },
    loading:{
        color:'white',
        marginTop:50,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
    }
}
)
export default styles