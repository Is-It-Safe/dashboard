import axios from 'axios';
import { reviewNumberRequest } from './review-number-service';

jest.mock('axios'); // Mock axios module

describe('reviewNumberRequest', () => {
  const mockToken = 'mockToken';
  const mockReviews = 5;

  beforeEach(() => {
    jest.resetAllMocks(); // Reset all mocks before each test
  });

  it('should return the number of reviews if the request is successful', async () => {
    // Mock the axios get method to return the number of reviews
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
      data: mockReviews,
    });

    const result = await reviewNumberRequest(mockToken);

    expect(result).toEqual(mockReviews); // Assert that the result is equal to the mock reviews value
    expect(axios.get).toHaveBeenCalledTimes(1); // Assert that the axios get method was called exactly once
    expect(axios.get).toHaveBeenCalledWith(
      'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/review',
      {
        headers: {
          Authorization: 'Bearer ' + mockToken,
        },
      }
    ); // Assert that the axios get method was called with the correct arguments
  });

  it('should throw an error if the request fails', async () => {
    const mockError = new Error('Request failed');
    // Mock the axios get method to throw an error
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      mockError
    );

    // Use a try-catch block to catch the error thrown by reviewNumberRequest
    try {
      await reviewNumberRequest(mockToken);
    } catch (error) {
      expect(error).toEqual(mockError); // Assert that the error thrown is equal to the mock error value
      expect(axios.get).toHaveBeenCalledTimes(1); // Assert that the axios get method was called exactly once
      expect(axios.get).toHaveBeenCalledWith(
        'https://is-it-safe-api-v2.herokuapp.com/is-it-safe/dashboard/review',
        {
          headers: {
            Authorization: 'Bearer ' + mockToken,
          },
        }
      ); // Assert that the axios get method was called with the correct arguments
    }
  });
});
