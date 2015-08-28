(function(){
  var plugLock = {
    start: function() {
      API.on(API.CHAT, plugLock.chat);
      API.on(API.WAIT_LIST_UPDATE, plugLock.waitlist);
      API.on(API.CHAT_COMMAND,plugLock.command);
      API.chatLog("PlugLOCK Enabled.");
    },
    end: function() {
      API.off();
      API.chatLog("PlugLOCK Disabled.");
    },
    
    waitlistBan: [],
    chatWhitelist: [5626305],
    chat: null,
    user: {
      user: null,
      id: null,
      role: 0,
      gRole: 0
    },
    
    chat: function(data) {
      chat = data.message;
      if (API.getUser(data.uid).role < 1 && API.getUser(data.uid).gRole < 1 && !(plugLock.chatWhitelist.indexOf(data.uid))) {
        API.moderateDeleteChat(data.cid);
      }
      
      if (chat.startsWith("!pluglock ",0) && API.getUser(data.uid).role >= 1 && API.getUser(data.uid).gRole >= 1) {
        plugLock.chat = plugLock.chat.replace("!pluglock ","");
        if (chat.startsWith("cwhitelist @",0)) {
          plugLock.chat = plugLock.chat.replace("cwhitelist @","");
          plugLock.user = API.getUser(plugLock.chat);
          plugLock.chatWhitelist.push(plugLock.user.id);
          API.sendChat("@"+data.un+" Added @"+plugLock.chat+" to the Chat Whitelist.");
        } else if (chat.startsWith("waitban @",0)) {
          /*plugLock.chat = plugLock.chat.replace("waitban @",0);
          plugLock.user = API.getUser(plugLock.chat);
          plugLock.waitlistBan.push(plugLock.user.id);*/
          API.sendChat("Coming Soon!");
        } else if (chat.startsWith("kill",0)) {
          plugLock.end();
        }
      }
    },
    
    /*waitlist: function(data) {
      data.forEach(function(data) {
        data.forEach(function(dat) {
          if (dat === )
        });
      });
    }*/
  };
}).call();
