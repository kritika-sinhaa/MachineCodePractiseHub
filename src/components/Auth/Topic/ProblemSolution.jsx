import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import { submissionService } from '../../../services/submissionService';
import '../styles/CodeEditor.css';

const ProblemSolution = ({ problemId }) => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    console.log('ProblemSolution mounted with problemId:', problemId);
  }, [problemId]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      setOutput('Please enter some code before submitting.');
      return;
    }

    setLoading(true);
    try {
      console.log('Submitting solution for problem:', problemId);
      const submissionData = {
        code: code,
        language: 'java',
        problemId: problemId
      };
      
      // First test the connection
      try {
        await submissionService.testConnection();
        console.log('Connection test successful');
      } catch (error) {
        console.error('Connection test failed:', error);
      }

      // Then submit the solution
      const result = await submissionService.evaluateSolution(problemId, submissionData);
      console.log('Raw evaluation result:', result);
      
      setEvaluationResult(result);
      
      // More detailed logging
      if (result) {
        console.log('Score:', result.score);
        console.log('Feedback:', result.feedback);
        console.log('ShowAiSolution:', result.showAiSolution);
      }

      if (typeof result.score === 'number') {
        setOutput(`Score: ${result.score}%\nFeedback: ${result.feedback || 'No feedback provided'}`);
      } else {
        console.warn('Unexpected result format:', result);
        setOutput(JSON.stringify(result, null, 2));
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      setOutput('Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="problem-solution">
      <div className="editor-section">
        <CodeEditor
          code={code}
          onChange={(value) => {
            console.log('Code changed. Length:', value.length);
            setCode(value);
          }}
          language="java"
        />
        <div className="button-group">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Evaluating...' : 'Submit Solution'}
          </button>
          
          {/* Debug button */}
          <button
            onClick={async () => {
              try {
                const response = await submissionService.testConnection();
                console.log('Connection test successful:', response);
                alert('API connection successful!');
              } catch (error) {
                console.error('Connection test failed:', error);
                alert('API connection failed: ' + error.message);
              }
            }}
            className="test-button"
          >
            Test Connection
          </button>
        </div>
      </div>

      <div className="output-section">
        <h3>Results</h3>
        <pre className="output-display">
          {output || 'No output yet'}
        </pre>
        
        {/* Debug info */}
        <div className="debug-info" style={{marginTop: '10px', fontSize: '12px', color: '#666'}}>
          {evaluationResult && (
            <>
              <div>Score: {evaluationResult.score}</div>
              <div>Show AI Solution: {evaluationResult.showAiSolution ? 'Yes' : 'No'}</div>
              <div>Status: {evaluationResult.status}</div>
            </>
          )}
        </div>
        
        {evaluationResult && evaluationResult.showAiSolution && (
          <button 
            onClick={() => console.log('View AI Solution for:', problemId)}
            className="ai-solution-button"
          >
            View AI Solution
          </button>
        )}
      </div>
    </div>
  );
};

export default ProblemSolution;