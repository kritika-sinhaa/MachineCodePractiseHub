import React, { useState } from 'react'; // Added useState import
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActionArea
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TopicList = () => {
  const testTopics = [
    {
      id: 1,
      title: "Design a Parking Lot",
      description: "Create a parking lot system with multiple levels and different vehicle types",
      difficulty: "MEDIUM"
    },
    {
      id: 2,
      title: "Movie Ticket Booking System",
      description: "Design a system for booking movie tickets with seat selection",
      difficulty: "HARD"
    },
    {
      id: 3,
      title: "Library Management System",
      description: "Create a system to manage books, members, and borrowing",
      difficulty: "EASY"
    }
  ];

  const [topics] = useState([]);
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Machine Coding Practice Topics
      </Typography>
      <Grid container spacing={3}>
        {topics.map((topic) => (
          <Grid item xs={12} sm={6} md={4} key={topic.id}>
            <Card>
              <CardActionArea onClick={() => navigate(`/topics/${topic.id}`)}>
                <CardContent>
                  <Typography variant="h6">{topic.title}</Typography>
                  <Typography color="textSecondary">
                    {topic.description}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    Difficulty: {topic.difficulty}
                  </Typography>
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