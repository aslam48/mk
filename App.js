import '@azure/core-asynciterator-polyfill'; 
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { DataStore } from "aws-amplify";
import { Post } from './src/models';
import { useEffect, useState } from 'react';


import { Amplify } from 'aws-amplify';
import awsConfig from './src/aws-exports';
Amplify.configure(awsConfig);



export default function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);


  const fetchTodos = async () => {
    const data = await DataStore.query(Post);
    setTodos(data);
    console.log("feching data", data)
  };

 
  async function PostQuery(data){
    await DataStore.save(new Post(data))
  }

  const handleSubmit =  () => {
    // const newTodo = await DataStore.save(
    //   new Todo({
    //     title,
    //     description,
    //     completed: false,
    //   })
    // );
    // setTodos([...todos, newTodo]);
    // setTitle("");
    // PostQuery(newTodo)


   const data = {
    title,
    description,
    completed: false
   }
    setTodos([...todos, data]);
   PostQuery(data)
   setTitle("")
   setDescription("")
  }


  // const addTodo = async () => {
  //   const newTodo = await DataStore.save(
  //     new Todo({
  //       title: "aslam",
  //       description,
  //       completed: false,
  //     })
  //   );
  //   setTodos([...todos, newTodo]);
  //   setTitle("");
  //   setDescription("");

    // const newTodo = await DataStore.save(
    //   new Todo({
    //     title,
    //     // description,
    //   })
    // );
    // console.log('Created todo:', newTodo);
    // setTitle("")
  // };

  return (
    <View style={styles.container}>
      <Text>Create your post</Text>
      <StatusBar style="auto" />
      <TextInput style={{borderBottomWidth:1, width: "50%", borderColor:"#111", marginTop: 5}}
             placeholder="Enter title"
             value={title}
             onChangeText={setTitle}     
      />

<TextInput style={{borderBottomWidth:1, width: "50%", borderColor:"#111", marginTop: 10}}
             placeholder="Enter description"
             value={description}
             onChangeText={setDescription}     
      />
      <Button style={styles.btn} onPress={handleSubmit} title='post'/>

      {todos.map((todo) => (
        <View>
        <Text key={todo.id}>{todo.title}</Text>
        <Text key={todo.id}>{todo.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 10
  }
});






































// import { Amplify } from 'aws-amplify';
// import awsConfig from './src/aws-exports';
// Amplify.configure(awsConfig);



// export default function App() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     fetchTodos();
//   }, []);


//   const fetchTodos = async () => {
//     const todos = await DataStore.query(Todo);
//     setTodos(todos);
//   };

//   const addTodo = async () => {
    // const newTodo = await DataStore.save(
    //   new Todo({
    //     title: "aslam",
    //     description,
    //     completed: false,
    //   })
    // );
    // setTodos([...todos, newTodo]);
    // setTitle("");
    // setDescription("");

//   };

//   return (
//     <View style={styles.container}>
//       <Text>Create your post</Text>
//       <StatusBar style="auto" />
//       <TextInput style={{borderBottomWidth:1, width: "50%", borderColor:"#111", marginTop: 5}}
//              placeholder="Enter title"
//              value={title}
//              onChangeText={setTitle}     
//       />
//       <Button style={styles.btn} onPress={addTodo} title='post'/>

//       {todos.map((todo) => (
//         <Text key={todo.id}>{todo.title}</Text>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   btn: {
//     marginTop: 10
//   }
// });