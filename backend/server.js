require('dotenv').config();

const app = require("./app.js")
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

