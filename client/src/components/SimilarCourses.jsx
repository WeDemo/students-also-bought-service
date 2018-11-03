import React from 'react';

// props is object with key list = [{}, ...]
const SimilarCourses = (props) => (
	<div className="SimilarCourse">
	  { props.courses.map(course => (<div key={course.id}>
	      <div className="similar-course-name"> {course.name } </div>
	      <div className="similar-course-rating"> {course.average_rating} </div>
	      <div className="similar-course-reg-price"> {course.regular_price} </div>
	      <div className="similar-course-sales-price"> {course.sales_price} </div>
	      <img className="similar-course-image-url" src={course.image_url}></img>
	    </div>)
	  )}
	</div>
);

export default SimilarCourses;
