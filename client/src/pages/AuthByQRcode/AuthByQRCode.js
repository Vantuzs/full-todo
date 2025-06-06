import React from 'react';

const AuthByQRCode = () => {
    const refresh = new URLSearchParams(window.location.search).get('refresh')
    return (
        <div>
            {refresh}
        </div>
    );
}

export default AuthByQRCode;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjOTM3YjYxODQwMzVlZmY0NTU0MWUiLCJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlhdCI6MTc0OTIxMjMwMywiZXhwIjoxNzQ5MjE1OTAzfQ._mtaobI5sAfba8VuU0dPp6FfPUVpz1N2WV871nB06uU