import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Box,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { topicService } from '../../services/topicService';

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  // Difficulty order mapping for sorting
  const difficultyOrder = {
    'Easy': 1,
    'Medium': 2,
    'Hard': 3
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        console.log('Fetching topics...');
        const data = await topicService.getAllTopics();
        // Sort topics by difficulty
        const sortedTopics = [...data].sort((a, b) => {
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
        setTopics(Array.isArray(sortedTopics) ? sortedTopics : []);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setTopics([]);
      }
    };

    fetchTopics();
  }, []);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: {
        color: '#00af9b',
        bg: '#e7f9f7'
      },
      Medium: {
        color: '#ffa116',
        bg: '#fff7eb'
      },
      Hard: {
        color: '#ff375f',
        bg: '#fff1f3'
      }
    };
    return colors[difficulty] || colors.Medium;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          color: '#262626',
          mb: 4,
          textAlign: 'center',
          fontWeight: 600,
          letterSpacing: '-0.5px'
        }}
      >
        Machine Coding Practice Topics
      </Typography>
      <Grid container spacing={3}>
        {topics.map((topic) => (
          <Grid item xs={12} sm={6} md={4} key={topic.id}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
                borderRadius: 2,
                border: '1px solid #e8e8e8',
                bgcolor: '#ffffff',
                minHeight: '250px',
                position: 'relative'
              }}
            >
              <CardActionArea 
                onClick={() => navigate(`/topics/${topic.id}`)}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch'
                }}
              >
                <CardContent 
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    p: 2.5,
                    '&:last-child': { pb: 2.5 }
                  }}
                >
                  <Box sx={{ mb: 'auto' }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: '#262626',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        mb: 1.5,
                        lineHeight: 1.3
                      }}
                    >
                      {topic.name}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: '#595959',
                        fontSize: '0.925rem',
                        mb: 2,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        height: '4.5em'
                      }}
                    >
                      {topic.description}
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      pt: 2,
                      borderTop: '1px solid #f0f0f0'
                    }}
                  >
                    <Chip
                      label={topic.difficulty}
                      size="small"
                      sx={{ 
                        ...getDifficultyColor(topic.difficulty),
                        fontWeight: 500,
                        fontSize: '0.8125rem',
                        height: '24px',
                        '& .MuiChip-label': {
                          px: 1.5
                        }
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#595959',
                        fontSize: '0.875rem'
                      }}
                    >
                      View Details →
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TopicList;