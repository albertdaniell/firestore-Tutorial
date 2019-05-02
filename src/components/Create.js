import React, {Component} from 'react';
import firebase from 'firebase'
import {Link} from 'react-router-dom';
import Appnav from './Nav'
import {runInThisContext} from 'vm';

const db = firebase.firestore();

export default class Creare extends Component {

    constructor(props) {

        super(props)
        this.state = {
            fname: null,
            lname: null,
            yob: null,
            favcolor: null,
            isLoading: '',
            haveSubmitted: '',
            userAdded: true,
            docId: ''
        }
    }

    getFname = (event) => {

        this.setState({fname: event.target.value})
        console.log(this.state.fname)
    }

    getLname = (event) => {

        this.setState({lname: event.target.value})
        console.log(this.state.lname)
    }

    getyob = (event) => {

        this.setState({yob: event.target.value})
        console.log(this.state.yob)
    }
    getFcolor = (event) => {

        this.setState({favcolor: event.target.value})
        console.log(this.state.favcolor)
    }

    addData = (event) => {
        // alert(0)
        event.preventDefault()

        if (this.state.fname === null || this.state.lname === null || this.state.favcolor === null || this.state.yob === null) {
            alert("Inputs should not be empty");
            return 0;
        } else {
            db
                .collection("users")
                .add({first: this.state.fname, last: this.state.lname, born: this.state.yob, favourite_color: this.state.favcolor})
                .then(function (docRef) {
                    alert("Data added successfully!")
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });

        }

    }

    adddPost = () => {}

    componentDidMount() {}
    render() {

        return (
            <div>
                <Appnav></Appnav>
                <div className="container">
                    <h2>
                        Create a user
                    </h2>

                    {this.state.userAdded
                        ? <Link to={`/view/${this.state.docId}`}></Link>
                        : null
}

                    <div className="row">
                        <div className="col-sm-12">
                           <div className="col-sm-3"></div>
                           <div className="col-sm-6">
                           <form onSubmit={this.addData}>
                                <div class="form-group">
                                    <label for="email">First name:</label>
                                    <input
                                        type='text'
                                        value={this.state.fname}
                                        onChange={this.getFname}
                                        class="form-control"
                                        id="email"/>
                                </div>

                                <div class="form-group">
                                    <label for="email">Last name:</label>
                                    <input
                                        value={this.state.lname}
                                        onChange={this.getLname}
                                        type='text'
                                        class="form-control"
                                        id="email"/>
                                </div>

                                <div class="form-group">
                                    <label for="email">Year of birth:</label>
                                    <input
                                        value={this.state.yob}
                                        onChange={this.getyob}
                                        type='number'
                                        min='0'
                                        class="form-control"
                                        id="email"/>
                                </div>
                                


                                <div class="form-group">
                                    <label for="email">Favourite color:</label>
                                    <input
                                        value={this.state.favcolor}
                                        onChange={this.getFcolor}
                                        type='text'
                                        class="form-control"
                                        id="email"/>
                                </div>

                                <button type="submit" onClick={this.addData} class="btn btn-default">Submit</button>
                            </form>
                           </div>
                           <div className="col-sm-3"></div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}