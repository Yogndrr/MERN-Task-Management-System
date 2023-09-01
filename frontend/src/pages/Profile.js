import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../redux/userRelated/userHandle';

const Profile = ({ role }) => {
    const dispatch = useDispatch();
    const { userDetails, currentToken } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(role, currentToken));
    }, [dispatch, role, currentToken]);

    return (
        <div>
            <h1>Profile</h1>
            {userDetails.name}
        </div>
    )
};

export default Profile;