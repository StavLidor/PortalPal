import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import MultiTypeGraph from "./components/MultiTypeGraph";

Chart.register(...registerables);

function ReportsPage({appKey}) {
    const [hasData, setHasData] = useState(false);
    const [APIResult, setAPIResult] = useState('');
    const APImap = {AutiDo: 'https://lironhaim15.pythonanywhere.com/get' }
    useEffect(() => {
        const APIrequest = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                // 'id': "gOCpJKs43uRr8Y7QHkHL"
                'auth_code': "tokolocopoco"
            })
        };
        fetch(APImap[appKey], APIrequest)
            .then(response => response.json())
            .then(data => {
                console.log("dataaaaa")

                console.log("dataaaaa", data)
                setAPIResult(data)
                setHasData(true)

                // if (data['prediction'][0] === 0) {
                //     setModelResult('שלילית')
                // } else if (data['prediction'][0] === 1) {
                //     setModelResult('חיובית')
                // }
            });
    }, [])

    return (
        <div>

            {hasData === false && <h2>טוען נתונים...</h2>}
            {hasData && <MultiTypeGraph appKey={appKey} data={APIResult}/>}

        </div>
    )
}

export default ReportsPage