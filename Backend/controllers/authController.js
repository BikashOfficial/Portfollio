// Verify access code
export const verifyAccessCode = async (req, res) => {
  try {
    const { accessCode } = req.body;

    // Validate input
    if (!accessCode) {
      return res.status(400).json({
        success: false,
        message: 'Access code is required'
      });
    }

    // Check access code
    const validCode = process.env.ACCESS_CODE;
    if (accessCode !== validCode) {
      return res.status(401).json({
        success: false,
        message: 'Invalid access code'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Access verified successfully'
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying access code'
    });
  }
};
