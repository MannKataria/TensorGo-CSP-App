const router = require("express").Router();
const bodyParser = require("body-parser");
const createIntercomRequest = require("../Intercom");

router.use(bodyParser.json());

router.post("/", async (req, res) => {
  const { userId, category, comments, userEmail } = req.body;

  if (!userId || !category || !comments || !userEmail) {
    return res.status(400).send({ message: "All fields are required." });
  }

  console.log(userEmail);

  const intercomRequest = {
    user: { user_id: userId, email: userEmail },
    category,
    message: comments,
  };
  try {
    const intercomResponse = await createIntercomRequest(intercomRequest);
    res.status(200).send({
      message: "Request submitted successfully.",
      data: intercomResponse,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed to submit the request to Intercom.",
      error: error.message,
    });
  }
});

module.exports = router;
