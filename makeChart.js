import { data } from './app.js';

// Use `data` as needed in `makeChart.js`
console.log('Imported data:', data);

const canvas = document.querySelector('.mainChart');

if (canvas) {
    const ctx = canvas.getContext('2d');

    const chartWidth = canvas.width - 100; // Adjusted for better spacing
    const chartHeight = canvas.height - 30; // Adjusted for better spacing

    // Find the maximum and minimum values in the data
    const values = data.map(item => item.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    // Define standard Y-axis values
    const standardValues = [1000, 2000, 3000, 4000, 5000, 6000];

    // Calculate the number of data points and the width of each segment
    const numPoints = data.length;
    const segmentWidth = chartWidth / (numPoints - 1);

    // Function to draw the line chart
    function drawLineChart() {
        ctx.beginPath();
        ctx.moveTo(50, canvas.height - calculateY(data[0].value));

        for (let i = 1; i < data.length; i++) {
            const x = 50 + i * segmentWidth;
            const y = canvas.height - calculateY(data[i].value);
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = 'white'; // Set line color to white
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Function to draw data points
    function drawDataPoints() {
        for (let i = 0; i < data.length; i++) {
            const x = 50 + i * segmentWidth;
            const y = canvas.height - calculateY(data[i].value);

            // Draw a circle for each data point
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = '#824dff'; // Color for data points
            ctx.fill();
            ctx.closePath();

            // Store the coordinates and value for each data point
            data[i].x = x;
            data[i].y = y;
        }
    }

    // Function to calculate Y coordinate based on value
    function calculateY(value) {
        const padding = 30; // Bottom padding
        const y = (value - minValue) / (maxValue - minValue) * (chartHeight - padding);
        return y + padding; // Add padding back to the calculated Y coordinate
    }

    // Function to draw labels
    function drawLabels() {
        ctx.fillStyle = 'white'; // Label color
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw labels on X axis
        for (let i = 0; i < data.length; i++) {
            const x = 50 + i * segmentWidth;
            const label = data[i].label;

            // Save the current context state
            ctx.save();

            // Translate to label position
            ctx.translate(x, canvas.height - 10); // Adjust y position as needed

            // Rotate the label by 45 degrees counter-clockwise
            ctx.rotate(-Math.PI / 4);

            // Draw the rotated label
            ctx.fillText(label, 0, 0); // Draw label centered at translated position

            // Restore the context state
            ctx.restore();
        }

        // Draw labels on Y axis (standard values)
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        for (let i = 0; i < standardValues.length; i++) {
            const labelValue = standardValues[i];
            const y = canvas.height - calculateY(labelValue);
            ctx.fillText(labelValue.toFixed(0), 40, y);
        }
    }

    // Draw the line chart, data points, and labels
    drawLineChart();
    drawDataPoints();
    drawLabels();

    // Track mouse movements on the canvas for tooltip
    canvas.addEventListener('mousemove', function(event) {
        const mouseX = event.clientX - canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - canvas.getBoundingClientRect().top;

        // Check if mouse is over any data point
        for (let i = 0; i < data.length; i++) {
            const point = data[i];
            const distance = Math.sqrt(Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2));

            // Display tooltip if mouse is close to the data point
            if (distance < 10) { // Adjust the radius as needed
                showTooltip(event.pageX, event.pageY-25, point.value);
                return;
            }
        }

        // Hide tooltip if not over any data point
        hideTooltip();
    });

    // Function to show tooltip
    function showTooltip(x, y, value) {
        const tooltip = document.querySelector('.tooltip');
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
    
        // Calculate position to center tooltip relative to cursor
        const tooltipX = x - tooltipWidth / 2;
        const tooltipY = y - tooltipHeight / 2;
    
        tooltip.style.display = 'block';
        tooltip.style.left = tooltipX + 'px';
        tooltip.style.top = tooltipY + 'px';
        tooltip.style.fontSize = '12px';
        tooltip.style.background = 'var(--purple)';
        tooltip.style.borderRadius = '5px';
        tooltip.textContent = `${value} veCARV`;
    }

    // Function to hide tooltip
    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        tooltip.style.display = 'none';
    }
} else {
    console.error('Canvas element with class "mainChart" not found.');
}