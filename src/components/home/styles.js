import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    greetingsContainer: {
        width: '80%',
        height: '80%',
        // backgroundColor: 'lightblue',
        justifyContent: 'center'
    },
    greetingText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Helvetica'
    },
    greetingsWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '18%',
        maxHeight: 100,
        width: '100%'
    },
    headerBody: {
        alignItems: 'center',
        // backgroundColor: 'pink',
        justifyContent: 'center'
    },
    homeContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        height: 600,
        width: '100%',
        backgroundColor: '#188fff'
    },
    patientDescriptionContainer: {
        flex: 8,
        // marginTop: '1%',
        height: '90%',
        flexDirection: 'column',
        borderColor: '#e8e8e8', 
        borderStyle: 'solid',
        borderBottomWidth: 1,
        alignSelf: 'flex-end',
        justifyContent: 'center'
    },
    patientImage: {
        width: 45, 
        height: 45,
        borderColor: '#e8e8e8',
        borderRadius: 22,
        borderWidth: 1,
    },
    patientImageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    patientListHeaderContainer: {
        // padding: 8,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    patientListHeader: {
        height: '100%',
        width: '95%',
        // borderBottomWidth: 1,
        // borderColor: '#e8e8e8', 
        // borderStyle: 'solid',
        paddingTop: 20,
        paddingLeft: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    patientListHeaderText: {
        height: '100%',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#e8e8e8', 
        fontWeight: '600',
        fontSize: 16
    },
    patientListItemWrapper: {
        height: 50,
        // borderBottomWidth: 4,
        // borderTopWidth: 4,
    },
    patientListItem: {
        // padding: '4%',
        flexDirection: 'row',
        height: '100%',

        // paddingRight: '4%',
    },
    patientListWrapper: {
        // flex: 9,
        height: '80%',
        width: '100%',
        backgroundColor: 'white',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#e8e8e8', 
        borderStyle: 'solid'
    },
    patientName: {
        // opacity: 0.9,
        flex: 1
    },
    patientSymptoms: {
        flex:1 ,
        opacity: 0.6,
        fontSize: 12,
        color: 'black',
        // backgroundColor: 'blue'
    },
    startButtonContainer: {
        // flex: 1.2,
        backgroundColor: 'white',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // borderStyle: 'solid',
        // borderColor: '#e8e8e8',
        // borderWidth: 1,
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        marginTop: 2,
        height: 60,
        // marginBottom: 2,
        // marginLeft: 'auto',
        // marginRight: 'auto'
    },
    startButton: {
        // backgroundColor: '#096dd9',
        // borderRadius: 24,
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: '#096dd9',
        // margin: 12,
        // padding: 6,
        // width: 200,
        width: '100%',
        height: '100%',
        backgroundColor: '#fdbe10',
        alignItems: 'center',
        justifyContent: 'center'
        // height: '70%'

        // marginLeft: 8
    },
    startButtonText: {
        color: 'white',
        // opacity: 0.9,
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: '600'
    },
    statsBadge: {
        borderRadius: 8,
        width: 8,
        height: 8,
        marginRight: 10
    },
    statsContainer: {
        width: '100%',
        alignItems: 'center',
        // height: '30%',
        flexDirection: 'row',
        paddingTop: 0,
        marginBottom: -6,
        backgroundColor: '#40a9ff',
        borderColor: '#e8e8e8',
        borderBottomWidth: 1,
        // marginLeft: 'auto',
        // marginRight: 'auto',
        // flex: 2
        minHeight:90,
        height: '18%'
    },
    statsCount: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    statsDescription: {
        fontSize: 13,
        opacity: 0.85,
        justifyContent: 'flex-start',
    },
    statsItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // marginLeft: '5%'
    },
    statsItemTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '6%'
    },
    toDoListContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: 'lightblue',
        width: '100%',

    },
    toDoListHeader: {
        height: '8%',
        borderColor: '#e8e8e8',
        borderBottomWidth: 1,
        justifyContent: 'center',
        width: '95%',
    },
    toDoListWrapper: {
        backgroundColor: 'white',
        width: '100%',
        // height: '60%',
        // height: 100,
        borderColor: '#e8e8e8',
        borderStyle: 'solid',
        borderWidth: 1,
        borderTopWidth: 0,
        flex: 9,
        flexDirection: 'column',
        alignItems: 'center'
    },
})

export default styles;