const axios = require("axios");

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

    // const data1 = await resp.json();
    console.log(resp.data);
    return resp.data;
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMessage;
