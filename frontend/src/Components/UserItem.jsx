import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
// import ImageIcon from '@mui/icons-material/Image'
import React from 'react'
import { Link } from 'react-router-dom'

export default function UserItem(props) {
    const userProfileUrl = `/user/${props.id}`
    return (
        <Link to={userProfileUrl}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar alt="p" src="logo.192.png">
                        {/* <ImageIcon></ImageIcon> */}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.name} secondary={props.email}></ListItemText>
            </ListItem>
        </Link>
    )
}
