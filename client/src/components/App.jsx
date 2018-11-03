import React from 'react';
import $ from 'jquery';
import SimilarCourses from './SimilarCourses.jsx';
import styles from './styles.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      courseId: 88,
    }

    this.retrieveFromDB = this.retrieveFromDB.bind(this);
  }

  componentDidMount() {
    this.retrieveFromDB();
  }

  retrieveFromDB() {
    // console.log('this is the courseId', this.state.courseId)
    let url = '/Courses/' + this.state.courseId + '/similarcourses'

    fetch(url)
    .then(stream => stream.json())
    .then((courses) => {
      // console.log('this is courses', courses);
      this.setState({ 
        courses: courses,
        courseId: courses.id,
      });
    })
  }

  render() {
    return (
      <div className={styles.body} >
        <SimilarCourses courses={this.state.courses}/>
      </div>
    )
  }
}

export default App;