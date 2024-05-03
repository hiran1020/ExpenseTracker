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
    titleLogin:{
        padding:10,
        fontSize:36,
        color:'#DDDDDD'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:'#DDDDDD',
    },
    inputLogin: {
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
        padding: 10,

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
    dateGroup:{
        textAlign:'left',
        fontWeight:'bold',
        color:'gray',
        fontSize:20,
        alignItems:'center',
        top:5,
        left:5,
    },
    loading:{
        color:'white',
        marginTop:50,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
    },
    container: {
        justifyContent: 'center',
        padding: 20,
        top:'50%'
    
      },
      error: {
        color: 'red',
        marginBottom: 10,
      },
      input: {
        width: '100%',
        height: 40,
        borderColor:'black',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
      modalContainer: {
        justifyContent: 'center',
        backgroundColor:'transparent',
        flex: 1,
      },
      modalContent: {
        backgroundColor: 'transparent',
        margin:10,
        padding: 20,
        borderRadius: 10,
        elevation: 15,
      },
      success: {
        color: 'green',
        marginTop: 10,
        marginBottom: 10,
      },
    modalButton: {
        flexDirection:'column',
        justifyContent:'center',
        borderColor:'black',
        borderWidth:1,
        marginBottom:10,
        borderRadius:10,
        justifyContent:'center',
        
      },
      button: {
        backgroundColor: 'transparent',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        margin:11,
        backgroundColor:"gray",
        borderColor: 'black',
        borderRadius: 10, // Border radius for visibility
         // Border color for visibility
      },
      buttonText: {
        color: '#dddddd', // Text color
        textAlign: 'center',
        fontSize: 16,
      },
      dropdownButtonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
        borderColor:'black',
        borderWidth:1,
      },
      dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
      },
      dropdownButtonArrowStyle: {
        fontSize: 28,
      },
      dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
      dropdownMenuStyle: {
        backgroundColor: 'transparent',
        borderRadius: 8,
      },
      dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
      },
      dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
      },
      dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
      },
}
)
export default styles