import React from 'react';
import axios from 'axios';
import SimilarCourses from './SimilarCourses.jsx';
import styles from './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };

    // this.retrieveFromDB = this.retrieveFromDB.bind(this);
    this.handleSeeMoreButtonClick = this.handleSeeMoreButtonClick.bind(this);
    this.handleSeeLessButtonClick = this.handleSeeLessButtonClick.bind(this);
  }

  componentDidMount() {
    const id = window.location.pathname.split('/')[2];

    axios.get(`/courses/${id}/recommendedCourses`).then((courses) => {
      this.setState({
        courses: courses.data,
      });
    });
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
    console.log(this.state);
    const { courses } = this.state;
    return courses.length ? (
      <div className={styles.body}>
        <SimilarCourses courses={courses} />
        <button type="button" id={styles.viewMoreButton} onClick={this.handleSeeMoreButtonClick}>
          + See More
        </button>
        <button type="button" id={styles.viewLessButton} onClick={this.handleSeeLessButtonClick}>
          - See Less
        </button>
      </div>
    ) : (
      ''
    );
  }
}

export default App;
