import React from 'react';
import styles from './styles.css';

const SimilarCourses = ({ courses }) => {
  // console.log(courses);
  return (
    <div id={styles.similarCoursesComp}>
      <div className={styles.courseRecommendations}>
        <div className={styles.courseTitle}>Students Also Bought</div>
        {courses.map(course => (
          <div key={course.id.low}>
            <div>
              <div className={styles.similarCourseItemContentContainer}>
                <div className={styles.similarCourseImageContainer}>
                  <img
                    className={styles.courseItemImg}
                    src={course.imageUrl}
                    alt={course.courseTitle}
                  />
                  <span className={styles.lectureTime}>
                    {course.lectureLength}
                    {' '}
hours
                  </span>
                </div>
                <div className={styles.similarCourseItemInfoContainer}>
                  <div className={styles.similarCourseSubtitleContainer}>
                    <div className={styles.similarCourseName}>{course.courseTitle}</div>
                    <div className={styles.lastUpdateTime}>
                      Updated
                      {' '}
                      {course.lastUpdatedMonth.low}
/
                      {course.lastUpdatedYear.low}
                    </div>
                  </div>
                  <div className={styles.similarCourseOtherInfoContainer}>
                    <span className={styles.similarCourseRating}>
                      <img
                        className={styles.starIconImg}
                        src="https://s3-us-west-1.amazonaws.com/fecpics/star-icon.png"
                      />
                      <span className="star-rating-score">{course.averageRating}</span>
                    </span>
                    <span className={styles.similarCoursePurchaseCount}>
                      <img
                        className={styles.PurchaseIconImg}
                        src="https://s3-us-west-1.amazonaws.com/fecpics/purchase-order-icon.png"
                      />
                      <span className="purchase-count">{course.numberOfStudentsEnrolled.low}</span>
                    </span>
                    <div className={styles.similarCoursePriceContainer}>
                      <div className={styles.similarCourseSalesPrice}>
                        <span className={styles.sourceOnly}>current price</span>
                        <span>
                          <span>
                            $
                            {course.salesPrice}
                            .00
                          </span>
                        </span>
                      </div>
                      <div className={styles.similarCourseRegPrice}>
                        <span className={styles.sourceOnly}>original price</span>
                        <s className={styles.s}>
                          <span>
                            $
                            {course.regularPrice}
                            .00
                          </span>
                        </s>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarCourses;
