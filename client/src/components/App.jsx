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

  componentDidMount() {
    this.retrieveFromDB();
  }

  retrieveFromDB() {

    fetch('/input')
    .then(stream => stream.json())
    .then((courses) => {
      console.log(courses);
      this.setState({ courses: courses });
    })
  }

  //   $.ajax('/input', {
  //     success: (courses) => {
  //       this.setState({courses});
  //     }
  //   })
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