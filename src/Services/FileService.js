var AWS = require('aws-sdk');
var config = require('../config.json');

const FileService ={
        SaveTaskEventsToAWS:(taskEventList)=>{
            AWS.config.update({
                accessKeyId:config.aws.key,
                secretAccessKey:config.aws.secret,
                region:"ap-northeast-1"
            })
            var s3 = new AWS.S3();

                var params = {
                Bucket: "ptm.pavanbalakrishna.com",
                MaxKeys:10
                };
                s3.putObject()

    }
}

export default FileService;