// server/middleware/auth.js
const { clerkClient } = require('@clerk/clerk-sdk-node');

const requireAuth = async (req, res, next) => {
  try {
    // Get the session token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid token.',
        code: 'UNAUTHORIZED',
      });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      // Verify the token with Clerk
      const session = await clerkClient.sessions.verifySession(token);

      if (!session || !session.userId) {
        return res.status(401).json({
          success: false,
          message: 'Invalid or expired authentication token.',
          code: 'INVALID_TOKEN',
        });
      }

      // Attach userId and session to the request object
      req.userId = session.userId;
      req.session = session;

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token.',
        code: 'INVALID_TOKEN',
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server authentication error.',
      code: 'SERVER_ERROR',
    });
  }
};

module.exports = { requireAuth };