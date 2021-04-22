var AWS = require('aws-sdk');
var config = require('../config.json');

const FileService ={
        SaveTaskEventsToAWS:(searchFileKey, taskEventList,callbackFunction)=>{
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
                Key:searchFileKey,
                ACL:'public-read'
                };
                
                s3.putObject(params,(err, responseData)=>{
                    callbackFunction( responseData,err);
                })

    },
    GetListFromAWS:async (searchFileKey, callbackFunction)=>{
        AWS.config.update({
            accessKeyId:config.aws.key,
            secretAccessKey:config.aws.secret,
            region:"ap-northeast-1"
        })
        var s3 = new AWS.S3();
        
            var params = {
                 Bucket: "ptm.pavanbalakrishna.com",
                 Key:searchFileKey,
                 ResponseContentType: 'application/javascript'
            };
            
            s3.getObject(params,(err, responseData)=>{
                    if (err) console.log(err, err.stack); // an error occurred
                    else   {
                        var uint8array = new TextEncoder().encode(responseData.Body);
                        let resultbody = new TextDecoder().decode(uint8array);
                        callbackFunction(JSON.parse(resultbody),err);
                    } 
                 });

                 
            }
}

export default FileService;