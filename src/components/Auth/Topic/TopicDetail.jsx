// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import ProblemSolution from '../components/ProblemSolution';
// import axios from 'axios';

// const TopicDetail = () => {
//   const { id } = useParams();
//   const [topic, setTopic] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTopic = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/api/topics/${id}`);
//         setTopic(response.data);
//       } catch (error) {
//         console.error('Error fetching topic:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopic();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!topic) {
//     return <div>Topic not found</div>;
//   }

//   return (
//     <div className="topic-detail">
//       <section className="problem-statement">
//         <h2>Problem Statement</h2>
//         <div>{topic.problemStatement}</div>
//       </section>

//       <section className="functional-requirements">
//         <h2>Functional Requirements</h2>
//         <div>{topic.functionalRequirements}</div>
//       </section>

//       <section className="solution-section">
//         <h2>Solution</h2>
//         <ProblemSolution problemId={id} />
//       </section>
//     </div>
//   );
// };

// export default TopicDetail;