import React, {useState, useEffect} from 'react';
import {Bar,Scatter} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function MultiTypeGraph({data}) {
    console.log("data from liron: ", data)

    const rand = () => Math.round(Math.random() * 20 - 10)


    // const [data, setData] = useState({});

    // const x = {
    //     labels: [0,1,2,3,4,5,6,7,8,9,10],
    //     datasets: [
    //         {
    //             type: 'scatter',
    //             label: 'Dataset 1',
    //             borderColor: 'rgb(54, 162, 235)',
    //             borderWidth: 2,
    //             fill: false,
    //             data: data['points'],
    //         },
    //         {
    //             type: 'scatter',
    //             label: 'Dataset 1',
    //             borderColor: 'rgb(54, 162, 235)',
    //             borderWidth: 2,
    //             fill: false,
    //             data: data['points'],
    //         },
    //
    //     ],
    //
    // }

    // useEffect(() => {
    //     setData({
    //         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //         datasets: [
    //             {
    //                 type: 'line',
    //                 label: 'Dataset 1',
    //                 borderColor: 'rgb(54, 162, 235)',
    //                 borderWidth: 2,
    //                 fill: false,
    //                 data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    //             },
    //             // {
    //             //     type: 'bar',
    //             //     label: 'Dataset 2',
    //             //     backgroundColor: 'rgb(255, 99, 132)',
    //             //     data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    //             //     borderColor: 'white',
    //             //     borderWidth: 2,
    //             // },
    //             // {
    //             //     type: 'bar',
    //             //     label: 'Dataset 3',
    //             //     backgroundColor: 'rgb(75, 192, 192)',
    //             //     data: [rand(), rand(), rand(), rand(), rand(), rand(), rand()],
    //             // },
    //         ],
    //     });
    // }, []);


    return (
        <div>
            <div className='header'>
                <h1 className='title'>{data.title}</h1>
            </div>
            <Scatter data={data['data']} type={'scatter'} />
        </div>
    )
}

export default MultiTypeGraph