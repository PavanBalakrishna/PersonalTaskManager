import React,{useState,useEffect} from 'react'
import {Card,Form,Button,Modal,Table} from 'react-bootstrap';
import {DataService} from '../../Services/Utilities';

export default function Summary({showReport, setshowReport}) {
    useEffect(() => {
        DataService.FetchReportData().then((reportsdate)=>{
            setreportData(reportsdate);
            setshowReportsData(true)
        })
    }, [])
    // const [dailyReportData, setdailyReportData] = useState([]);
    // const [weeklyReportData, setweeklyReportData] = useState([]);
    // const [monthlyReportData, setmonthlyReportData] = useState([])
    // const [overAllReportData, setoverAllReportData] = useState([]);

    // const [showdailyReport, setshowdailyReport] = useState(false);
    // const [showweeklyReport, setshowweeklyReport] = useState(false);
    // const [showMonthlyReport, setshowMonthlyReport] = useState(false);
    const [showReportsData, setshowReportsData] = useState(false);
    const [reportData, setreportData] = useState({})



    return (
        <Modal show={showReport} >
            {
                showReportsData && 
                <>
                
                <Table>
      
                <tbody>
                    <tr>
                            <th>
                                Total Hours (All Goals)
                            </th>
                            <td>
                                {reportData.TotalHours}
                            </td>
                    </tr>
               
                    <tr>
                            <th>
                               Total Days Left
                            </th>
                            <td>
                            {reportData.DaysLeft}
                            </td>
                    </tr>
                    <tr>
                            <th>
                                Total Hours Remaining
                            </th>
                            <td>
                            {reportData.LeftWith}
                            </td>
                    </tr>
                    <tr>
                        <th>
                                Hours Remaining Per Day
                            </th>
                            <td>
                            {reportData.LeftWithPerDay}
                            </td>

                    </tr>
                    <tr>
                        <th>
                                Hours Completed
                            </th>
                            <td>
                            {reportData.OverAllHoursCompleted}
                            </td>
                    </tr>
                    <tr>
                        <th>
                                Daily Hours Completed
                            </th>
                            <td>
                            {reportData.DailyHoursCompleted}
                            </td>
                    </tr>
                    <tr>
                         <th>
                                Weekly Hours Completed
                            </th>
                            <td>
                            {reportData.WeeklyHoursCompleted}
                            </td>
                    </tr>
                    <tr>
                         <th>
                                Monthly Hours Completed
                            </th>
                            <td>
                            {reportData.MonthlyHoursCompleted}
                            </td>
                    </tr>
                    <tr>
                         <th>
                                Average Hours Per Day
                            </th>
                            <td>
                            {reportData.PerDayAverage}
                            </td>
                    </tr>
                    <tr>
                         <th>
                                Minimum Hours
                            </th>
                            <td>
                            {reportData.MinimumHours}
                            </td>
                    </tr>
                    <tr>
                         <th>
                            Minimum Hours Remianing
                            </th>
                            <td>
                            {reportData.MinimumHoursRemianing}
                            </td>
                    </tr>
                </tbody>
            </Table>
            <Button className='click-tr' onClick={()=>{setshowReport(false)}}>Close</Button>
                </>
            }
            </Modal>
    )
}
