import React from 'react';
import styles from './styles.css';

// props is object with key list = [{}, ...]
const SimilarCourses = (props) => (
	<div className="similar-courses-component">
		<div className="course-recommendations">
			<div className="course-title">Students Also Bought</div>
		  { props.courses.map(course => (<div key={course.id}>
		  	<div>
		  		<div className="similar-course-item-content-container">
		  			<div className="similar-course-image-container">
		  				<img className="course-item-img" src={course.image_url} alt={course.name}></img>
		  				<span className="lecture-time">{course.lecture_time} hours</span>
		  			</div>
		  			<div className="similar-course-item-info-container">
		  				<div className="similar-course-subtitle-container">
		  					<div className="similar-course-name">{course.name}</div>
		  					<div className="last-update-time">Updated {course.last_update_month}/{course.last_update_year}</div>
		  				</div>
				      <div className="similar-course-other-info-container">
				      	<span className="similar-course-rating">
				      		<img className="star-icon-img" src="https://s3-us-west-1.amazonaws.com/fecpics/star-icon.png"></img>
				      		<span className="star-rating-score">{course.average_rating}</span>
				      	</span>
				      	<span className="similar-course-purchase-count">
				      		<img className="purchase-icon-img" src="https://s3-us-west-1.amazonaws.com/fecpics/purchase-order-icon.png"></img>
				      		<span className="purchase-count">{course.purchase_count}</span>
				      	</span>
				      	<div className="similar-course-price-container">
				    		  <div className="similar-course-sales-price">
				    		  	<span className="source-only">current price</span>
				    		  	<span>
				    		  		<span>${course.sales_price}.00</span>
				    		  	</span>
				    		  </div>
				    		  <div className="similar-course-reg-price">
				    		  	<span className="source-only">original price</span>
				    		  	<s>
				    		  		<span>${course.regular_price}.00</span>
				    		  	</s>
				    		  </div>
				      	</div>
				      </div>  
			      </div>
		      </div>
		    </div>
		  </div>)
			)}
		</div>
	</div>
);

export default SimilarCourses;
