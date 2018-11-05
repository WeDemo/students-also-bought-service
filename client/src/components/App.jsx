import React from 'react';
import $ from 'jquery';
import SimilarCourses from './SimilarCourses.jsx';
import styles from './styles.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      courseId: 18,
    }

    this.retrieveFromDB = this.retrieveFromDB.bind(this);
    this.handleSeeMoreButtonClick = this.handleSeeMoreButtonClick.bind(this);
    this.handleSeeLessButtonClick = this.handleSeeLessButtonClick.bind(this);
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

  handleSeeMoreButtonClick() {
    document.getElementById(styles.similarCoursesComp).style.height = 'auto';
    document.getElementById(styles.viewMoreButton).style.display = 'none';
    document.getElementById(styles.viewLessButton).style.display = 'inline-block';
  }

  handleSeeLessButtonClick() {
    document.getElementById(styles.similarCoursesComp).style.height = '900px';
    document.getElementById(styles.viewMoreButton).style.display = 'inline-block';
    document.getElementById(styles.viewLessButton).style.display = 'none';
  }

  render() {
    return (
      <div className={styles.body} >
        <SimilarCourses courses={this.state.courses}/>
        <button type ="button" id={styles.viewMoreButton} onClick={this.handleSeeMoreButtonClick}>+ See More</button>
        <button type ="button" id={styles.viewLessButton} onClick={this.handleSeeLessButtonClick}>- See Less</button>
      </div>
    )
  }
}

export default App;