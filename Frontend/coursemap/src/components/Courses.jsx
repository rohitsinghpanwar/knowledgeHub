import React, { useState, useEffect } from 'react';

function CoursesPage() {
  // Load initial courses from localStorage or use default if not present
  const loadCoursesFromLocalStorage = () => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses
      ? JSON.parse(savedCourses)
      : [
          { title: 'HTML Course(Code with Harry)', url: 'https://www.youtube.com/embed/BsDoLVMnmZs?si=Jc7zG8TZPtnyAT0S', reviews: [] },
          { title: 'Javascript Course(Chai aur Code)', url: 'https://www.youtube.com/embed/sscX432bMZo?si=r6ups8ysSyNgq3p3', reviews: [] },
          { title: 'React.js(Chai aur Code)', url: 'https://www.youtube.com/embed/FxgM9k1rg0Q?si=yYUi0LW0esIDMiqy', reviews: [] },
          { title: 'C language(Code with Harry)', url: 'https://www.youtube.com/embed/ZSPZob_1TOk?si=MV3OYKDk8_RiIWL8', reviews: [] },
          { title: 'SQL(Freecodecamp)', url: 'https://www.youtube.com/embed/HXV3zeQKqGY?si=cQB_QLTDtQ6dS4z-', reviews: [] },
        ];
  };

  const [courses, setCourses] = useState(loadCoursesFromLocalStorage());
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseURL, setNewCourseURL] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);

  // Save courses to localStorage whenever the courses state changes
  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  // Handle form submission to add a new course
  const addCourse = (e) => {
    e.preventDefault();
    if (newCourseTitle && newCourseURL) {
      const newCourse = { title: newCourseTitle, url: newCourseURL, reviews: [] };
      setCourses([...courses, newCourse]);
      setNewCourseTitle('');
      setNewCourseURL('');
    }
  };

  // Handle course deletion
  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);
  };

  // Handle review deletion
  const deleteReview = (courseIndex, reviewIndex) => {
    const updatedCourses = [...courses];
    updatedCourses[courseIndex].reviews.splice(reviewIndex, 1); // Remove the review from the array
    setCourses(updatedCourses);
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a review (rating and review text)
  const addReview = (index) => {
    if (newReviewText && newRating) {
      const updatedCourses = [...courses];
      // Ensure the reviews array exists before pushing a new review
      if (!updatedCourses[index].reviews) {
        updatedCourses[index].reviews = [];
      }
      updatedCourses[index].reviews.push({ rating: newRating, reviewText: newReviewText });
      setCourses(updatedCourses);
      setNewReviewText('');
      setNewRating(5); // Reset rating
      setSelectedCourseIndex(null); // Close the review form
    }
  };

  // Calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-10">Recommended Courses</h1>

      {/* Search Bar */}
      <div className="mb-6 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search for a course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredCourses.map((course, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              className="w-full h-64"
              src={course.url}
              title={course.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-gray-600">Average Rating: {calculateAverageRating(course.reviews)} / 5</span>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => deleteCourse(index)}
                >
                  Delete
                </button>
              </div>

              {/* Reviews */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Reviews</h3>
                <div className="space-y-4 mt-2">
                  {course.reviews && course.reviews.map((review, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">Rating:</span>
                        <span className="text-indigo-600">{review.rating} / 5</span>
                      </div>
                      <p className="mt-2 text-gray-700">{review.reviewText}</p>
                      <button
                        onClick={() => deleteReview(index, idx)}
                        className="text-red-600 hover:text-red-800 mt-2"
                      >
                        Delete Review
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Review Button */}
              <button
                onClick={() => setSelectedCourseIndex(index)}
                className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition duration-300"
              >
                Add Review
              </button>

              {/* Add Review Form */}
              {selectedCourseIndex === index && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <input
                    type="text"
                    placeholder="Your review"
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex items-center space-x-4 mt-4">
                    <span className="font-semibold">Rating:</span>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setNewRating(rating)}
                        className={`${
                          newRating === rating ? 'bg-indigo-600' : 'bg-gray-300'
                        } text-white py-1 px-2 rounded-md text-sm mr-2 hover:bg-indigo-700`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => addReview(index)}
                    className="mt-4 w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 transition duration-300"
                  >
                    Submit Review
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Your Own Course Section */}
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mb-10">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Add Your Own Course</h2>
        <form onSubmit={addCourse} className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="url"
            placeholder="Course URL"
            value={newCourseURL}
            onChange={(e) => setNewCourseURL(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition duration-300"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default CoursesPage;
