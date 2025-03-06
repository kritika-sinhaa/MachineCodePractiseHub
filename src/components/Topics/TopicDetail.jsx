import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  CircularProgress
} from '@mui/material';

const TopicDetail = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [solution, setSolution] = useState('');
  const [requirements, setRequirements] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/topics/${id}`);
        setTopic(response.data);
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
      const response = await axios.post('/api/submissions', {
        topicId: id,
        solution,
        requirements
      });
      // Handle submission response
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting solution:', error);
    }
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
            {topic.title}
          </Typography>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6">Problem Statement</Typography>
            <Typography>{topic.description}</Typography>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Functional Requirements
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Define your functional requirements here..."
            />
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Solution
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Write your solution here..."
            />
          </Paper>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit Solution
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default TopicDetail;