import api from '../api/axiosConfig';

export const topicService = {
  getAllTopics: async () => {
    const response = await api.get('/api/topics');
    return response.data;
  },

  getTopicById: async (id) => {
    const response = await api.get(`/api/topics/${id}`);
    return response.data;
  },

  createTopic: async (topicData) => {
    const response = await api.post('/api/topics', topicData);
    return response.data;
  }
};

export default topicService;