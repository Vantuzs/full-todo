import React from 'react';
import { authByQRCodeRequest,emptyUserObjectRequest } from '../../actions/actionCreater';
import {connect} from 'react-redux'


const AuthByQRCode = (props) => {
    const refresh = new URLSearchParams(window.location.search).get('refresh');
    

     props.emptyUserObjectRequest()
     props.authByQRCodeRequest(refresh)
        return (
        <div>
            {refresh}
        </div>
    );
}

const mapDispatchToProps = {
    emptyUserObjectRequest,
    authByQRCodeRequest
}

export default connect(null,mapDispatchToProps)(AuthByQRCode);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODFjOTM3YjYxODQwMzVlZmY0NTU0MWUiLCJlbWFpbCI6ImpvaG4uZG9lQGdtYWlsLmNvbSIsImlhdCI6MTc0OTIxMjMwMywiZXhwIjoxNzQ5MjE1OTAzfQ._mtaobI5sAfba8VuU0dPp6FfPUVpz1N2WV871nB06uU