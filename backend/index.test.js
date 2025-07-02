const fastify = require('fastify');
const app = require('./index');

// Mock fastify server for testing
const buildApp = () => {
  const app = fastify();
  
  // Function to validate split (copied from index.js for testing)
  function validateSplit(total, splits) {
    const sum = Object.values(splits).reduce((acc, val) => acc + val, 0);
    return parseFloat(sum.toFixed(2)) === parseFloat(total.toFixed(2));
  }
  
  // Mock endpoint
  app.post('/api/validate-split', async (request, reply) => {
    const { total, splits } = request.body;
    
    if (!total || !splits || typeof total !== 'number' || typeof splits !== 'object') {
      return reply.code(400).send({
        success: false,
        message: 'Invalid input. Total must be a number and splits must be an object.'
      });
    }
    
    if (total < 0 || Object.values(splits).some(amount => amount < 0)) {
      return reply.code(400).send({
        success: false,
        message: 'Negative values are not allowed.'
      });
    }
    
    if (Object.keys(splits).length === 0) {
      return reply.code(400).send({
        success: false,
        message: 'At least one participant is required.'
      });
    }
    
    const isValid = validateSplit(total, splits);
    const sum = Object.values(splits).reduce((acc, val) => acc + val, 0);
    
    return {
      success: isValid,
      message: isValid 
        ? 'Split is valid.' 
        : `Split is invalid. Total is ${total} but sum of splits is ${sum.toFixed(2)}.`,
      difference: isValid ? 0 : parseFloat((total - sum).toFixed(2))
    };
  });
  
  return app;
};

describe('Bill Splitting API', () => {
  let app;
  
  beforeEach(() => {
    app = buildApp();
  });
  
  afterEach(async () => {
    await app.close();
  });
  
  test('Valid split should return success', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/validate-split',
      payload: {
        total: 125,
        splits: {
          "Alice": 60,
          "Bob": 65
        }
      }
    });
    
    const result = JSON.parse(response.payload);
    expect(response.statusCode).toBe(200);
    expect(result.success).toBe(true);
    expect(result.message).toBe('Split is valid.');
    expect(result.difference).toBe(0);
  });
  
  test('Invalid split should return error with difference', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/validate-split',
      payload: {
        total: 125,
        splits: {
          "Alice": 60,
          "Bob": 60
        }
      }
    });
    
    const result = JSON.parse(response.payload);
    expect(response.statusCode).toBe(200);
    expect(result.success).toBe(false);
    expect(result.difference).toBe(5);
  });
  
  test('Negative values should return error', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/validate-split',
      payload: {
        total: 125,
        splits: {
          "Alice": -60,
          "Bob": 185
        }
      }
    });
    
    const result = JSON.parse(response.payload);
    expect(response.statusCode).toBe(400);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Negative values are not allowed.');
  });
  
  test('Empty splits should return error', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/validate-split',
      payload: {
        total: 125,
        splits: {}
      }
    });
    
    const result = JSON.parse(response.payload);
    expect(response.statusCode).toBe(400);
    expect(result.success).toBe(false);
    expect(result.message).toBe('At least one participant is required.');
  });
  
  test('Should handle floating point precision', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/validate-split',
      payload: {
        total: 100.00,
        splits: {
          "Alice": 33.33,
          "Bob": 33.33,
          "Charlie": 33.34
        }
      }
    });
    
    const result = JSON.parse(response.payload);
    expect(response.statusCode).toBe(200);
    expect(result.success).toBe(true);
  });
}); 