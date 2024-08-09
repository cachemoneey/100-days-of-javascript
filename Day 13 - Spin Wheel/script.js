const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
    { minDegree: 0, maxDegree: 30, value: 2 },
    { minDegree: 31, maxDegree: 90, value: 1 },
    { minDegree: 91, maxDegree: 150, value: 6 },
    { minDegree: 151, maxDegree: 210, value: 5 },
    { minDegree: 211, maxDegree: 270, value: 4 },
    { minDegree: 271, maxDegree: 330, value: 3 },
    { minDegree: 331, maxDegree: 360, value: 2 },

];

const data = [16, 16, 16, 16, 16, 16];

var pieColors = [
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
    "#1565c0",
    "#2196f3",
];

let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        responsive: true,
            animation: { duration: 0 },
            plugins: {
                tooltip: false,
                legend: {
                    display: false,
                },
                datalabels: {
                    color: "#ffffff",
                    formatter: (_, context) => context.chart.data.labels[context.dataIndex],
                    font: {size: 24},

                },
            },
    },
});

const valueGenerator = (angleValue) => {
    for(let i of rotationValues){
        if(angleValue >= i.minDegree && angleValue <= i.maxDegree){
            finalValue.innerHTML = `<p>Value: ${i.value}</p>`;
            spinBtn.disabled = false;
            break;
        }
    }
};

// Spinner Count

let count = 0;

// 100 rotation for animation and last rotation for result

let resultValue = 101;

// Start spinning

spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    finalValue.innerHTML = `<p>Good Luck!</p>`;

    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0)
    let rotationInterval = window.setInterval(() => {
        myChart.options.rotation = myChart.options.rotation + resultValue;
        myChart.update();
        if( myChart.options.rotation  >= 360){
            count += 1;
            resultValue -= 5;
            myChart.options.rotation = 0;
        } else if (count > 15 &&  myChart.options.rotation == randomDegree){
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            resultValue = 101;

        }
    }, 10);
});
