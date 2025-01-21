const router = require("express").Router();
const bodyParser = require("body-parser");
const axios = require("axios");

router.use(bodyParser.json());

const sendMessage = async (data) => {
  try {
    const resp = await axios.post(
      `${process.env.INTERCOM_API_URL}/messages`,
      {
        from: {
          type: "user",
          user_id: data.user.user_id,
          email: data.user.email,
        },
        body: data.message,
        referer: "http://localhost:5000",
        custom_attributes: {
          category: data.category,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Intercom-Version": "2.11",
          Authorization: `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}`,
        },
      }
    );

    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

router.post("/", async (req, res) => {
  const { userId, category, comments, userEmail } = req.body;

  if (!userId || !category || !comments || !userEmail) {
    return res.status(400).send({ message: "All fields are required." });
  }

  const intercomRequest = {
    user: { user_id: userId, email: userEmail },
    category: category,
    message: comments,
  };
  try {
    const intercomResponse = await sendMessage(intercomRequest);
    res.status(200).send({
      message: "Request submitted successfully.",
      data: intercomResponse,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to submit the request to Intercom.",
      error: error.response || error.message,
    });
  }
});

module.exports = router;
