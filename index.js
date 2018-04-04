'use strict';

let product1 = 2000, product2 = 5000;

const
config = require('./config'),
bot = require('./bot'),
storage = require('./storage'),

//function init command haye mano tarif khahad kard
init = () => {
    registerAllCommands();

},

registerAllCommands = () => {
    // /start k zade shod => commandStart ejra beshe
    bot.onMessage(new RegExp('^/start', 'i'), commandStart);
    bot.onMessage(new RegExp('^/getInviteLink$', 'i'), commandGetInviteLink);
    bot.onMessage(new RegExp('^/priceList$', 'i'), commandPriceLinst);
    bot.onMessage(new RegExp('^/نام$', 'i'), commandName);
    // admin login
    // change prices for admin
    console.log('All Commands Registered!');
},

inviteCodeRegExp = new RegExp('^/start ([0-9]+)'),
commandStart = async (msg) => {
    const regExpPars = inviteCodeRegExp.exec(msg.text);
    let inviteCode;
    if (regExpPars) {
        inviteCode = regExpPars[1];
    }

    await bot.sendMessage({
        chat_id: msg.chat.id,
        text: 'سلام، خوش آمدید',
    });

    await bot.sendMessage({
        chat_id: msg.chat.id,
        text: 'لطفا نام خود را وارد کنید',
    });

    //************************************ */
    // await bot.on('message', (msg) => console.log(msg.text.toString()))
    // let name;
    // bot.on('text', ctx => {
    //     let cmd = ctx.message.text.toLowerCase();
    //     sendReply(ctx);
    // });
    //************************************* */

    let msg = await bot.sendMessage({
        chat_id: msg.chat.id,
        text: 'لطفا شماره تماس خود را وارد کنید',
    });
    
    bot.onReplyToMessage(msg.chat.id, msg.id, (reply) => {
        //update user name
    })
    
    await bot.sendMessage({
        chat_id: msg.chat.id,
        text: 'لطفا آدرس خود را وارد کنید',
    });

    //**************************************** */
    // bot.on("text", (message) => {
        //     bot.sendMessage(message.chat.id, "Hello world");
        // }),
        //**************************************** */
        
        updateUser(msg.from, inviteCode)
    },
    commandGetInviteLink = (msg) => {
        const inviteLink = `${config.botUrl}?start=${msg.from.id}`;
        bot.sendMessage({
            chat_id: msg.chat.id,
            text: `[لینک دعوت شما](${inviteLink}) \n و یا میتوانید از لینک زیر استفاده فرمایید \n` + inviteLink,
            parse_mode: 'Markdown',
        })
    },
    
    commandPriceLinst = (msg) => {
        bot.sendMessage({
            chat_id: msg.chat.id,
            text: `قیمت محصول یک: ${product1}
            قیمت محصول دو: ${product2}`,
        });
        // send price list
    },
    
//**************************************** */
// commandName = (msg) => {
//     console.log(msg.text);
// },
//**************************************** */
    
    updateUser = (user, inviteCode) => {
    // add/update user in storage
    user.inviteCode = inviteCode;
    user.registerDate = Date.now();
    storage.updateUser(user);
    console.log(storage.getUser(user.id));
}
;

init();
