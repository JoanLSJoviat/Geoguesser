import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import CrosshairImage from '../img/pointer.png'
import RedPin from '../img/RedPin.png'
import nextArrow from '../img/Arrow.png'
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import SetMarkBtn from '../img/setMarkBtn.png';
import CheckBtn from '../img/checkBtn.png';
import * as Font from 'expo-font';
import getDistance from 'geolib/es/getDistance';

const HomeScreen = () => {
    const [showMarker, setShowMarker] = React.useState(false);
    const [showPolyline, setShowPolyline] = React.useState(false);
    const [showNextArrow, setShowNextArrow] = React.useState(false);
    const [refresh, setRefresh] = useState("");
    const [questionsList, setQuestionsList] = useState([]);
    const [currentQuestionIndex, setQuestionIndex] = useState(0);
    const mapRef = useRef(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [markerDbPosition, setMarkerDbPosition] = useState(null);
    const [distance, setDistance] = useState(null);
    const [points, setPoints] = useState(0);
    const [showPoints, setShowPoints] = useState(false);
    const [totalPoints, setTotalPoints] = useState(0);
    const [hasChecked, setHasChecked] = useState(false);
    const { navigate } = useNavigation();


const loadFonts = async () => {
  await Font.loadAsync({
   
    Dong: require('../assets/fonts/DongporaDemo.otf'),
   
  });
};

loadFonts();
  
    const setMark = async () => {
        if (mapRef.current && markerPosition === null) {
          const camera = await mapRef.current.getCamera();
          console.log("Latitud:", camera.center.latitude);
          console.log("Longitud:", camera.center.longitude);
          setMarkerPosition({ latitude: camera.center.latitude, longitude: camera.center.longitude });
    
        }
    };

    const check = () => {
      console.log("Check");
     // if (currentQuestionIndex < questionsList.length-1){
       // console.log(questionsList[currentQuestionIndex+1].Title);
       if (markerPosition){
        setShowMarker(true); 
        const { latitude, longitude } = markerPosition;
        const markerDb = {
           latitude: parseFloat(questionsList[currentQuestionIndex].Lat),
           longitude: parseFloat(questionsList[currentQuestionIndex].Lon),
           };

       const dist = getDistance(
          {
             latitude: markerDb.latitude,
             longitude: markerDb.longitude,
          },
          { 
            latitude, 
            longitude 
          });
            
           
           setDistance(dist);
           console.log("Distance: " + dist);   
           console.log("Distance general:" + distance);
           calculatePoints(dist);
           setMarkerDbPosition(markerDb);
           setShowPolyline(true);

           if (currentQuestionIndex <= questionsList.length -1){

           setShowNextArrow(true);

          }

          setHasChecked(true);
       }
      
    };

    const nextQ = () => {
      console.log("next question");
     if (currentQuestionIndex < questionsList.length - 1) {
      //console.log(questionsList[currentQuestionIndex + 1].Title);
      setQuestionIndex(currentQuestionIndex + 1);
      setShowMarker(false);
      setShowPolyline(false);
      setMarkerDbPosition(null);
      setMarkerPosition(null);
      setShowNextArrow(false);
      setDistance(null);
      setShowPoints(false);
      setHasChecked(false);
      setPoints(0);
     }

     else if (currentQuestionIndex == questionsList.length - 1){
     // console.log("NEXT SCREEN");
      navigate('Results', { totalPoints });
     }

    };

    const calculatePoints = (distMeters) => {
        let newPoints = 0;
        
      if (!hasChecked){
        if (distMeters >= 0 && distMeters <= 300000){
          setPoints(100);
          newPoints = 100;
        }

        else if (distMeters > 300000 && distMeters <= 700000) {
          setPoints(50);
          newPoints = 50;
        }
        
        else if (distMeters > 700000 && distMeters <= 1100000) {
          setPoints(20);
          newPoints = 20;
        }

        else if (distMeters > 1100000 && distMeters <= 1500000) {
          setPoints(10);
          newPoints = 10;
        }

        else {
          setPoints(0);
        }
      
        setShowPoints(true);
        setTotalPoints((prevTotalPoints) => prevTotalPoints + newPoints);
        console.log("Total points: " + totalPoints);
        console.log("has checked: " + hasChecked);
      }

    };


    useEffect(() => { // Funció que es crida al començar. Ve a ser un OnCreate d'Android/start()
      // Función para obtener todos los usuarios
      const fetchQuestions = async () => {
        try {
          console.log(db);
          const qCol = collection(db, 'Questions'); // Accede a la colección 'Users'
          const questionsSnapshot = await getDocs(qCol); // Obtiene todos los documentos
          const qList = questionsSnapshot.docs.map(doc => doc.data()); // Mapea cada documento a su data
          setQuestionsList(qList);
         // setRefresh(" ");
          console.log(qList[0].Title); // Imprime los datos obtenidos
    
      
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchQuestions(); // Llama a la función al inicio

    }, []);

    return (
      <View style={styles.container}>
          
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.setMarkContainer} onPress={setMark}>
              <Image style={styles.btn} source={SetMarkBtn}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.checkContainer} onPress={check}>
              <Image style={styles.btn} source={CheckBtn}></Image>
            </TouchableOpacity>
        </View>
          <View style={styles.mapContainer}>
              <MapView ref={mapRef}  style={{width:'100%', height:'100%'}}mapType='satellite'>
                  {markerPosition && (
                  <Marker coordinate={markerPosition} title="Marcador" description="Este es el centro del mapa" />
                  )}
                   {showMarker && (
                    <Marker
                    coordinate={
                    {
                    latitude: parseFloat(questionsList[currentQuestionIndex].Lat),
                    longitude: parseFloat(questionsList[currentQuestionIndex].Lon)
                    }}
                    title="Marcador"
                    description="Este es el centro del mapa" />
                   )}
                   {showPolyline && markerDbPosition && (
                    <Polyline
                    coordinates={[markerDbPosition, markerPosition]} //specify our coordinates
                    strokeColor={"#000"}
                    strokeWidth={3}
                    lineDashPattern={[1]}
                  />
                   )}
              </MapView>
              {distance && (
              <View style={styles.distanceContainer}>
                  <Text style={styles.distance}>{"Distance: " + distance +"m"}</Text>
              </View>
               )}
              <View pointerEvents="none" style={styles.mapCenterMarkerView}>
                <Image 
                    style={{width:'15%', height:'15%'}}
                    source={CrosshairImage}  
                />
            </View>
          </View> 
          <View style={styles.footer}>
            {questionsList.length > 0 ?  (
                  <Text style={styles.question}>{questionsList[currentQuestionIndex].Title}</Text>
                ) : (
                  <Text>Loading quizz...</Text>
                )}
            {showNextArrow && (
            <TouchableOpacity style={styles.arrowContainer} onPress={nextQ}>
              <Image style={styles.arrow} source={nextArrow}></Image>
            </TouchableOpacity>
            )}
            {showPoints && (
              <View style={styles.pointsContainer}>
              <Text style={styles.pointsLbl}>Points:</Text>
              <Text style={styles.points}>{points}</Text>
            </View>
            )}
          </View>          
      </View>
      
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c2c2c4',
        width: '100%',
        height: '100%',   
    },
    buttonsContainer:  {
      flexDirection: 'row',
      height: '9%',
      width: '90%',
      marginTop: '15%',
      zIndex: 2,
    //  backgroundColor: 'blue',
      justifyContent: 'center',
      marginBottom: '5%',
    },
    checkContainer:{
      height: '100%',
      width: '40%',
    //  backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 70,
      marginLeft: '15%',
    },
    setMarkContainer: {
      height: '100%',
      width: '40%',
    //  backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 70,
    },
    btn: {
        position: 'absolute',
        width: '130%',
        height: '130%',
        zIndex: 2,
    },
    mapContainer: {
        width: '90%',
        height: '45%',
        backgroundColor: 'blue',
        borderRadius: 20,
        overflow: 'hidden',
        zIndex: 1,
       // marginBottom: '%',
        borderWidth: 5,
    },
    mapCenterMarkerView: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",

    },
    footer: {
      flex: 1,
      height: '20%',
    //  backgroundColor: 'blue',
      width: '100%',
      zIndex: 3,
     // marginTop: '5%',
      alignItems: 'center',
      justifyContent: 'top',
      padding: 20,
      
    },
    question:{
      fontFamily: 'Dong',
      fontSize: 25,
      textAlign: 'center',
      color: '#232324',

    },
    arrowContainer: {
     // backgroundColor: 'green',
      width: '12%',
      height: '15%',
      marginTop: '8%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrow: {
      width: '100%',
      height: '100%',
    },
    distanceContainer:{
      position: 'absolute',
      height: '8%',
      width: '90%',
      marginLeft: '5%',
     // backgroundColor: 'white',
      //alignItems: "center",
      justifyContent: 'center',
      marginTop: '3%',
    },
    distance: {
      fontWeight: 'bold',
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
    },
    pointsContainer: {
      flexDirection: 'row',
      height: '15%',
      width: '100%',
     // backgroundColor: 'yellow',
      marginTop: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    pointsLbl: {
      fontFamily: 'Dong',
      fontSize: 25,
    },
    points: {
      fontSize: 25,
      textAlign: 'center',
      color: '#232324',
      marginLeft: '3%',
    },

});

export default HomeScreen;