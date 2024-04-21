import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, LinearProgress, List } from '@mui/material';
import UserItem from './UserItem';
import withAuthentication from '../utils/withAuthentication';

function Sidebar() {
    const BASE_URL = 'http://127.0.0.1:8000/api/v1/users';
    const [userList, setUserList] = useState([]);
    const [userLoader, setUserLoader] = useState(true);

    const getAuthTokenFromCookie = () => {
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
        if (tokenCookie) {
            return tokenCookie.trim().split('=')[1];
        }
        return null;
    };

    useEffect(() => {
        const auth_token = getAuthTokenFromCookie();
        console.log("auth token", auth_token);
        if (auth_token) {
            axios.get(BASE_URL, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
            }).then(response => {
                const userData = response.data.results;
                setUserList(userData);
                setUserLoader(false);
                console.log("user list state after:", userList); // This might show the old value due to closure
                console.log("response data", userData);
            }).catch(error => {
                console.log('Error making API request:', error);
            });
        }
    }, []); // Empty dependency array for one-time fetch on component mount

    // console.log("user list state after use effect:", userList); // Log the current state outside of useEffect for debugging

    return (
        <div className='sidebar'>
            {userLoader ? (
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {userList.map((user, index) => (
                        <UserItem
                            key={user.id}
                            id={user.id}
                            email={user.email}
                            name={`${user.first_name} ${user.last_name}`}
                        />
                    ))}
                </List>
            )}
        </div>
    );
}

export default Sidebar;
// export default withAuthentication(Sidebar);
