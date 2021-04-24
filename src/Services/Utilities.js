var AWS = require('aws-sdk');
var config = require('../config.json');

const GetMasterData = (taskeventsdata,startDate, endDate) => {
     let masterList = {
        GoalsList:[],
        SubGoalsList:[],
        TasksList:[],
        TaskEventsList:[]
    };

        if(startDate != null && startDate != ''){
            taskeventsdata = taskeventsdata.filter(te=>{
                return new Date(te.StartTime) >= new Date(startDate);
            })
        }

        if(endDate != null && endDate != ''){
            taskeventsdata = taskeventsdata.filter(te=>{
                return new Date(te.StartTime) <= new Date(endDate);
            })
        }

        window.MasterGoalsData.forEach(g => {
                let mainGoal = {
                    ...g,
                    TotalTime:0,
                    TotalTimeSpent:0,
                    Percentage:0
                };
                
                let sglist = window.MasterSubGoalsData.filter(sg => sg.Goal_ID === g.id);
                sglist.forEach(sg=>{
                    let mainSubGoal ={
                        ...sg,
                        TotalTimeSpent:0,
                        Goal_ID:mainGoal.id,
                        Percentage:0
                    }
                    //Adding total time
                    mainGoal.TotalTime += sg.TotalTime;

                    let ltsklist = window.MasterTasksData.filter(t => t.SubGoal_ID === sg.id);

                    ltsklist.forEach(t=>{
                        let mainTask ={
                            ...t,
                            Goal_ID:mainGoal.id,
                            TotalTimeSpent:0,
                            SubGoal_ID:mainSubGoal.id
                        }
                        let gsgtelist = taskeventsdata.filter(te=> te.Task_ID === t.id);

                        gsgtelist.forEach(lte=>{
                            
                            let mainTaskEvent={
                                ...lte,
                                Goal_ID:mainGoal.id,
                                SubGoal_ID:mainSubGoal.id,
                                Task_ID:mainTask.id,
                                
                            }

                            mainGoal.TotalTimeSpent += parseFloat(lte.TimeSpent);
                            mainSubGoal.TotalTimeSpent += parseFloat(lte.TimeSpent); 
                            mainTask.TotalTimeSpent += parseFloat(lte.TimeSpent);

                            masterList.TaskEventsList.push(mainTaskEvent);
                        })
                        masterList.TasksList.push(mainTask);
                        
                    })
                    
                    mainSubGoal.Percentage = parseInt((mainSubGoal.TotalTimeSpent*100)/mainSubGoal.TotalTime);
                    masterList.SubGoalsList.push(mainSubGoal);

                })
                if(mainGoal.TotalTime != 0){
                    mainGoal.Percentage = parseInt((mainGoal.TotalTimeSpent*100)/mainGoal.TotalTime);
                }
                
                masterList.GoalsList.push(mainGoal);
            });

            return masterList;
    }

export const FileService ={
        SaveDataToAWS:(searchFileKey, data,callbackFunction)=>{
            AWS.config.update({
                accessKeyId:config.aws.key,
                secretAccessKey:config.aws.secret,
                region:"ap-northeast-1"
            })
            var s3 = new AWS.S3();
            let dataString = JSON.stringify(data);
                var params = {
                Body: dataString,
                Bucket: "ptm.pavanbalakrishna.com",
                Key:searchFileKey,
                ACL:'public-read'
                };
                
                return s3.putObject(params,(err, responseData)=>{
                    if(callbackFunction != null){
                        callbackFunction( responseData,err);
                    }
                    
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
            
            let promiseData = await s3.getObject(params,(err, responseData)=>{
                    if (err) console.log(err, err.stack); // an error occurred
                    else   {
                        let uint8array = new TextEncoder().encode(responseData.Body);
                        let resultbody = new TextDecoder().decode(uint8array);
                        if(callbackFunction != null){
                            callbackFunction(JSON.parse(resultbody),err);
                        }
                        
                    } 
                 }).promise();
                 let uint8array = new TextEncoder().encode(promiseData.Body);
                 let resultbody = new TextDecoder().decode(uint8array);
                 return JSON.parse(resultbody);
            }
}

export const DataService = {
    FetchMasterData : async (startDate, endDAte)=>{
       let promiseData = await FileService.GetListFromAWS("data/TaskEvents.json");
       return GetMasterData(promiseData, startDate, endDAte);
    }
}