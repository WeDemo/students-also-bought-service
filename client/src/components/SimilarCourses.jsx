import React from 'react';
import styles from './styles.css';

// props is object with key list = [{}, ...]
const SimilarCourses = (props) => (
	<div id={styles.similarCoursesComp}>
		<div className={styles.courseRecommendations}>
			<div className={styles.courseTitle}>Students Also Bought</div>
		  { props.courses.map(course => (<div key={course.id}>
		  	<div>
		  		<div className={styles.similarCourseItemContentContainer}>
		  			<div className={styles.similarCourseImageContainer}>
		  				<img className={styles.courseItemImg} src={course.image_url} alt={course.name}></img>
		  				<span className={styles.lectureTime}>{course.lecture_time} hours</span>
		  			</div>
		  			<div className={styles.similarCourseItemInfoContainer}>
		  				<div className={styles.similarCourseSubtitleContainer}>
		  					<div className={styles.similarCourseName}>{course.name}</div>
		  					<div className={styles.lastUpdateTime}>Updated {course.last_update_month}/{course.last_update_year}</div>
		  				</div>
				      <div className={styles.similarCourseOtherInfoContainer}>
				      	<span className={styles.similarCourseRating}>
				      		<img className={styles.starIconImg} src="https://s3-us-west-1.amazonaws.com/fecpics/star-icon.png"></img>
				      		<span className="star-rating-score">{course.average_rating}</span>
				      	</span>
				      	<span className={styles.similarCoursePurchaseCount}>
				      		<img className={styles.PurchaseIconImg} src="https://s3-us-west-1.amazonaws.com/fecpics/purchase-order-icon.png"></img>
				      		<span className="purchase-count">{course.purchase_count}</span>
				      	</span>
				      	<div className={styles.similarCoursePriceContainer}>
				    		  <div className={styles.similarCourseSalesPrice}>
				    		  	<span className={styles.sourceOnly}>current price</span>
				    		  	<span>
				    		  		<span>${course.sales_price}.00</span>
				    		  	</span>
				    		  </div>
				    		  <div className={styles.similarCourseRegPrice}>
				    		  	<span className={styles.sourceOnly}>original price</span>
				    		  	<s className={styles.s} >
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
