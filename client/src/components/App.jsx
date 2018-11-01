import React from 'react';
import $ from 'jquery';
import SimilarCourses from './SimilarCourses.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    }

    this.retrieveFromDB = this.retrieveFromDB.bind(this);
  }

  // retrieveFromDB(event) {
  //   event.preventDefault();
  //   console.log('this is this.state ', this.state);
  //   console.log('hello from here in db');
  
  //   fetch('http://localhost:3000/input', {
  //     method: 'GET',
  //     headers : {
  //       'content-type': 'application/json'
  //     },
  //     body: JSON.stringify(this.state)
  //   })
  //   .then(res => res.text())
  //   .then(response => console.log('Success:', response))
  // }

  componentDidMount() {
    this.retrieveFromDB();
  }

  retrieveFromDB() {
    $.ajax('/input', {
      success: (courses) => {
        this.setState({courses});
      }
    })
  }


  // retrieveFromDB() {
  //   const url = 'http://localhost:3000/input';

  //   fetch(url)
  //   .then(function(resp) {
  //     // console.log('this is the response ', resp);
  //     resp.json()
  //   })
  //   .then(function(data) {
  //     // Create and append the li's to the ul
  //     // console.log('this is data ', data);
  //   })
  //   .catch(function(error) {
  //     // If there is any error you will catch them here
  //     console.log(error);
  //   });   
  // }


  render() {
    return (
      <div>
        <h1> Similar Courses </h1>
          <SimilarCourses courses={this.state.courses}/>
      </div>
    )
  }
}

export default App;