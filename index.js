const express = require("express");
const aws = require("aws-sdk");
const cors = require("cors");

aws.config.update({
  accessKeyId: "AKIAUEMUPPDACENH76A7",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3 = new aws.S3();
const app = express();
app.use(cors());
app.use(express.json());


app.get("/get-pre-signed-url", (req, res) => {
  const { filename, folderName } = req.query;
  const params = {
    Bucket: "ply-models",
    Key: folderName + '/' + filename,
    Expires: 60,
    ContentType: "application/octet-stream",
  };

  s3.getSignedUrl("putObject", params, (err, url) => {
    if (err) return res.status(500).send(err);
    res.status(200).json({ url });
  });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
