import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Search, Phone, Video } from 'lucide-react';

export function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock chat data
  const chats = [
    {
      id: '1',
      name: 'Downtown Office Team',
      type: 'group',
      lastMessage: 'Installation photos uploaded',
      timestamp: '2:30 PM',
      unread: 2,
      participants: ['John Smith', 'Mike Johnson', 'Sarah Wilson'],
      avatar: null
    },
    {
      id: '2',
      name: 'Sarah Wilson - Sales Rep',
      type: 'individual',
      lastMessage: 'Quote approved for Retail Center project',
      timestamp: '1:45 PM',
      unread: 0,
      participants: ['Sarah Wilson'],
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'Technical Support',
      type: 'support',
      lastMessage: 'How can we help you today?',
      timestamp: 'Yesterday',
      unread: 0,
      participants: ['Support Team'],
      avatar: null
    },
    {
      id: '4',
      name: 'Retail Center Team',
      type: 'group',
      lastMessage: 'Weather looks good for tomorrow',
      timestamp: 'Yesterday',
      unread: 1,
      participants: ['Tom Wilson', 'Lisa Brown', 'Dave Chen'],
      avatar: null
    }
  ];

  const messages = selectedChat ? [
    {
      id: '1',
      sender: 'John Smith',
      content: 'Morning everyone! Ready to start on the membrane installation today.',
      timestamp: '9:15 AM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'Mike Johnson',
      content: 'Weather looks perfect. All materials are on site.',
      timestamp: '9:20 AM',
      isOwn: false
    },
    {
      id: '3',
      sender: 'You',
      content: 'Great! I\'ll be there in 30 minutes to start the inspection.',
      timestamp: '9:25 AM',
      isOwn: true
    },
    {
      id: '4',
      sender: 'Sarah Wilson',
      content: 'Installation photos uploaded to the project folder. Everything looks good so far!',
      timestamp: '2:30 PM',
      isOwn: false
    }
  ] : [];

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // Add message logic here
      setNewMessage('');
    }
  };

  const getAvatarFallback = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getChatIcon = (type: string) => {
    switch (type) {
      case 'group': return '👥';
      case 'support': return '🛠️';
      default: return '';
    }
  };

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="bg-surface border-b border-border safe-top">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-3">Messages</h1>
          
          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {!selectedChat ? (
          /* Chat List */
          <div className="h-full overflow-y-auto">
            <div className="p-4 space-y-3 pb-20">
              {chats
                .filter(chat => 
                  chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((chat) => (
                <Card 
                  key={chat.id} 
                  className="cursor-pointer transition-material hover:elevation-2"
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          {chat.avatar ? (
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                          ) : (
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {chat.type === 'group' ? '👥' : chat.type === 'support' ? '🛠️' : getAvatarFallback(chat.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        {chat.unread > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-card-foreground truncate">
                            {chat.name} {getChatIcon(chat.type)}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {chat.timestamp}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {chat.lastMessage}
                        </p>
                        
                        {chat.type === 'group' && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {chat.participants.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          /* Chat View */
          <div className="h-full flex flex-col">
            {/* Chat Header */}
            <div className="bg-surface border-b border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon" onClick={() => setSelectedChat(null)}>
                    ←
                  </Button>
                  <div>
                    <h2 className="font-semibold">
                      {chats.find(c => c.id === selectedChat)?.name}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {chats.find(c => c.id === selectedChat)?.type === 'group' ? 'Group Chat' : 'Online'}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video size={20} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                    {!message.isOwn && (
                      <p className="text-xs text-muted-foreground mb-1 px-3">
                        {message.sender}
                      </p>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.isOwn
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 px-3">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="bg-surface border-t border-border p-4">
              <div className="flex items-center space-x-3">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}