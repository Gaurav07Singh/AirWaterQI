
function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const timestamp = new Date(position.timestamp).toLocaleString();

    const locationElement = document.getElementById("location");
    locationElement.innerHTML = `Latitude: ${latitude.toFixed(6)}, Longitude: ${longitude.toFixed(6)}`;

    fetchCountryName(latitude, longitude);

    const timestampElement = document.getElementById("timestamp");
    timestampElement.innerHTML = `Timestamp: ${timestamp}`;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "An unknown error occurred.";
            break;
    }
}


// Call the getLocation function to start tracking the location
getLocation();


document.getElementById('otherCheckbox').addEventListener('change', function () {
    const otherInput = document.getElementById('otherInput');
    otherInput.disabled = !this.checked;
    if (!this.checked) {
        otherInput.value = '';
    }
});

document.getElementById('checkboxForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const checkboxOptions = document.querySelectorAll('input[name="checkboxOptions"]:checked');
    const otherInput = document.getElementById('otherInput').value;
    
    const selectedOptions = [];
    checkboxOptions.forEach(option => {
        selectedOptions.push(option.value);
    });

    if (otherInput) {
        selectedOptions.push(`Other: ${otherInput}`);
    }

    alert(`Selected options: ${selectedOptions.join(', ')}`);
});