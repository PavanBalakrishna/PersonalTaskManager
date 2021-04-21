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
            let taskeventstring = JSON.stringify(taskEventList);
                var params = {
                Body: taskeventstring,
                Bucket: "ptm.pavanbalakrishna.com",
                Key:"data/TaskEvents.json",
                ACL:'public-read'
                };
                
                s3.putObject(params,(err, responseData)=>{
                    if (err) console.log(err, err.stack); // an error occurred
                    else     console.log('success');           // successful response
                })

    }
}

export default FileService;