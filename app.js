const express = require("express");
const app = express();
const port = 5000; // Choose a port number

// Define your endpoint
app.get("/get_intern_info", (req, res) => {
  // Get query parameters
  const slackName = req.query.slack_name || "";
  const track = req.query.track || "";

  // Get current day of the week
  const currentDay = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  // Get current UTC time with validation of +/-2 hours
  const utcOffset = new Date().getTimezoneOffset();
  const isWithinTwoHours = Math.abs(utcOffset) <= 120;
  const currentTime = isWithinTwoHours ? new Date().toISOString() : null;

  // Get the GitHub URL of the file being run
  const fileGithubUrl =
    "https://github.com/sheriff-o/express_backend/blob/main/app.js";

  // Get the GitHub URL of the full source code
  const fullSourceCodeUrl = "https://github.com/sheriff-o/express_backend";

  // Create a response JSON
  const response = {
    slack_name: slackName,
    current_day: currentDay,
    current_utc_time: currentTime,
    track: track,
    github_file_url: fileGithubUrl,
    github_repo_url: fullSourceCodeUrl,
    status_code: 200,
  };

  res.json(response);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
