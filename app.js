const express = require("express");
const app = express();
const port = 3000; // Choose a port number

app.use(express.json());

// Define your endpoint
app.get("/get_info", (req, res) => {
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
    "https://github.com/YourGitHubUsername/YourRepository/blob/main/app.js"; // Replace with your GitHub URL

  // Get the GitHub URL of the full source code
  const fullSourceCodeUrl =
    "https://github.com/YourGitHubUsername/YourRepository"; // Replace with your GitHub URL

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

app.post("/person", (req, res) => {
  console.log(req.body);
  return res.json({
    message: "This is your data",
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
});

app.get("/persons/:first", (req, res) => {
  console.log(req.params);
  return res.json({
    myparams: req.params.first,
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
