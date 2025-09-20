import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const CourseMapper = () => {
  const { quizResults, preferences } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const streams = [
    { value: 'all', label: 'All Streams' },
    { value: 'science', label: 'Science' },
    { value: 'arts', label: 'Arts' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'vocational', label: 'Vocational' }
  ];

  const courses = [
    {
      id: 1,
      name: 'Bachelor of Science (B.Sc.)',
      stream: 'science',
      duration: '3 years',
      description: 'A comprehensive undergraduate degree covering various scientific disciplines',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
      careerPaths: [
        {
          title: 'Research Scientist',
          description: 'Conduct research in various scientific fields',
          salary: '₹4-8 LPA',
          requirements: 'M.Sc. or Ph.D. preferred'
        },
        {
          title: 'Data Analyst',
          description: 'Analyze data to help organizations make decisions',
          salary: '₹3-6 LPA',
          requirements: 'Additional certification in data science'
        },
        {
          title: 'Teacher/Professor',
          description: 'Educate students in science subjects',
          salary: '₹3-7 LPA',
          requirements: 'B.Ed. for school teaching, NET for college'
        },
        {
          title: 'Lab Technician',
          description: 'Work in laboratories conducting experiments',
          salary: '₹2-4 LPA',
          requirements: 'Specialized training in lab techniques'
        }
      ],
      higherEducation: [
        'M.Sc. in specialized subjects',
        'M.Tech in Engineering',
        'MBA for management roles',
        'Ph.D. for research careers'
      ],
      governmentExams: [
        'UPSC Civil Services',
        'SSC Combined Graduate Level',
        'Banking Exams (IBPS, SBI)',
        'Railway Recruitment Board',
        'State PSC Exams'
      ],
      skills: ['Analytical Thinking', 'Research', 'Data Analysis', 'Problem Solving'],
      difficulty: 'Medium',
      popularity: 'High'
    },
    {
      id: 2,
      name: 'Bachelor of Arts (B.A.)',
      stream: 'arts',
      duration: '3 years',
      description: 'A versatile degree covering humanities, social sciences, and languages',
      subjects: ['History', 'Political Science', 'Economics', 'Psychology', 'Literature'],
      careerPaths: [
        {
          title: 'Civil Services Officer',
          description: 'Serve in various government departments',
          salary: '₹5-12 LPA',
          requirements: 'UPSC Civil Services Exam'
        },
        {
          title: 'Journalist',
          description: 'Report news and create content for media',
          salary: '₹2-6 LPA',
          requirements: 'Mass Communication degree preferred'
        },
        {
          title: 'Social Worker',
          description: 'Help communities and individuals in need',
          salary: '₹2-5 LPA',
          requirements: 'MSW degree for advanced roles'
        },
        {
          title: 'Content Writer',
          description: 'Create written content for various platforms',
          salary: '₹2-5 LPA',
          requirements: 'Strong writing skills'
        }
      ],
      higherEducation: [
        'M.A. in specialized subjects',
        'LLB for law career',
        'MBA for management roles',
        'M.Phil/Ph.D. for research'
      ],
      governmentExams: [
        'UPSC Civil Services',
        'SSC Combined Graduate Level',
        'State PSC Exams',
        'Banking Exams',
        'Railway Exams'
      ],
      skills: ['Communication', 'Critical Thinking', 'Writing', 'Research'],
      difficulty: 'Easy',
      popularity: 'Very High'
    },
    {
      id: 3,
      name: 'Bachelor of Commerce (B.Com.)',
      stream: 'commerce',
      duration: '3 years',
      description: 'Focus on business, finance, and commercial activities',
      subjects: ['Accounting', 'Business Studies', 'Economics', 'Mathematics', 'Statistics'],
      careerPaths: [
        {
          title: 'Chartered Accountant',
          description: 'Handle financial matters for businesses',
          salary: '₹6-15 LPA',
          requirements: 'CA qualification'
        },
        {
          title: 'Banking Professional',
          description: 'Work in various banking operations',
          salary: '₹3-8 LPA',
          requirements: 'Banking exams (IBPS, SBI)'
        },
        {
          title: 'Business Analyst',
          description: 'Analyze business processes and suggest improvements',
          salary: '₹4-10 LPA',
          requirements: 'MBA preferred'
        },
        {
          title: 'Tax Consultant',
          description: 'Help individuals and businesses with tax matters',
          salary: '₹3-7 LPA',
          requirements: 'Tax-related certifications'
        }
      ],
      higherEducation: [
        'M.Com for advanced commerce',
        'MBA for management roles',
        'CA/CS/CMA qualifications',
        'M.Phil/Ph.D. for research'
      ],
      governmentExams: [
        'Banking Exams (IBPS, SBI)',
        'SSC Combined Graduate Level',
        'Railway Recruitment Board',
        'State PSC Exams',
        'UPSC Civil Services'
      ],
      skills: ['Numerical Analysis', 'Financial Planning', 'Business Acumen', 'Communication'],
      difficulty: 'Medium',
      popularity: 'High'
    },
    {
      id: 4,
      name: 'Bachelor of Business Administration (BBA)',
      stream: 'commerce',
      duration: '3 years',
      description: 'Professional degree focusing on business management and administration',
      subjects: ['Management', 'Marketing', 'Finance', 'Human Resources', 'Operations'],
      careerPaths: [
        {
          title: 'Management Trainee',
          description: 'Entry-level position in corporate management',
          salary: '₹3-6 LPA',
          requirements: 'MBA preferred for senior roles'
        },
        {
          title: 'Marketing Executive',
          description: 'Develop and implement marketing strategies',
          salary: '₹2-5 LPA',
          requirements: 'Digital marketing certifications helpful'
        },
        {
          title: 'HR Executive',
          description: 'Handle human resource functions',
          salary: '₹2-5 LPA',
          requirements: 'HR certifications preferred'
        },
        {
          title: 'Entrepreneur',
          description: 'Start and run your own business',
          salary: 'Variable',
          requirements: 'Business plan and capital'
        }
      ],
      higherEducation: [
        'MBA for advanced management',
        'M.Com for commerce specialization',
        'Specialized master\'s programs',
        'Executive MBA programs'
      ],
      governmentExams: [
        'Banking Exams',
        'SSC Combined Graduate Level',
        'Railway Recruitment Board',
        'State PSC Exams'
      ],
      skills: ['Leadership', 'Strategic Thinking', 'Communication', 'Problem Solving'],
      difficulty: 'Medium',
      popularity: 'High'
    },
    {
      id: 5,
      name: 'Bachelor of Computer Applications (BCA)',
      stream: 'science',
      duration: '3 years',
      description: 'Focus on computer applications and software development',
      subjects: ['Programming', 'Database Management', 'Web Development', 'Software Engineering', 'Networking'],
      careerPaths: [
        {
          title: 'Software Developer',
          description: 'Develop software applications and systems',
          salary: '₹3-8 LPA',
          requirements: 'Strong programming skills'
        },
        {
          title: 'Web Developer',
          description: 'Create and maintain websites',
          salary: '₹2-6 LPA',
          requirements: 'Web development technologies'
        },
        {
          title: 'System Administrator',
          description: 'Manage computer systems and networks',
          salary: '₹3-7 LPA',
          requirements: 'IT certifications preferred'
        },
        {
          title: 'Database Administrator',
          description: 'Manage and maintain databases',
          salary: '₹4-9 LPA',
          requirements: 'Database certifications'
        }
      ],
      higherEducation: [
        'MCA for advanced computer applications',
        'M.Tech in Computer Science',
        'MBA in IT Management',
        'M.Sc. in Computer Science'
      ],
      governmentExams: [
        'SSC Combined Graduate Level',
        'Banking Exams (IT Officer)',
        'Railway Recruitment Board',
        'State PSC Exams'
      ],
      skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Technical Skills'],
      difficulty: 'Medium',
      popularity: 'Very High'
    },
    {
      id: 6,
      name: 'Bachelor of Education (B.Ed.)',
      stream: 'arts',
      duration: '2 years',
      description: 'Professional degree for teaching careers',
      subjects: ['Educational Psychology', 'Teaching Methods', 'Curriculum Development', 'Classroom Management', 'Educational Technology'],
      careerPaths: [
        {
          title: 'School Teacher',
          description: 'Teach students in primary and secondary schools',
          salary: '₹2-6 LPA',
          requirements: 'TET/CTET qualification'
        },
        {
          title: 'Educational Administrator',
          description: 'Manage educational institutions',
          salary: '₹4-8 LPA',
          requirements: 'Additional management qualifications'
        },
        {
          title: 'Curriculum Developer',
          description: 'Design educational curricula and materials',
          salary: '₹3-7 LPA',
          requirements: 'Subject expertise'
        },
        {
          title: 'Educational Consultant',
          description: 'Advise on educational policies and practices',
          salary: '₹3-8 LPA',
          requirements: 'Advanced degrees preferred'
        }
      ],
      higherEducation: [
        'M.Ed. for advanced education',
        'M.A. in Education',
        'Ph.D. in Education',
        'Specialized teaching certifications'
      ],
      governmentExams: [
        'TET/CTET for teaching',
        'State PSC Exams',
        'SSC Combined Graduate Level',
        'Railway Recruitment Board'
      ],
      skills: ['Teaching', 'Communication', 'Patience', 'Subject Knowledge'],
      difficulty: 'Easy',
      popularity: 'High'
    },
    {
      id: 7,
      name: 'Bachelor of Science in Agriculture (B.Sc. Agriculture)',
      stream: 'science',
      duration: '4 years',
      description: 'Comprehensive degree focusing on agricultural sciences and sustainable farming practices',
      subjects: ['Crop Science', 'Soil Science', 'Plant Pathology', 'Agricultural Economics', 'Horticulture', 'Animal Husbandry'],
      careerPaths: [
        {
          title: 'Agricultural Officer',
          description: 'Work with government agricultural departments',
          salary: '₹3-7 LPA',
          requirements: 'J&K PSC or UPSC exams'
        },
        {
          title: 'Farm Manager',
          description: 'Manage agricultural operations and farms',
          salary: '₹2-5 LPA',
          requirements: 'Practical experience in farming'
        },
        {
          title: 'Agricultural Consultant',
          description: 'Provide expert advice to farmers and agricultural businesses',
          salary: '₹3-8 LPA',
          requirements: 'M.Sc. Agriculture preferred'
        },
        {
          title: 'Research Scientist',
          description: 'Conduct research in agricultural sciences',
          salary: '₹4-10 LPA',
          requirements: 'M.Sc./Ph.D. in Agriculture'
        }
      ],
      higherEducation: [
        'M.Sc. Agriculture in specialized subjects',
        'Ph.D. in Agricultural Sciences',
        'MBA in Agribusiness',
        'Post Graduate Diploma in Agricultural Management'
      ],
      governmentExams: [
        'J&K PSC Agricultural Officer',
        'UPSC Agricultural Services',
        'SSC Combined Graduate Level',
        'Banking Exams (Agriculture Officer)'
      ],
      skills: ['Crop Management', 'Soil Analysis', 'Research', 'Problem Solving'],
      difficulty: 'Medium',
      popularity: 'High'
    },
    {
      id: 8,
      name: 'Bachelor of Veterinary Science (B.V.Sc.)',
      stream: 'science',
      duration: '5 years',
      description: 'Professional degree for veterinary medicine and animal healthcare',
      subjects: ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Surgery', 'Animal Nutrition'],
      careerPaths: [
        {
          title: 'Veterinary Doctor',
          description: 'Provide medical care to animals',
          salary: '₹4-8 LPA',
          requirements: 'Veterinary Council registration'
        },
        {
          title: 'Livestock Inspector',
          description: 'Inspect and monitor livestock health',
          salary: '₹3-6 LPA',
          requirements: 'Government veterinary services'
        },
        {
          title: 'Animal Husbandry Officer',
          description: 'Manage animal breeding and health programs',
          salary: '₹4-7 LPA',
          requirements: 'J&K PSC or UPSC exams'
        },
        {
          title: 'Research Veterinarian',
          description: 'Conduct research in veterinary sciences',
          salary: '₹5-12 LPA',
          requirements: 'M.V.Sc./Ph.D. preferred'
        }
      ],
      higherEducation: [
        'M.V.Sc. in specialized veterinary subjects',
        'Ph.D. in Veterinary Sciences',
        'Diploma in Veterinary Public Health',
        'Specialized veterinary certifications'
      ],
      governmentExams: [
        'J&K PSC Veterinary Officer',
        'UPSC Veterinary Services',
        'SSC Combined Graduate Level',
        'State Animal Husbandry Department'
      ],
      skills: ['Animal Care', 'Medical Diagnosis', 'Surgery', 'Research'],
      difficulty: 'Hard',
      popularity: 'Medium'
    }
  ];

  useEffect(() => {
    let filtered = courses;
    
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subjects.some(subject => 
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    if (selectedStream !== 'all') {
      filtered = filtered.filter(course => course.stream === selectedStream);
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedStream]);

  const getStreamColor = (stream) => {
    const colors = {
      science: 'bg-blue-50 text-blue-600 border-blue-200',
      arts: 'bg-purple-50 text-purple-600 border-purple-200',
      commerce: 'bg-green-50 text-green-600 border-green-200',
      vocational: 'bg-orange-50 text-orange-600 border-orange-200'
    };
    return colors[stream] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'text-green-600 bg-green-50',
      'Medium': 'text-yellow-600 bg-yellow-50',
      'Hard': 'text-red-600 bg-red-50'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="course-mapper">
      <div className="container">
        <div className="mapper-header">
          <h1 className="mapper-title">Course to Career Mapping</h1>
          <p className="mapper-subtitle">
            Explore degree programs available in Jammu & Kashmir and discover the career opportunities they unlock
          </p>
        </div>

        {/* Search and Filter */}
        {/* <div className="search-filter-section">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search courses, subjects, or careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-section">
            <Filter className="filter-icon" />
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="stream-filter"
            >
              {streams.map(stream => (
                <option key={stream.value} value={stream.value}>
                  {stream.label}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        <div className="search-filter-section">
  <div className="search-box">
    <Search className="search-icon" />
    <input
      type="text"
      placeholder="Search courses, subjects, or careers..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  </div>

  <div className="filter-section">
    <Filter className="filter-icon" />
    <select
      value={selectedStream}
      onChange={(e) => setSelectedStream(e.target.value)}
      className="stream-filter"
    >
      {streams.map((stream) => (
        <option key={stream.value} value={stream.value}>
          {stream.label}
        </option>
      ))}
    </select>
  </div>
</div>


        {/* Quiz Results Recommendation
        {quizResults && (
          <div className="recommendation-banner">
            <div className="recommendation-content">
              <BookOpen className="recommendation-icon" />
              <div className="recommendation-text">
                <h3>Based on your quiz results</h3>
                <p>We recommend exploring {quizResults.recommendedStream} stream courses</p>
              </div>
            </div>
          </div>
        )} */}

        {/* Quiz Results Recommendation */}
{/* Quiz Results Recommendation */}
{quizResults && (
  <div
    className="quiz-results-container"
    style={{
      display: 'grid',
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      padding: '1rem',
    }}
  >
    {/* Common card style */}
    {[
      {
        title: "Recommended Stream",
        content: <p>{quizResults.recommendedStream}</p>,
      },
      {
        title: "Top Interests",
        content: (
          <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
            {quizResults.interests.map((interest, index) => (
              <li
                key={index}
                style={{
                  padding: '0.3rem 0',
                  borderBottom: index !== quizResults.interests.length - 1 ? '1px solid #eee' : 'none',
                  color: '#555',
                }}
              >
                {interest}
              </li>
            ))}
          </ul>
        ),
      },
      {
        title: "Personality Type",
        content: <p>{quizResults.personalityType}</p>,
      },
      {
        title: "Category Scores",
        content: (
          <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
            {Object.entries(quizResults.categoryScores).map(([category, score]) => (
              <li
                key={category}
                style={{
                  padding: '0.3rem 0',
                  borderBottom:
                    category !== Object.keys(quizResults.categoryScores).slice(-1)[0]
                      ? '1px solid #eee'
                      : 'none',
                  color: '#555',
                }}
              >
                <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong> {score}
              </li>
            ))}
          </ul>
        ),
      },
    ].map((box, index) => (
      <div
        key={index}
        className="result-box"
        style={{
          padding: '1.5rem',
          borderRadius: '12px',
          background: '#f0f4f8', // uniform card color
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.08)';
        }}
      >
        <h4
          style={{
            marginBottom: '0.75rem',
            fontWeight: '700',
            color: '#222',
            borderBottom: '2px solid #c3cfe2', // subtle line for heading
            paddingBottom: '0.25rem',
          }}
        >
          {box.title}
        </h4>
        <div style={{ fontSize: '1rem', color: '#333', fontWeight: '500' }}>{box.content}</div>
      </div>
    ))}
  </div>
)}




        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <div className="course-title-section">
                  <h3 className="course-name">{course.name}</h3>
                  <div className="course-meta">
                    <span className={`stream-badge ${getStreamColor(course.stream)}`}>
                      {course.stream.charAt(0).toUpperCase() + course.stream.slice(1)}
                    </span>
                    <span className="course-duration">{course.duration}</span>
                    <span className={`difficulty-badge ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                <div className="course-stats">
                  <div className="stat-item">
                    <TrendingUp className="stat-icon" />
                    <span>{course.popularity}</span>
                  </div>
                </div>
              </div>

              <p className="course-description">{course.description}</p>

              <div className="course-subjects">
                <h4 className="subjects-title">Key Subjects:</h4>
                <div className="subjects-list">
                  {course.subjects.map((subject, index) => (
                    <span key={index} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="course-skills">
                <h4 className="skills-title">Skills Developed:</h4>
                <div className="skills-list">
                  {course.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedCourse(course)}
                className="view-details-btn"
              >
                View Career Paths
                <ArrowRight className="btn-icon" />
              </button>
            </div>
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="course-modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="course-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">{selectedCourse.name}</h2>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedCourse(null)}
                >
                  ×
                </button>
              </div>

              <div className="modal-content">
                <div className="modal-section">
                  <h3 className="section-title">Career Paths</h3>
                  <div className="career-paths">
                    {selectedCourse.careerPaths.map((path, index) => (
                      <div key={index} className="career-path">
                        <div className="path-header">
                          <h4 className="path-title">{path.title}</h4>
                          <span className="path-salary">{path.salary}</span>
                        </div>
                        <p className="path-description">{path.description}</p>
                        <p className="path-requirements">
                          <strong>Requirements:</strong> {path.requirements}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Higher Education Options</h3>
                  <div className="education-options">
                    {selectedCourse.higherEducation.map((option, index) => (
                      <div key={index} className="education-option">
                        <Award className="education-icon" />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Government Exams</h3>
                  <div className="government-exams">
                    {selectedCourse.governmentExams.map((exam, index) => (
                      <div key={index} className="exam-item">
                        <Users className="exam-icon" />
                        <span>{exam}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="no-results">
            <BookOpen className="no-results-icon" />
            <h3>No courses found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseMapper;
