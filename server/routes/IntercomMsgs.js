const router = require("express").Router();
const axios = require("axios");

router.get("/messages/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await axios.get(
      `${process.env.INTERCOM_API_URL}/conversations`,
      {
        headers: {
          Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
          "Intercom-Version": "2.11",
        },
        params: {
          user_id: userId,
        },
      }
    );
    res.status(200).json(response.data.conversations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch conversations",
      error: error.message,
    });
  }
});

router.get("/conversations/:conversationId", async (req, res) => {
  const { conversationId } = req.params;
  try {
    const query = new URLSearchParams({ display_as: "string" }).toString();
    const conversationMessages = await axios.get(
      `${process.env.INTERCOM_API_URL}/conversations/${conversationId}?${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
          "Intercom-Version": "2.11",
        },
      }
    );
    res.status(200).json({ ...conversationMessages.data });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch messages",
      error: error.message,
    });
  }
});
module.exports = router;
