import React from 'react';
import { Image, ListView, View, TouchableOpacity} from 'react-native';
import { 
    Badge,
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Icon,
    Left,
    Right,
    StyleProvider,
    Text,
    Thumbnail,
    Title 
} from 'native-base';

import { Actions } from 'react-native-router-flux';

import getTheme from '../../../native-base-theme/components';
import commonColor from '../../../native-base-theme/variables/commonColor';
// import MainTabs from '../main-tabs';

import styles from './styles';


class HomeComponent extends React.Component {
    render() {   
        const { patients } = this.state;
        return (
            
                // <Container style={{height: '100%'}}>

                    /* {this.renderHeader()} */
                    /* <MainTabs toggleActive={this.toggleActive}/> */
                    // <Content style={{height: '100%', width: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
                        this.renderHomeContent(patients)
                //     </Content>
                // </Container>

            // </StyleProvider>
        )
    }

    renderHeader = () => {
        return (
            <Header>
                <Left>
                    <Button
                        transparent
                        >
                        <Icon name="md-menu" />
                    </Button>
                </Left>

                <Body style={styles.headerBody} >
                    {/* Profile header */}
                    <Title>Medician</Title>
                </Body>

                <Right>
                    
                </Right>


            </Header>
        )
    }

    renderHomeContent = (patients) => {
        const { DayStatistics, GreetingComponent, PatientsList, ToDoList, TopThreePatients, StartNewConsult } = this; 
        return (
            <View style={styles.homeContainer}>
                <GreetingComponent />
                <DayStatistics />
                <StartNewConsult patients={patients}/>
                <PatientsList patients={patients}/>
                {/* <ToDoList patients={patients}/> */}
            </View>
        )
    }

    DayStatistics = () => {


        return (
            // <View style={{height: '60%', width: '100%'}} >

                <View style={styles.statsContainer}>
                    <View style={styles.statsItem}>

                        <View style={styles.statsItemTop}>
                            <View style={[styles.statsBadge, {backgroundColor: 'orange',}]} />

                            <Text style={styles.statsCount}>5</Text>
                        </View>

                        <Text style={styles.statsDescription}> in queue</Text>
                    </View>

                    <View style={{
                        borderColor: '#e8e8e8',
                        borderStyle: 'solid',
                        borderRightWidth: 1,
                        height: '60%'}} />

                    <View style={styles.statsItem}>

                        <View style={styles.statsItemTop}>
                            <View style={[styles.statsBadge, {backgroundColor: 'blue',}]} />

                            <Text style={styles.statsCount}>8</Text>
                        </View>

                        <Text style={styles.statsDescription}> consults today</Text>
                    </View>

                    {/* <View style={styles.statsItem}>
                        <View style={[styles.statsBadge, {backgroundColor: 'green',}]} />

                        <Text style={styles.statsCount}>13</Text>

                        <Text style={styles.statsDescription}> in total</Text>
                    </View> */}
                </View>

                /* <View style={{
                    width: '99%',
                    height: '30%',
                    flexDirection: 'row',
                    paddingTop: 0,
                    marginBottom: -6
                }}>
                    
                    <Card>
                        <CardItem 
                            header
                            transparent
                            style={{
                                alignItems: 'center',
                                justifyContent:'center',
                                borderBottomWidth: 1,
                                borderBottomColor: '#e8e8e8',
                                borderStyle: 'solid',
                                backgroundColor: 'rgba(82, 159, 244, 0.54)'
                            }}
                        >
                            <Text>
                                Queue
                            </Text>
                        </CardItem>

                        <CardItem
                            style={{
                                alignItems: 'center',
                                justifyContent:'center',
                            }}    
                        >
                            <Text>5</Text>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem 
                            header
                            transparent
                            style={{
                                alignItems: 'center',
                                justifyContent:'center',
                                borderBottomWidth: 1,
                                borderBottomColor: '#e8e8e8',
                                borderStyle: 'solid',
                                backgroundColor: 'rgba(82, 159, 244, 0.54)'
                            }}
                        >
                            <Text>
                                Consulted
                            </Text>
                        </CardItem>

                        <CardItem
                            style={{
                                alignItems: 'center',
                                justifyContent:'center',
                            }}    
                        >
                            <Text>54</Text>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem 
                            header
                            transparent
                            style={{
                                alignItems: 'center',
                                justifyContent:'center',
                                borderBottomWidth: 1,
                                borderBottomColor: '#e8e8e8',
                                borderStyle: 'solid',
                                backgroundColor: 'rgba(82, 159, 244, 0.54)'
                            }}
                        >
                            <Text>
                                Total
                            </Text>
                        </CardItem>

                        <CardItem
                            style={{
                                alignItems: 'center',
                                justifyContent:'center',
                            }}    
                        >
                            <Text>59</Text>
                        </CardItem>
                    </Card>
                </View>
                 */
            // </View>
        )
    }

