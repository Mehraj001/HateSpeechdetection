const messageModel = require("../model/messageModel");
const Messages = require("../model/messageModel");
const fs = require('fs');
const path = require('path');


module.exports.addMessage = async (req, res, next) => {
      try {
        const { from, to, message } = req.body;
        const filePath = path.join('D:', 'chatapp', 'server', 'controllers', 'hate_speech.txt');
        
        const hateSpeechFile = fs.readFileSync(filePath, 'utf8');
        const hateWords = hateSpeechFile.split('\n').map(word => word.trim());
       
        const containsHateWord = hateWords.some(word => message.toLowerCase().includes(word.toLowerCase()));
        console.log(hateWords);

        if (containsHateWord) {
          return res.json({ error: "Message contains hate speech and cannot be sent.Your Account Can be Blocked." });
      }
        else
        {
          const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
          });
      

          if (data) return res.json({ msg: "Message added successfully." });
          else return res.json({ msg: "Failed to add message to the database" });
        }
        }
        
  catch (ex) {
        next(ex);
      }
    };
 module.exports.getAllMessage = async (req, res, next) => {
      try {
            const { from, to } = req.body;
        
            const messages = await messageModel.find({
              users: {
                $all: [from, to],
              },
            }).sort({ updatedAt: 1 });
        
            const projectedMessages = messages.map((msg) => {
              return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
              };
            });
            res.json(projectedMessages);
          } catch (ex) {
            next(ex);
          }
        };

