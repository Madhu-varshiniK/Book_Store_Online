import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import "./MyProfile.css"

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [ordersByDate, setOrdersByDate] = useState({});

  useEffect(() => {
    const emailID = Cookies.get("email");

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users`);
        const userData = response.data;

        const filteredUser = userData.find((profile) => profile.email === emailID);

        if (filteredUser) {
          setUser(filteredUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      }
    };
    fetchUser();

    const fetchOrders = async () => {
      try {
        if (user) {
          const ordersData = user.pastOrders;

          const ordersGroupedByDate = ordersData.reduce((groupByDate, order) => {
            const orderDate = new Date(order.date);
            if (!groupByDate[orderDate]) {
              groupByDate[orderDate] = [];
            }
            groupByDate[orderDate].push(order);
            return groupByDate;
          }, {});

          setOrdersByDate(ordersGroupedByDate);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <Container maxWidth="md">
      <Card className="user-card">
        <CardContent>
          <Typography variant="h4">User Profile</Typography>
          {user ? (
            <div>
              <Typography variant="h5">Name: {user.name}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Address: Chennai, Tamil Nadu</Typography>
            </div>
          ) : (
            <Typography>Loading user data...</Typography>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h4">Your Orders</Typography>
          {Object.keys(ordersByDate).length > 0 ? (
            Object.entries(ordersByDate).map(([date, orders]) => (
              <div key={date}>
                <Typography variant="h5">Date: {date}</Typography>
                <List>
                  {orders.map((order) => (
                    <ListItem key={order._id}>
                      <ListItemAvatar>
                        <Avatar src={order.image} variant="square" sx={{ width: 60, height: 70 }}/>
                      </ListItemAvatar>
                      <ListItemText style={{marginLeft:'5px'}}
                        primary={`Book Name: ${order.Bookname}`}
                        secondary={
                          <React.Fragment>
                            <Typography>Book Price: {order.price}</Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography>
                  Subtotal: ₹
                  {orders.reduce((subtotal, order) => subtotal + order.price, 0)}
                </Typography>
              </div>
            ))
          ) : (
            <Typography>No Orders Available.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default MyProfile;
