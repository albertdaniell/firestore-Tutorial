import React, {Component} from 'react';
import firebase from 'firebase'
import {Link} from 'react-router-dom';
import Appnav from './Nav'

const db = firebase.firestore()

export default class View extends Component {

    constructor(props) {
        super(props)
        this.state = {
            key: '',
            isLoading: 'Loading...',
            lname: '',
            fcolor: '',
            yob: '',
            age: '',
            dataLoaded: false,
            postText: '',
            userid: this.props.match.params.id,
            posts: [],
            postsPresent: false,
            message: '',
            showAlert: false,
            showSendButton: true

        }
    }

    getPosts = () => {
        db
            .collection("users")
            .doc(this.state.userid)
            .collection('posts')
            .get()
            .then((querySnapshot) => {
                const posts = [];

                querySnapshot.forEach((doc) => {
                    // console.log(`${doc.id} => ${doc.data()}`);  console.log(doc.data())
                    // this.setState({     users: JSON.stringify(doc.data()) })
                    // console.log(doc.data().first)

                    const {post} = doc.data()
                    posts.push({key: doc.id, doc, post})
                    this.setState({isLoading: '', posts})

                    if (posts === null) {
                        this.setState({postsPresent: false})
                    } else {

                        this.setState({postsPresent: true})
                    }

                    console.log(posts)

                    // this.setState({   data:doc.data().first }) console.log(this.state.data)
                    // alert(this.state.users.first)
                });

            })
            .catch(error => {
                this.setState({isLoading: 'Error occured!'})

                console.log(error)
            });

    }

    componentDidMount() {
        console.log("page loaded")
        this.getPosts();
        const ref = db
            .collection('users')
            .doc(this.props.match.params.id);
        ref
            .get()
            .then(doc => {

                console.log(doc.data().first)
                if (doc.exists) {
                    this.setState({
                        dataLoaded: true,
                        isLoading: '',
                        key: doc
                            .data()
                            .id,
                        fname: doc
                            .data()
                            .first,
                        lname: doc
                            .data()
                            .last,
                        fcolor: doc
                            .data()
                            .favourite_color,
                        yob: doc
                            .data()
                            .born

                    })
                } else {
                    alert("N such doc")
                    console.log("No such documnet")
                }
            })
            .catch(error => {
                this.setState({isLoading: 'Error...'})
                console.log(error)
            })

    }

    getPostInput = (event) => {
        this.setState({postText: event.target.value})
    }

    addPost = (event) => {
        this.setState({showSendButton: false})

        event.preventDefault()

        if (this.state.postText === '') {
            alert("Field cannot be empty")
            this.setState({showSendButton: true})
            return 0
        }

        var postref = db
            .collection('users')
            .doc(this.state.userid)

        var postref2 = postref.collection('posts')

        postref2
            .add({post: this.state.postText})
            .then(() => {
                this.getPosts();

                this.setState({message: 'Post added successfully!', showAlert: true})
                //alert("Awesome!!!")

                setTimeout(() => {
                    this.setState({postText: '', showSendButton: true})

                }, 1000)
            })

        // return postref.update({     post:this.state.postText }).then(()=>{
        // console.log("Post has been added") })

    }
    render() {

        return (
            <div>
                <Appnav></Appnav>

                <div className="container">

                    <br/>
                    Viewing user with id  
                    <br/>
                    <span className="badge"> {this.props.match.params.id}</span>
                    <br></br>

                    {this.state.isLoading}

                    <div className="row">
                        {this.state.dataLoaded
                            ? <div>
                                    <div className="col-sm-6">
                                        <h3>{this.state.fname} {this.state.lname}</h3>

                                        <h5>Latest Posts</h5>

                                        <hr></hr>
                                        {this.state.postsPresent
                                            ? <p></p>
                                            : <p>No posts by this user</p>
}

                                        {this
                                            .state
                                            .posts
                                            .map((post) => {
                                                return (
                                                    <div className="mypostList">
                                                        <p>
                                                            {post.post}
                                                        </p>

                                                    </div>
                                                )
                                            })
}
                                    </div>
                                    <div className="col-sm-6">
                                        <h4>Year of birth: {this.state.yob}
                                        </h4>
                                        <h4>Fav Color: {this.state.fcolor}
                                        </h4>

                                        <br></br>
                                        {this.state.showAlert
                                            ? <div class="alert alert-success">
                                                    {this.state.message}
                                                </div>
                                            : null
}

                                        <h4>Add Post (What you feel)</h4>
                                        <form action="">

                                           

                                            {this.state.showSendButton
                                                ? <div>
                                                <div className="form-group">
                                                <textarea
                                                    onChange={this.getPostInput}
                                                    value={this.state.postText}
                                                    className='form-control'
                                                    name=""
                                                    id=""
                                                    cols="20"
                                                    rows="5"></textarea>
                                            </div>
                                                        <button className='btn btn-primary' onClick={this.addPost}>Add post</button>

                                                    </div>
                                                : 
                                                <div>
                                                <div className="form-group">
                                                <textarea
                                                disabled
                                                    onChange={this.getPostInput}
                                                    value={this.state.postText}
                                                    className='form-control'
                                                    name=""
                                                    id=""
                                                    cols="20"
                                                    rows="5"></textarea>
                                            </div>

                                            <button className='btn btn-primary' disabled>Add post</button>

                                                </div>
                                                
                                                
}

                                        </form>

                                    </div>

                                    <br/>

                                </div>
                            : null
}
                    </div>
                </div>
            </div>
        )
    }
}