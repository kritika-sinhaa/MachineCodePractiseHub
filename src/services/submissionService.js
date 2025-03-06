import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/submissions';

export const submissionService = {
    evaluateSolution: async (problemId, submissionData) => {
        try {
            console.log('Calling evaluate API with:', { problemId, submissionData });
            const response = await axios.post(`${BASE_URL}/evaluate/${problemId}`, {
                code: submissionData.code,
                functionalRequirements: submissionData.functionalRequirements || ""
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Evaluation error:', error);
            throw error;
        }
    },

    executeSolution: async (submissionData) => {
        try {
            const response = await axios.post(`${BASE_URL}/execute`, submissionData);
            return response.data;
        } catch (error) {
            console.error('Execution error:', error);
            throw error;
        }
    },

    testConnection: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/test`);
            return response.data;
        } catch (error) {
            console.error('Test connection error:', error);
            throw error;
        }
    }
};

export default submissionService;