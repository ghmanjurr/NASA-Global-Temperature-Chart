
const xlabels = [];
const ytempsGlobal = [];
const ytempsNorthH = [];
const ytempsSouthH = [];

chartIt();

async function chartIt() {
    const ctx = document.getElementById('chart').getContext('2d');
    await getData();
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [
                {
                    label: 'Global Mean Temperature, °C',
                    data: ytempsGlobal,
                    fill: false,
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)'],
                    borderWidth: 4
                },
                {
                    label: 'Northern Hemisphere Mean Temperature, °C',
                    data: ytempsNorthH,
                    fill: false,
                    backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgba(54, 162, 235, 1)'],
                    borderWidth: 2
                },
                {
                    label: 'Southern Hemisphere Mean Temperature, °C',
                    data: ytempsSouthH,
                    fill: false,
                    backgroundColor: ['rgba(255, 206, 86, 0.2)'],
                    borderColor: ['rgba(255, 206, 86, 1)'],
                    borderWidth: 2
                }
                
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        callback: function(value, index, values) {
                            return value + '°';
                        }
                    }
                }]
            }
        }
    })
};


async function getData() {
    //use fetch function to grab csv data and save it to "response" variable
    const response = await fetch('ZonAnn.Ts+dSST.csv');
    //use text() method to return csv data in text format and save it 
    //in "data" variable
    const data = await response.text();
    
    //use split() method to split string into an array of substrings,
    //'\n' creates a split at each new line break
    //.slice() method slices away the 0 index as it's just header
    //and unnecessary for data manipulation
    const table = data.split('\n').slice(1);

    //forEach row of data, do the following:
    table.forEach(row => {
        //split the table array at each comma into a new array
        const columns = row.split(',');
        //save each value at index 0 into "year" variable
        const year = columns[0];
        //push each "year" value to xlabels variable
        xlabels.push(year);
        //save each value at index 1 into "tempGlobal" variable
        const tempGlobal = columns[1];
        //convert string value into floating point,
        //then push each value to "ytempsGlobal" variable
        ytempsGlobal.push(parseFloat(tempGlobal) + 14);
        //save each value at index 2 into "tempNorthH" variable
        const tempNorthH = columns[2];
        //convert string value into floating point,
        //then push each value to "ytempsNorthH" variable
        ytempsNorthH.push(parseFloat(tempNorthH) + 14);
        //save each value at index 3 into "tempSouthH" variable
        const tempSouthH = columns[3];
        //convert string value into floating point,
        //then push each value to "ytempsSouth" variable
        ytempsSouthH.push(parseFloat(tempSouthH) + 14);

    })
}
