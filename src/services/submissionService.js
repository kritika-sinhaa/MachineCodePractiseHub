import api from '../api/axiosConfig';

export const submissionService = {
  submitSolution: async (submissionData) => {
    const response = await api.post('/api/submissions', submissionData);
    return response.data;
  }
};

export default submissionService;