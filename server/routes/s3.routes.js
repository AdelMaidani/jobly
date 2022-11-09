const aws = require("aws-sdk");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { promisify } = require("util");
const router = require("express").Router();

const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "ap-south-1";
const accessKeyId = process.env.ACCESS_KEY_ID;
const bucketName = "jobly3.0";
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 90,
  };

  const uploadUrl = await s3.getSignedUrlPromise("putObject", params);
  return uploadUrl;
}

router.get("/s3url", async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

module.exports = router;
