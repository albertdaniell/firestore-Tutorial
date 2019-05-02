import React, {Component} from 'react';
import firebase from 'firebase'
import {Link} from 'react-router-dom';
import Appnav from './components/Nav'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAMk0KOgodH93bJULkgl6nyrWepD1wQ2Gs",
    authDomain: "fir-app-4bca0.firebaseapp.com",
    databaseURL: "https://fir-app-4bca0.firebaseio.com",
    projectId: "fir-app-4bca0",
    storageBucket: "fir-app-4bca0.appspot.com",
    messagingSenderId: "708634132259"
};
firebase.initializeApp(config);

const db = firebase.firestore();

class App extends Component {

    componentDidMount() {
        this.getData()
    }

    addData = () => {
        db
            .collection("users")
            .add({first: "Lalamika", last: "Lovelace", born: 1815})
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }

    getData = () => {
        db
            .collection("users")
            .get()
            .then((querySnapshot) => {
                const users = [];

                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);  console.log(doc.data())
                    // this.setState({     users: JSON.stringify(doc.data()) })
                    // console.log(doc.data().first)

                    const {first, email, born, last} = doc.data()
                    users.push({
                        key: doc.id,
                        doc,
                        first,
                        email,
                        born,
                        last
                    })
                    this.setState({isLoading: '', users})

                    // this.setState({   data:doc.data().first }) console.log(this.state.data)
                    // alert(this.state.users.first)
                });

            })
            .catch(error => {
                this.setState({isLoading: 'Error occured!'})

                console.log(error)
            });

    }

    queryData = () => {
        // Create a reference to the cities collection
        var citiesRef = db.collection("users");

        var query = citiesRef.where("first", "==", "Ada");
        //console.log(query)

        query
            .get()
            .then(function (doc) {
                console.log(doc.id)
            })
            .catch(error => {
                console.log(error)
            });

    }

    constructor(props) {

        super(props);
        this.state = {
            users: [],
            data: [],
            isLoading: 'Please wait...',
            docId:''
        }

    }

    render() {

        let userArray = this.state.users
        // let dataArray=this.state.data let usersArray=this.state.users.map(data=>{
        // return(     <li key='data.id'>     data.data().first     </li>   ) });

        return (
            <div className="App">
                <Appnav></Appnav>
                <div className="container">
                    <h1>This is a tutorial by firestore</h1>

                    <h1>Users</h1>

                    {/* <button onClick={this.addData}>haah</button> */}
                    {/* {userArray.first} */}
                    {/* {dataArray.map((d)=>
  <li>{d}</li>
)

} */}

                    {this.state.isLoading}
                    <br/> {userArray.map(user => {
                        return (
                            <div className='myList' key='user.key'>
                                <span className='myListContent'>
                                    <strong>{user.first}</strong>
                                    {user.last}
                                    <br/>
                                    <Link to={`/view/${user.key}`} className='myeyelink'>
                                        <span class="fa fa-eye"></span>
                                        View
                                    </Link>
                                </span>
                            </div>
                        )
                    })
}

                    {/*
<button onClick={this.getData}>Get data</button>
<button onClick={this.queryData}>Query data</button> */}

                </div>
            </div>
        );
    }

}

export default App;
