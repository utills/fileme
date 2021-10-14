import React, { useState,useEffect } from 'react';
import { View, Text, Button,Modal, TextInput,Dimensions,FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import fs from 'react-native-filesystem';
import { file } from '@babel/types';
const FileManager = require("./fileManager");
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const sample = [{"ctime": "2021-10-14T04:44:14.813Z", "isDirectory": true, "isFile": true, "mtime": "2021-10-14T04:44:14.813Z", "name": "Test", "path": "/Users/viveksingh/Library/Developer/CoreSimulator/Devices/5D1B0542-DD29-41EA-97AA-486AAF64ACD6/data/Containers/Data/Application/1A57272E-E9FB-464B-97A9-C1BEF54EF770/Documents/Test", "size": 26}, {"ctime": "2021-10-14T04:21:17.212Z", "isDirectory": true, "isFile": true, "mtime": "2021-10-14T04:21:17.212Z", "name": "Dfsds.txt", "path": "/Users/viveksingh/Library/Developer/CoreSimulator/Devices/5D1B0542-DD29-41EA-97AA-486AAF64ACD6/data/Containers/Data/Application/1A57272E-E9FB-464B-97A9-C1BEF54EF770/Documents/Dfsds.txt", "size": 26}]

function HomeScreen({ navigation }) {
  const [files, setFiles] = useState(sample);
  useEffect(() => {
    FileManager.readDirectory("",(fileAndFolder)=>{
      if(fileAndFolder && (files.length < 1) && fileAndFolder.length > 0){
        console.log("xxxx result",fileAndFolder);
        setFiles(fileAndFolder);
      }
      
  })
  })
    
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        data={files || []}
        renderItem={(item,index)=>{
          return(
          <View style={{flex:0,minWidth:"100%",minHeight:20,backgroundColor:"gray",margin:4}}>
            <Button
                          onPress={() => {
                            /* 1. Navigate to the Details route with params */
                            navigation.navigate('Details', {
                              file: item.item
                                                        });
                          }}
                          title={item.item.name}
                          color="green"
                        />
        </View>
        )
          
        }}
        keyExtractor={item => item.path}
      />

    </View>
  );
}

function DetailsScreen(file) {
  const [setFiles, setPath] = useState(0);
    FileManager.readDirectory(file.path,(files)=>{
        console.log("xxxx",files);
        setFiles(files);
    })
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }




const Stack = createNativeStackNavigator();

function App() {
    const [isModalVisible,showModal] = useState(false);
    const [files,setFiles] = useState([]);
    const [path,setPath] = useState("");
    const [fileName,setFileName] = useState("");
    
    // useEffect(() => {
    //   FileManager.readDirectory(path,(files)=>{
    //     console.log("xxxx",files);
    //     if(files && files.length > 0){
    //       setFiles(files);
    //     }
    // })
    // });
  return (
      <View style={{width:"100%",height:"100%"}}>
       <Modal
      animationType="slide"
      transparent={true}
      onBackdropPress={() => console.log('Pressed')}
      visible={isModalVisible}
      onRequestClose={()=>{setFileName("")}}
      >
      <View
        style={{
          position:"absolute",
          top:(windowHeight/2)-100,
          left:(windowWidth/2)-100,
          backgroundColor: 'white',
          width:  200,
          height:  100,
        }}>
        
       <Text>Please enter file name and extenssion {windowHeight}</Text>
       <TextInput 
       placeholder="FileName.txt" 
       value={fileName} 
       onChangeText={setFileName}>
       </TextInput>
        <Button
        title="Create"
        color="green"
        onPress={()=>{
          if(path && path != ""){

          }else{
            showModal(false)
            FileManager.createFile(fileName,"",()=>{
              setFileName("")
              FileManager.readDirectory(path,(files)=>{
                console.log("xxxx",files);
                if(files && files.length > 0){
                  setFiles(files);
                }
            })
            })
          }
          
        }}
        >

        </Button>
      </View>
    </Modal>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} 
                    options={{
                      headerTitle: props => <Text>Home</Text>,
                      headerRight: () => (
                        <Button
                          onPress={() => showModal(true)}
                          title="Add"
                          color="green"
                        />
                      ),
                    }}
                    />
                    <Stack.Screen name="Details" component={DetailsScreen}
                    options={{
                      headerTitle: props => <Text></Text>,
                      headerRight: () => (
                        <Button
                          onPress={() => showModal(true)}
                          title="Add"
                          color="green"
                        />
                      ),
                    }}
                     />
            </Stack.Navigator>
        </NavigationContainer>
      </View>
  );
}

export default App;