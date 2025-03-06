import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  Snackbar
} from '@mui/material';
import { topicService } from '../../services/topicService';
import { submissionService } from '../../services/submissionService';
import CodeEditor from '../CodeEditor/CodeEditor';

const JAVA_TEMPLATE = `
public class Solution {
    /**
     * Main method to test your solution
     */
    public static void main(String[] args) {
        Solution solution = new Solution();
        // Add test cases here
    }

    /**
     * Add your solution method here
     */
    public void solve() {
        // Write your solution here
    }

    /**
     * Add helper methods here if needed
     */
}
`;

const CPP_TEMPLATE = `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    // Add your solution method here
    void solve() {
        // Write your solution here
    }
    
    // Add helper methods here if needed
};

int main() {
    Solution solution;
    // Add test cases here
    return 0;
}
`;

const PYTHON_TEMPLATE = `class Solution:
    def solve(self):
        """
        Add your solution method here
        """
        # Write your solution here
        pass

    # Add helper methods here if needed

def main():
    solution = Solution()
    # Add test cases here

if __name__ == "__main__":
    main()
`;

const TopicDetail = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [language, setLanguage] = useState('java'); // Set Java as default
  const [solution, setSolution] = useState(JAVA_TEMPLATE); // Set Java template as default
  const [requirements, setRequirements] = useState('// Define your requirements here\n\n');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleLanguageChange = (event, newLanguage) => {
    if (newLanguage !== null) {
      setLanguage(newLanguage);
      // Update solution template based on language
      switch(newLanguage) {
        case 'java':
          setSolution(JAVA_TEMPLATE);
          break;
        case 'cpp':
          setSolution(CPP_TEMPLATE);
          break;
        case 'python':
          setSolution(PYTHON_TEMPLATE);
          break;
        default:
          setSolution(JAVA_TEMPLATE);
      }
    }
  };

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        const data = await topicService.getTopicById(id);
        console.log('Fetched topic data:', data);
        setTopic(data);
      } catch (error) {
        console.error('Error fetching topic:', error);
        setError('Failed to load topic details');
      } finally {
        setLoading(false);
      }
    };

    fetchTopic();
  }, [id]);

  const handleSubmit = async () => {
    try {
      const submissionData = {
        code: solution,
        language: language,
        problemId: id
      };

      const result = await submissionService.evaluateSolution(id, submissionData);
      setSubmitStatus({
        open: true,
        message: 'Solution submitted successfully!',
        severity: 'success'
      });
      
    } catch (error) {
      console.error('Error submitting solution:', error);
      setSubmitStatus({
        open: true,
        message: error.response?.data?.message || 'Error submitting solution',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitStatus(prev => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {topic && (
        <>
          <Typography variant="h4" gutterBottom>
            {topic.name}
          </Typography>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Problem Statement</Typography>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{topic.description}</Typography>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Functional Requirements
            </Typography>
            <CodeEditor
              value={requirements}
              onChange={setRequirements}
              height="200px"
              language="javascript"
            />
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Solution
              </Typography>
              <ToggleButtonGroup
                value={language}
                exclusive
                onChange={handleLanguageChange}
                size="small"
              >
                <ToggleButton 
                  value="java"
                  sx={{ 
                    '&.Mui-selected': { 
                      bgcolor: '#ffa116 !important',
                      color: 'white !important'
                    }
                  }}
                >
                  Java
                </ToggleButton>
                <ToggleButton 
                  value="cpp"
                  sx={{ 
                    '&.Mui-selected': { 
                      bgcolor: '#ffa116 !important',
                      color: 'white !important'
                    }
                  }}
                >
                  C++
                </ToggleButton>
                <ToggleButton 
                  value="python"
                  sx={{ 
                    '&.Mui-selected': { 
                      bgcolor: '#ffa116 !important',
                      color: 'white !important'
                    }
                  }}
                >
                  Python
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <CodeEditor
              value={solution}
              onChange={setSolution}
              height="400px"
              language={language}
            />
          </Paper>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{
                bgcolor: '#ffa116',
                '&:hover': {
                  bgcolor: '#ff9100'
                }
              }}
            >
              Submit Solution
            </Button>
          </Box>
        </>
      )}
      
      <Snackbar
        open={submitStatus.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={submitStatus.severity}
          sx={{ width: '100%' }}
        >
          {submitStatus.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TopicDetail;