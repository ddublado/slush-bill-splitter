const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// Register CORS to allow frontend requests
fastify.register(cors, {
  origin: true, // Allow all origins in development
});

// Validate if the split is valid (sum of splits equals total)
function validateSplit(total, splits) {
  const sum = Object.values(splits).reduce((acc, val) => acc + val, 0);
  // Use toFixed(2) to handle floating point precision issues
  return parseFloat(sum.toFixed(2)) === parseFloat(total.toFixed(2));
}

// POST endpoint to validate bill splits
fastify.post('/api/validate-split', async (request, reply) => {
  const { total, splits } = request.body;
  
  // Validate input
  if (!total || !splits || typeof total !== 'number' || typeof splits !== 'object') {
    return reply.code(400).send({
      success: false,
      message: 'Invalid input. Total must be a number and splits must be an object.'
    });
  }
  
  // Check for negative values
  if (total < 0 || Object.values(splits).some(amount => amount < 0)) {
    return reply.code(400).send({
      success: false,
      message: 'Negative values are not allowed.'
    });
  }
  
  // Check if splits are empty
  if (Object.keys(splits).length === 0) {
    return reply.code(400).send({
      success: false,
      message: 'At least one participant is required.'
    });
  }
  
  // Validate if the split is correct
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

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3001, host: '0.0.0.0' });
    console.log(`Server is running on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start(); 