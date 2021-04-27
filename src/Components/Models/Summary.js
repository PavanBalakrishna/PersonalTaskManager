import React,{useState} from 'react'
import {Card,Form,Button,Modal,Table,ListGroup,ListGroupItem,Alert} from 'react-bootstrap';
import {DataService} from '../../Services/Utilities';

export default function Summary({showReport, setshowReport}) {
    useEffect(() => {
        DataService.FetchMasterData();
    }, [])
    const [dailyReportData, setdailyReportData] = useState([]);
    const [weeklyReportData, setweeklyReportData] = useState([]);
    const [monthlyReportData, setmonthlyReportData] = useState([])
    const [overAllReportData, setoverAllReportData] = useState([]);

    const [showdailyReport, setshowdailyReport] = useState(false);
    const [showweeklyReport, setshowweeklyReport] = useState(false);
    const [showMonthlyReport, setshowMonthlyReport] = useState(false);
    const [showoverallReport, setshowoverallReport] = useState(false)



    return (
        <Modal>
            <Table>
                <thead>
                    <tr>
                        <tr>
                            <th>
                                Total Hours
                            </th>
                            <th>
                                Hours Completed
                            </th>
                            <th>
                                Hours Left
                            </th>
                            <th>
                                Hours Left Per Day
                            </th>
                            <th>
                                Daily Hours Completed
                            </th>
                            <th>
                                Weekly Hours Completed
                            </th>
                            <th>
                                Monthly Hours Completed
                            </th>
                            <th>
                                Total Hours Completed
                            </th>
                        </tr>
                    </tr>
                </thead>
            </Table>
        </Modal>
    )
}
