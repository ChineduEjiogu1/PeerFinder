import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import ChatSidebar from "../components/ChatSidebar"
import ChatBox from "../components/ChatBox"
import { Grid } from "@material-ui/core"
import Loading from "../components/Loading"
import axios from "axios"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}))

export default function MessagePage() {
    const classes = useStyles()
    const [currentChat, setCurrentChat] = useState()
    const [friends, setFriends] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/friend")
            const friends = response.data
            setFriends(friends)
            setCurrentChat(friends.mutualFriends[0])
        }

        fetchData()
    }, [])

    if (!friends) return <Loading />

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <ChatSidebar setCurrentChat={setCurrentChat} {...friends} />
                <ChatBox currentChat={currentChat} mutualFriends={friends.mutualFriends} />
            </Grid>
        </div>
    )
}
