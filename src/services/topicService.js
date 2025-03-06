import api from '../api/axiosConfig';

export const topicService = {
  getAllTopics: async () => {
    try {
      console.log('Making API request to /api/topics');
      const response = await api.get('/api/topics');
      console.log('API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error in getAllTopics:', error);
      throw error;
    }
  },

  getTopicById: async (id) => {
    try {
      console.log('Making request to:', `/api/topics/${id}`);
      const response = await api.get('/api/topics');
      console.log('Response:', response);
      
      // Find the specific topic in the array
      const topic = response.data.find(t => t.id === parseInt(id));
      console.log('Found topic:', topic);
      
      if (!topic) {
        throw new Error('Topic not found');
      }
      return {
        ...topic,
        title: topic.name
      };
    } catch (error) {
      console.error('Error in getTopicById:', error);
      throw error;
    }
  },

  createTopic: async (topicData) => {
    const response = await api.post('/api/topics', topicData);
    return response.data;
  }
};

export default topicService;