    GreetingComponent = () => {
        return (
            <View style={styles.greetingsWrapper}>
                <View style={styles.greetingsContainer}>
                    <Text style={styles.greetingText}>
                        Good Morning
                    </Text>
                    <Text style={styles.greetingText}>
                        Monday, 16th July
                    </Text>
                </View>
            </View>
        )
    }

    PatientsList = ({ patients }) => {
        return (
            <View style={styles.patientListWrapper}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderHeader={ () => {
                        return (
                            <View style={styles.patientListHeaderContainer}>
                                <View style={styles.patientListHeader} >
                                    <Text style={styles.patientListHeaderText}>
                                        Patients in queue
                                    </Text>
                                </View>
                            </View>
                        )
                    }}
                    renderRow={(patient) => {
                        return (
                            <View style={styles.patientListItemWrapper}>
                                <View style={styles.patientListItem}>
                                    <View style={styles.patientImageContainer}>
                                        {console.log("patient = " , patient)}
                                        <Image 
                                            style={styles.patientImage}
                                            source={{uri: patient.imgUrl}} />
                                    </View>

                                    <View style={styles.patientDescriptionContainer}>
                                        <Text style={styles.patientName}>{patient.name}</Text>
                                        <Text style={styles.patientSymptoms}>  {patient.subtitle}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    StartNewConsult = ({patients}) => {
        return (
            <View style={styles.startButtonContainer}>

                <TouchableOpacity 
                    style={styles.startButton}
                    onPress={() => Actions.activeSession({patient: patients[0]})}
                >
                    <Text style={styles.startButtonText}>
                        Start next Consultation
                        {/* START NEXT CONSULTATION */}
                    </Text> 
                </TouchableOpacity>
            </View>
        )
    }

    ToDoList = ({patients}) => {
        return (
            <View style={styles.toDoListWrapper}>
                {console.log("patientssss = " , patients)}
                
                <View style={styles.toDoListHeader}>
                    <Text>Header</Text>
                </View>
                
                <View style={styles.toDoListContainer}>
                    <Text>hi</Text>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(patient) => {
                            return (
                                <View>
                                    <Text>{patient.name}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }

    TopThreePatients = ({patients}) => {
        
        return (
            <Card style={{width: '98%', height: '40%'}}>
                <CardItem 
                    header
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#e8e8e8',
                        borderStyle: 'solid',
                    }}>
                    <Button 
                        rounded 
                        small
                    > 
                        <Text>Start next Consultation</Text> 
                    </Button>
                </CardItem>

                    
                <CardItem>
                    <Text note>Patients in line</Text>
                </CardItem>
                
                {patients.map( (patient, i) =>{
                    return (
                        <CardItem key={i}>
                            <Thumbnail 
                                source={{uri: patient.imgUrl}} 
                                small
                            />
                            <Text>{patient.name}</Text>
                            {console.log("top 3 = ",  patients)}
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </CardItem>
                    )
                })}
                <CardItem footer>
                    <Right>
                        <Text note>
                            View more
                        </Text>
                    </Right>
                </CardItem>

            </Card>
        )
    }

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            patients: this.props.patients,
            dataSource: ds.cloneWithRows(this.props.patients),
        }
    }
}

export default HomeComponent;