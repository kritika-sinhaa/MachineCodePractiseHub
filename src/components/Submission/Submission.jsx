// import React, { useState, useEffect } from 'react';
// import CodeEditor from '../components/CodeEditor';
// import { submissionService } from '../../services/submissionService';
// import './Submission.css'; // We'll create this file next

// const SubmissionPage = () => {
//   const [code, setCode] = useState('');
//   const [output, setOutput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [evaluationResult, setEvaluationResult] = useState(null);

//   // Add this to verify component mounting and initial state
//   useEffect(() => {
//     console.log('SubmissionPage mounted');
//   }, []);

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const response = await submissionService.executeSolution({
//         code: code,
//         language: 'java'
//       });
//       setOutput(response.data);
//     } catch (error) {
//       setOutput('Error: ' + error.message);
//     }
//     setLoading(false);
//   };

//   const handleEvaluate = async (problemId) => {
//     console.log('handleEvaluate called with problemId:', problemId);
//     console.log('Current code state:', code);

//     if (!code.trim()) {
//       setOutput('Please enter some code before submitting.');
//       return;
//     }

//     setLoading(true);
//     try {
//       console.log('Making API call to evaluate...');
//       const response = await submissionService.evaluateSolution(problemId, {
//         code: code,
//         functionalRequirements: "", // Add if you have these
//       });
      
//       console.log('Evaluation response received:', response.data);
//       setEvaluationResult(response.data);
//       setOutput(`Score: ${response.data.score}%\nFeedback: ${response.data.feedback}`);
//     } catch (error) {
//       console.error('Evaluation error details:', {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//         stack: error.stack
//       });
//       setOutput(`Error: ${error.response?.data?.message || error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewAiSolution = async () => {
//     // Implement AI solution viewing logic here
//     console.log("Viewing AI solution for problem:", evaluationResult?.problemId);
//   };

//   // Add a direct click handler for testing
//   const handleSubmitClick = () => {
//     console.log('Submit button clicked');
//     handleEvaluate(1); // Using 1 as test problemId
//   };

//   return (
//     <div className="submission-page">
//       <div className="editor-section">
//         <h2>Code Editor</h2>
//         <CodeEditor
//           code={code}
//           onChange={(value) => {
//             console.log('Code changed:', value); // Debug code changes
//             setCode(value);
//           }}
//           language="java"
//         />
//         <div className="button-group">
//           <button
//             onClick={handleSubmitClick} // Use the direct click handler
//             disabled={loading}
//             className="submit-button"
//           >
//             {loading ? 'Evaluating...' : 'Submit Solution'}
//           </button>
          
//           {/* Test button with simpler implementation */}
//           <button
//             onClick={() => {
//               console.log('Test button clicked');
//               alert('Test button works!');
//             }}
//             className="test-button"
//           >
//             Test Button
//           </button>

//           {/* API test button */}
//           <button
//             onClick={async () => {
//               console.log('Testing API connection...');
//               try {
//                 const response = await submissionService.testConnection();
//                 console.log('API test successful:', response);
//                 alert('API test successful!');
//               } catch (error) {
//                 console.error('API test failed:', error);
//                 alert('API test failed: ' + error.message);
//               }
//             }}
//             className="test-api-button"
//           >
//             Test API Connection
//           </button>
//         </div>
//       </div>

//       <div className="output-section">
//         <h2>Results</h2>
//         <pre className="output-display">
//           {output || 'No output yet'}
//         </pre>
        
//         {evaluationResult && evaluationResult.showAiSolution && (
//           <button 
//             onClick={handleViewAiSolution}
//             className="ai-solution-button"
//           >
//             View AI Solution
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubmissionPage;