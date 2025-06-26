import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/auth.context';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField,
  Button,
} from '@mui/material';

export function MessagesPage() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!user?._id) return;

    axios
      .get('http://localhost:5005/api/messages/my', {
        headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
      })
      .then((res) => {
        const grouped = {};
        res.data.forEach((msg) => {
          const otherUser = msg.sender._id === user._id ? msg.receiver : msg.sender;
          if (!grouped[otherUser._id]) grouped[otherUser._id] = { user: otherUser, messages: [] };
          grouped[otherUser._id].messages.push(msg);
        });

        // Sort each conversation's messages by time ascending
        Object.values(grouped).forEach((c) => {
          c.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });

        setConversations(Object.values(grouped));
      })
      .catch((err) => console.error('Error fetching messages:', err));
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedMessages]);

  const handleSelectUser = (id) => {
    const convo = conversations.find((c) => c.user._id === id);
    setSelectedUserId(id);
    setSelectedMessages(convo?.messages || []);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const itemId = selectedMessages[0]?.itemId?._id || selectedMessages[0]?.itemId;
      const response = await axios.post(
        'http://localhost:5005/api/messages',
        {
          receiver: selectedUserId,
          content: newMessage,
          itemId,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
        }
      );

      setSelectedMessages((prev) => [...prev, response.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <Box display='flex' height='90vh'>
      <Box width='30%' borderRight='1px solid #ccc' p={2} overflow='auto'>
        <Typography variant='h6'>Messages</Typography>
        <List>
          {conversations.map((convo) => (
            <ListItem
              button
              key={convo.user._id}
              onClick={() => handleSelectUser(convo.user._id)}
              selected={selectedUserId === convo.user._id}
            >
              <ListItemAvatar>
                <Avatar src={convo.user.profileImage} alt={convo.user.username} />
              </ListItemAvatar>
              <ListItemText primary={convo.user.username} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box width='70%' p={2} display='flex' flexDirection='column'>
        <Typography variant='h6' mb={2}>
          Chat
        </Typography>

        <Paper
          elevation={3}
          sx={{
            flex: 1,
            p: 2,
            overflowY: 'auto',
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {selectedMessages.map((msg) => (
            <Box
              key={msg._id}
              display='flex'
              justifyContent={msg.sender._id === user._id ? 'flex-end' : 'flex-start'}
              mb={1}
            >
              <Box
                sx={{
                  bgcolor: msg.sender._id === user._id ? '#e3f2fd' : '#f5f5f5',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: '70%',
                }}
              >
                <Typography>{msg.content}</Typography>
                <Typography variant='caption' color='text.secondary'>
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Paper>

        {selectedUserId && (
          <Box display='flex'>
            <TextField
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              fullWidth
              size='small'
              placeholder='Type a message...'
            />
            <Button onClick={handleSendMessage} variant='contained' sx={{ ml: 1 }}>
              Send
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
